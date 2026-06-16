/**
 * SSE(Server-Sent Events) 流式解析。
 * 用于真实后端联通后解析 Dify /chat-messages 的流式响应。
 * Dify 每个事件为一行 `data: {json}`，事件之间以空行分隔。
 */

/**
 * 读取 fetch 响应流，逐个事件回调。
 * @param {Response} response          fetch 返回的响应（需 response.body 可读）
 * @param {(evt: import('./types').DifyEvent) => void} onEvent
 * @param {AbortSignal} [signal]
 */
export async function parseSSE(response, onEvent, signal) {
  if (!response.body || !response.body.getReader) {
    throw new Error('当前环境不支持流式响应（response.body 不可读）')
  }
  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (signal && signal.aborted) {
      await reader.cancel()
      return
    }
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    // 按行切分，保留最后一段不完整的内容到下一次循环
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data:')) continue
      const jsonStr = trimmed.slice(5).trim()
      if (!jsonStr || jsonStr === '[DONE]') continue
      try {
        onEvent(JSON.parse(jsonStr))
      } catch (e) {
        // 忽略心跳/非 JSON 行
      }
    }
  }
}
