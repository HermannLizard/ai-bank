/**
 * 通用 Toast 工具。
 * vant 的 Toast 为函数式组件，配合 babel-plugin-import 会自动按需引入样式，
 * 无需在 main.js 里 Vue.use 注册即可直接调用。
 */
import { Toast } from 'vant'

// 手机银行端外环境（如 demo / 浏览器）中，部分能力不可用时的统一提示文案
// 用 \n 让「暂不支持」另起一行，配合自定义样式的 white-space: pre-line 生效
export const OUT_OF_APP_TIP = '当前为手机银行端外环境\n暂不支持该功能'

// Toast 被挂载到 body 下，scoped 样式无法命中，这里按需注入一次全局样式
const CUSTOM_CLASS = 'app-toast'
let styleInjected = false
function ensureStyle() {
  if (styleInjected) return
  styleInjected = true
  const style = document.createElement('style')
  style.textContent = `
.${CUSTOM_CLASS} {
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-line;
}`
  document.head.appendChild(style)
}

/**
 * 弹出「手机银行端外环境」提示。
 * 后续多处需要该提示时，统一调用此方法即可。
 */
export function toastOutOfApp() {
  toast(OUT_OF_APP_TIP)
}

/**
 * 通用文案提示，需要自定义内容时调用。换行用 \n。
 * @param {string} message
 */
export function toast(message) {
  ensureStyle()
  Toast({ message, className: CUSTOM_CLASS })
}
