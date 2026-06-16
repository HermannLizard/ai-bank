/**
 * Dify /chat-messages 统一入口。
 * 通过 config.useMock 在「本地 Mock」与「真实后端」之间切换，对上层透明。
 */
import { mockChatMessages } from './mock'
import { parseSSE } from './sse'

export const config = {
  // 后端联通后改为 false
  useMock: true,
  baseURL: '/v1',
  apiKey: '',
  user: 'h5-user'
}

/**
 * 发送一条对话消息，流式接收 Dify 事件。
 * @param {import('./types').ChatRequest} body
 * @param {{ onEvent?: (evt: import('./types').DifyEvent) => void, signal?: AbortSignal }} [handlers]
 * @returns {Promise<void>}
 */
export function sendChatMessage(body, handlers = {}) {
  if (config.useMock) {
    return mockChatMessages(body, handlers)
  }
  return realChatMessages(body, handlers)
}

/**
 * 真实后端调用（保持与设计一致：直接提交结构化 query 体）。
 * @param {import('./types').ChatRequest} body
 * @param {{ onEvent?: (evt: import('./types').DifyEvent) => void, signal?: AbortSignal }} handlers
 */
async function realChatMessages(body, { onEvent, signal } = {}) {
  const res = await fetch(`${config.baseURL}/chat-messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {})
    },
    body: JSON.stringify({
      ...body,
      response_mode: 'streaming',
      user: config.user
    }),
    signal
  })
  if (!res.ok) {
    throw new Error(`chat-messages 请求失败: ${res.status}`)
  }
  await parseSSE(res, onEvent || (() => {}), signal)
}
