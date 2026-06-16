/**
 * Dify 对话工作流相关的数据结构定义（纯 JSDoc，运行时无副作用）。
 * 这些类型描述了前端 ⇆ Dify /chat-messages 之间约定的消息体。
 */

/**
 * 发送给 Dify 的查询体。
 * - 自由提问时只填 `query`。
 * - 点击智能体返回的组件触发时，带上 reply_scene / event_type / event_payload。
 * @typedef {Object} ChatQuery
 * @property {string} query          发送的文本（自由提问或组件触发时的可读文案）
 * @property {string} reply_scene    业务场景，如 "transfer"、"finance"
 * @property {string} event_type     组件触发的事件类型，如 "account_select"
 * @property {Object} event_payload  事件携带的数据，如联系人 { id, name, card_no }
 */

/**
 * 一次 /chat-messages 请求体。
 * @typedef {Object} ChatRequest
 * @property {ChatQuery} query
 * @property {string} conversation_id  会话 id，首次为空，由后端在 message_end 返回
 */

/**
 * Dify message 事件里 answer(JSON 字符串) 解析后的单个气泡项。
 * 每一项前端绘制为一个回复气泡。
 * @typedef {Object} BotMessageItem
 * @property {string} scene    业务场景，如 "transfer"
 * @property {string} type     气泡类型，如 "text" | "ui-trans-select" | "ui-trans-confirm"
 * @property {*}      payload  文本字符串，或组件所需的结构化数据
 */

/**
 * Dify 流式返回的事件（与官方 SSE 规范保持一致的子集）。
 * @typedef {Object} DifyEvent
 * @property {('workflow_started'|'node_started'|'node_finished'|'message'|'message_end'|'error')} event
 * @property {string} [task_id]
 * @property {string} [message_id]
 * @property {string} [conversation_id]
 * @property {string} [answer]   message 事件的增量文本（累加后为完整 answer JSON）
 * @property {Object} [data]     workflow/node 事件的数据
 * @property {number} [created_at]
 */

export default {};
