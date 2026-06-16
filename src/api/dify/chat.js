/**
 * 对话编排层 —— 视图与 Dify 协议之间的边界。
 * 负责：累加 message 增量、跟踪节点状态(CoT)、在 message_end 解析 answer JSON。
 * 视图只关心这里暴露的语义化回调，不感知底层是 mock 还是真实接口。
 */
import { sendChatMessage } from './index'

/**
 * @param {import('./types').ChatRequest} body
 * @param {{
 *   onStart?: (evt: import('./types').DifyEvent) => void,
 *   onNode?: (nodes: Array<{id:string,title:string,status:string}>) => void,
 *   onChunk?: (answer: string) => void,
 *   onDone?: (result: { items: import('./types').BotMessageItem[], conversation_id: string }) => void,
 *   onError?: (err: any) => void
 * }} callbacks
 * @returns {{ abort: () => void }}
 */
export function runChat(body, callbacks = {}) {
  const controller = new AbortController()
  const nodes = []
  let answer = ''

  sendChatMessage(body, {
    signal: controller.signal,
    onEvent(evt) {
      switch (evt.event) {
        case 'workflow_started':
          callbacks.onStart && callbacks.onStart(evt)
          break

        case 'node_started':
          nodes.push({ id: (evt.data && evt.data.node_id) || '', title: (evt.data && evt.data.title) || '', status: 'running' })
          callbacks.onNode && callbacks.onNode(nodes.slice())
          break

        case 'node_finished': {
          const title = evt.data && evt.data.title
          const node = nodes.find((n) => n.title === title && n.status === 'running')
          if (node) node.status = (evt.data && evt.data.status) || 'succeeded'
          callbacks.onNode && callbacks.onNode(nodes.slice())
          break
        }

        case 'message':
          answer += evt.answer || ''
          callbacks.onChunk && callbacks.onChunk(answer)
          break

        case 'message_end': {
          let items
          try {
            items = JSON.parse(answer)
            if (!Array.isArray(items)) items = [{ scene: '', type: 'text', payload: String(answer) }]
          } catch (e) {
            // answer 不是合法 JSON 时，整体当作一段文本兜底
            items = [{ scene: '', type: 'text', payload: answer }]
          }
          callbacks.onDone && callbacks.onDone({ items, conversation_id: evt.conversation_id })
          break
        }

        case 'error':
          callbacks.onError && callbacks.onError(evt)
          break

        default:
          break
      }
    }
  }).catch((err) => {
    callbacks.onError && callbacks.onError(err)
  })

  return { abort: () => controller.abort() }
}
