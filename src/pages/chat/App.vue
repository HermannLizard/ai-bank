<template>
  <div class="chat-page">
    <div class="chat-header" :style="{ backgroundImage: 'url(' + bgImg + ')' }">
      <div class="hd-left">
        <van-icon name="arrow-left" size="20" class="hd-back" @click="goBack" />
        <img class="hd-avatar" :src="botAvatar" alt="" />
        <span class="hd-title">小京</span>
      </div>
      <div class="hd-right">
        <van-icon name="volume-o" size="16" />
        <span class="hd-divider"></span>
        <van-icon name="ellipsis" size="16" />
      </div>
    </div>

    <template v-if="!started">
      <!-- 常用功能区（demo 阶段整体用一张图代替） -->
      <img class="shortcuts-img" :src="shortcutsImg" alt="常用功能" @click="toastOutOfApp" />
      <!-- 大家都在问（demo 阶段整体用一张图代替） -->
      <img class="faq-img" :src="faqImg" alt="大家都在问" @click="toastOutOfApp" />

      <div class="placeholder"></div>
    </template>

    <div v-else class="chat-list" ref="chatList">
      <div v-for="msg in messages" :key="msg.id" :data-mid="msg.id" class="msg-row" :class="msg.role">
        <!-- 用户消息：纯文本，右对齐 -->
        <div v-if="msg.role === 'user'" class="bubble user">{{ msg.text }}</div>

        <!-- 智能体「正在思考」CoT 气泡 -->
        <div v-else-if="msg.type === 'thinking'" class="bubble bot thinking">
          <div class="thinking-head">
            <span>正在思考</span>
            <span class="dots">
              <svg class="star" width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.90144 0.282316C3.08348 -0.0940952 3.61964 -0.0940958 3.80169 0.282315L4.3524 1.42103C4.54867 1.82686 4.87629 2.15448 5.28212 2.35076L6.42084 2.90147C6.79725 3.08351 6.79725 3.61967 6.42084 3.80172L5.28212 4.35243C4.87629 4.5487 4.54867 4.87632 4.3524 5.28215L3.80169 6.42087C3.61964 6.79728 3.08348 6.79728 2.90144 6.42087L2.35073 5.28216C2.15445 4.87632 1.82683 4.5487 1.421 4.35243L0.282286 3.80172C-0.0941257 3.61967 -0.0941263 3.08351 0.282285 2.90147L1.421 2.35076C1.82683 2.15449 2.15445 1.82686 2.35073 1.42103L2.90144 0.282316Z" fill="#808080"/>
              </svg>
              <svg class="star" width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.90144 0.282316C3.08348 -0.0940952 3.61964 -0.0940958 3.80169 0.282315L4.3524 1.42103C4.54867 1.82686 4.87629 2.15448 5.28212 2.35076L6.42084 2.90147C6.79725 3.08351 6.79725 3.61967 6.42084 3.80172L5.28212 4.35243C4.87629 4.5487 4.54867 4.87632 4.3524 5.28215L3.80169 6.42087C3.61964 6.79728 3.08348 6.79728 2.90144 6.42087L2.35073 5.28216C2.15445 4.87632 1.82683 4.5487 1.421 4.35243L0.282286 3.80172C-0.0941257 3.61967 -0.0941263 3.08351 0.282285 2.90147L1.421 2.35076C1.82683 2.15449 2.15445 1.82686 2.35073 1.42103L2.90144 0.282316Z" fill="#808080"/>
              </svg>
              <svg class="star" width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.90144 0.282316C3.08348 -0.0940952 3.61964 -0.0940958 3.80169 0.282315L4.3524 1.42103C4.54867 1.82686 4.87629 2.15448 5.28212 2.35076L6.42084 2.90147C6.79725 3.08351 6.79725 3.61967 6.42084 3.80172L5.28212 4.35243C4.87629 4.5487 4.54867 4.87632 4.3524 5.28215L3.80169 6.42087C3.61964 6.79728 3.08348 6.79728 2.90144 6.42087L2.35073 5.28216C2.15445 4.87632 1.82683 4.5487 1.421 4.35243L0.282286 3.80172C-0.0941257 3.61967 -0.0941263 3.08351 0.282285 2.90147L1.421 2.35076C1.82683 2.15449 2.15445 1.82686 2.35073 1.42103L2.90144 0.282316Z" fill="#808080"/>
              </svg>
            </span>
          </div>
          <ul v-if="msg.nodes.length" class="cot">
            <li v-for="n in msg.nodes" :key="n.id">
              <van-loading v-if="n.status === 'running'" size="12" color="#999" />
              <van-icon v-else name="success" color="#07c160" size="12" />
              {{ n.title }}
            </li>
          </ul>
        </div>

        <!-- 智能体回复气泡：按 item.type 渲染（UI 组件后续完善） -->
        <template v-else>
          <div v-if="msg.item.type === 'text'" class="bubble bot">{{ msg.item.payload }}</div>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-else-if="msg.item.type === 'rich-text'" class="bubble bot rich" v-html="msg.item.payload"></div>

          <div v-else-if="msg.item.type === 'ui-product-tab-list'" class="comp-wrap">
            <product-tab-list :data="msg.item.payload" @buy="onBuyProduct" />
          </div>

          <div v-else-if="msg.item.type === 'ui-trans-select'" class="bubble bot comp">
            <div
              v-for="c in msg.item.payload"
              :key="c.id"
              class="contact"
              @click="selectContact(msg.item, c)"
            >
              <span class="c-name">{{ c.name }}</span>
              <span class="c-card">尾号 {{ tail4(c.card_no) }}</span>
            </div>
          </div>

          <div v-else-if="msg.item.type === 'ui-trans-confirm'" class="comp-wrap">
            <trans-confirm :data="msg.item.payload" @submit="onTransferSubmit(msg.item)" />
          </div>

          <div v-else-if="msg.item.type === 'ui-transfer-success'" class="comp-wrap">
            <trans-success :data="msg.item.payload" />
          </div>

          <div v-else-if="msg.item.type === 'ui-fin-purchase-success'" class="comp-wrap">
            <fin-purchase-success :data="msg.item.payload" />
          </div>

          <div v-else-if="msg.item.type === 'ui-generic-banner'" class="comp-wrap">
            <generic-banner :data="msg.item.payload" />
          </div>

          <div v-else-if="msg.item.type === 'ui-returns-by-product'" class="comp-wrap">
            <returns-by-product :data="msg.item.payload" />
          </div>

          <div v-else-if="msg.item.type === 'ui-returns-overview-total'" class="comp-wrap">
            <returns-overview-total :data="msg.item.payload" />
          </div>

          <div v-else-if="msg.item.type === 'ui-returns-overview-calendar'" class="comp-wrap">
            <returns-image-card :img="msg.item.payload.img" :fallback="returnsCalendarImg" placeholder="收益分布日历" />
          </div>

          <div v-else-if="msg.item.type === 'ui-returns-analysis'" class="comp-wrap">
            <returns-image-card :img="msg.item.payload.img" :fallback="returnsDetailImg" placeholder="收益分析（demo 图片待补充）" />
          </div>

          <div v-else-if="msg.item.type === 'suggest'" class="comp-wrap">
            <suggest-chips :data="msg.item.payload" @use="onSuggestUse" />
          </div>

          <!-- 养老规划 -->
          <div v-else-if="msg.item.type === 'ui-pension-personal-detail-confirm'" class="comp-wrap">
            <pension-personal-detail :data="msg.item.payload" @submit="onPensionSubmit" />
          </div>

          <div v-else-if="msg.item.type === 'ui-pension-salary-confirm'" class="comp-wrap">
            <pension-amount-input
              title="您的当前月工资是多少?"
              subtitle="将根据您的月工资，计算出合适您的养老规划"
              event-type="ui-pension-salary-confirm"
              field-key="salary"
              query="对的"
              :default-value="7600"
              @submit="onPensionSubmit"
            />
          </div>

          <div v-else-if="msg.item.type === 'ui-pension-corporate-annuity-confirm'" class="comp-wrap">
            <pension-annuity-confirm @submit="onPensionSubmit" />
          </div>

          <div v-else-if="msg.item.type === 'ui-pension-corporate-annuity-amount-confirm'" class="comp-wrap">
            <pension-amount-input
              title="您每年缴纳的企业年金金额是多少?"
              subtitle="将根据您的企业年金，计算出合适您的养老规划"
              event-type="ui-pension-corporate-annuity-amount-confirm"
              field-key="amount"
              query="确认"
              :default-value="11800"
              @submit="onPensionSubmit"
            />
          </div>

          <div v-else-if="msg.item.type === 'ui-pension-private-pension-confirm'" class="comp-wrap">
            <pension-private-pension :data="msg.item.payload" @submit="onPensionSubmit" />
          </div>

          <div v-else-if="msg.item.type === 'ui-pension-private-assets-confirm'" class="comp-wrap">
            <pension-assets-confirm :data="msg.item.payload" @submit="onPensionSubmit" />
          </div>

          <div v-else-if="msg.item.type === 'ui-pension-plan-confirm'" class="comp-wrap">
            <pension-plan-confirm :data="msg.item.payload" @submit="onPensionSubmit" />
          </div>

          <div v-else-if="msg.item.type === 'ui-pension-plan-result'" class="comp-wrap">
            <returns-image-card :fallback="pensionResultImg" placeholder="养老规划报告" />
          </div>

          <div v-else-if="msg.item.type === 'ui-manager-card'" class="comp-wrap">
            <returns-image-card :img="httpImg(msg.item.payload.img)" :fallback="managerCardImg" placeholder="理财经理名片" />
          </div>

          <div v-else class="bubble bot comp placeholder-comp">[未支持组件：{{ msg.item.type }}]</div>
        </template>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="quick-tags">
        <span v-for="tag in tags" :key="tag" class="tag" @click="send({ query: tag })">{{ tag }}</span>
      </div>
      <div class="input-bar">
        <van-icon name="mic-o" size="20" class="mic" />
        <input
          v-model="inputText"
          class="chat-input"
          placeholder="请输入您要咨询的问题"
          @keyup.enter="sendText"
        />
        <van-icon v-if="!inputText" name="ellipsis" size="20" class="more" />
        <van-button v-else size="small" type="info" round class="send-btn" @click="sendText">发送</van-button>
      </div>
      <p class="footer-tip">京智AI大模型提供服务，7*24小时安全守护</p>
    </div>

    <!-- 理财产品详情（半屏） -->
    <product-detail :visible.sync="detailVisible" :product="detailProduct" @paid="onPurchasePaid" />
  </div>
</template>

<script>
import { runChat } from '../../api/dify/chat'
import { toastOutOfApp } from '../../utils/toast'
import TransConfirm from './components/TransConfirm.vue'
import TransSuccess from './components/TransSuccess.vue'
import ProductTabList from './components/ProductTabList.vue'
import ProductDetail from './components/ProductDetail.vue'
import FinPurchaseSuccess from './components/FinPurchaseSuccess.vue'
import GenericBanner from './components/GenericBanner.vue'
import ReturnsByProduct from './components/ReturnsByProduct.vue'
import ReturnsOverviewTotal from './components/ReturnsOverviewTotal.vue'
import ReturnsImageCard from './components/ReturnsImageCard.vue'
import SuggestChips from './components/SuggestChips.vue'
import PensionPersonalDetail from './components/PensionPersonalDetail.vue'
import PensionAmountInput from './components/PensionAmountInput.vue'
import PensionAnnuityConfirm from './components/PensionAnnuityConfirm.vue'
import PensionPrivatePension from './components/PensionPrivatePension.vue'
import PensionAssetsConfirm from './components/PensionAssetsConfirm.vue'
import PensionPlanConfirm from './components/PensionPlanConfirm.vue'
import botAvatar from './assets/img/avatar.png'
import bgImg from './assets/img/background.png'
import faqImg from './assets/img/faq.png'
import shortcutsImg from './assets/img/shortcuts.png'
import returnsCalendarImg from './assets/img/returns-calendar.png'
import returnsDetailImg from './assets/img/returns-detail.png'
import pensionResultImg from './assets/img/pension-result.png'
import managerCardImg from './assets/img/manager-card.png'

let _uid = 0
function uid() {
  _uid += 1
  return `m${_uid}`
}

export default {
  name: 'App',
  components: {
    TransConfirm,
    TransSuccess,
    ProductTabList,
    ProductDetail,
    FinPurchaseSuccess,
    GenericBanner,
    ReturnsByProduct,
    ReturnsOverviewTotal,
    ReturnsImageCard,
    SuggestChips,
    PensionPersonalDetail,
    PensionAmountInput,
    PensionAnnuityConfirm,
    PensionPrivatePension,
    PensionAssetsConfirm,
    PensionPlanConfirm
  },
  data() {
    return {
      started: false,
      messages: [],
      inputText: '',
      conversationId: '',
      pending: null,
      detailVisible: false,
      detailProduct: null,
      botAvatar,
      bgImg,
      faqImg,
      shortcutsImg,
      returnsCalendarImg,
      returnsDetailImg,
      pensionResultImg,
      managerCardImg,
      tags: ['给小京转账100元', '理财推荐', '持仓收益', '养老规划']
    }
  },
  mounted() {
    // 背景图绑定到 body（与头部背景同图同尺寸，无缝衔接）
    const b = document.body
    b.style.backgroundImage = `url(${bgImg})`
    b.style.backgroundRepeat = 'no-repeat'
    b.style.backgroundPosition = 'top center'
    b.style.backgroundSize = '100% auto'
    b.style.backgroundColor = '#eef3fb'
  },
  methods: {
    toastOutOfApp,
    goBack() {
      window.location.href = 'index.html'
    },
    tail4(cardNo) {
      return String(cardNo || '').slice(-4)
    },
    // 仅采用 http(s) 图片地址，本地占位路径走组件兜底图
    httpImg(url) {
      return /^https?:/.test(url || '') ? url : ''
    },

    sendText() {
      const text = this.inputText.trim()
      if (!text) return
      this.inputText = ''
      this.send({ query: text })
    },

    selectContact(item, contact) {
      this.send({
        query: `${contact.name}，尾号${this.tail4(contact.card_no)}`,
        reply_scene: item.scene,
        event_type: 'account_select',
        event_payload: contact
      })
    },

    // 支付密码校验通过后由确认组件发起：向 dify 发送执行转账的消息
    onTransferSubmit(item) {
      const p = item.payload
      const name = (p.payee && p.payee.name) || ''
      this.send({
        query: `确认转账，收款人${name}，收款金额¥${p.amount}`,
        reply_scene: item.scene,
        event_type: 'amount_confirm',
        event_payload: p
      })
    },

    // 点击理财产品「去买入」→ 调起半屏产品详情
    onBuyProduct(product) {
      this.detailProduct = product
      this.detailVisible = true
    },

    // 养老规划各环节统一上报：组件 emit { query, event_type, event_payload }
    onPensionSubmit(e) {
      this.send({
        query: e.query,
        reply_scene: 'pension',
        event_type: e.event_type,
        event_payload: e.event_payload || {}
      })
    },

    // 点击建议话术 → 直接开启下一轮对话
    onSuggestUse(s) {
      this.send({
        query: s.question,
        reply_scene: '',
        event_type: 'suggest_use',
        event_payload: { scene: s.scene }
      })
    },

    // 产品详情内支付密码完成 → 关闭详情并向 dify 发送「确认申购」
    onPurchasePaid(product) {
      this.detailVisible = false
      this.send({
        query: '确认申购',
        reply_scene: 'wealth',
        event_type: 'fin_purchase',
        event_payload: product || {}
      })
    },

    /**
     * 统一发送入口：文本提问与组件事件都走这里。
     * @param {{ query?: string, reply_scene?: string, event_type?: string, event_payload?: Object }} input
     */
    send(input) {
      const query = input.query || ''
      const replyScene = input.reply_scene || ''
      const eventType = input.event_type || ''
      const eventPayload = input.event_payload || {}
      if (!query && !eventType) return

      this.started = true
      if (query) {
        this.messages.push({ id: uid(), role: 'user', type: 'text', text: query })
      }

      const body = {
        query: { query, reply_scene: replyScene, event_type: eventType, event_payload: eventPayload },
        conversation_id: this.conversationId
      }

      const thinking = { id: uid(), role: 'bot', type: 'thinking', nodes: [] }
      this.messages.push(thinking)
      this.scrollToBottom()

      const removeThinking = () => {
        const idx = this.messages.indexOf(thinking)
        if (idx > -1) this.messages.splice(idx, 1)
      }

      this.pending = runChat(body, {
        onNode: (nodes) => {
          thinking.nodes = nodes
          this.scrollToBottom()
        },
        onDone: ({ items, conversation_id }) => {
          if (conversation_id) this.conversationId = conversation_id
          removeThinking()
          let firstId = null
          items.forEach((it) => {
            const id = uid()
            if (!firstId) firstId = id
            this.messages.push({ id, role: 'bot', type: 'item', item: it })
          })
          // 把本轮新消息整体滚动到窗口中（对齐到顶部）
          this.scrollMessageIntoView(firstId)
        },
        onError: () => {
          removeThinking()
          this.messages.push({
            id: uid(),
            role: 'bot',
            type: 'item',
            item: { scene: '', type: 'text', payload: '抱歉，服务异常，请稍后重试。' }
          })
          this.scrollToBottom()
        }
      })
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.chatList
        if (el) el.scrollTop = el.scrollHeight
      })
    },

    // 将指定消息滚动到聊天窗口顶部，让本轮新消息整体可见
    scrollMessageIntoView(id) {
      this.$nextTick(() => {
        const el = this.$refs.chatList
        if (!el) return
        const target = id && el.querySelector(`[data-mid="${id}"]`)
        const align = () => {
          if (target) {
            el.scrollTop += target.getBoundingClientRect().top - el.getBoundingClientRect().top
          } else {
            el.scrollTop = el.scrollHeight
          }
        }
        align()
        // 气泡内图片异步加载会改变高度（导致首次对齐被滚动条夹断）：
        // 监听未加载完成的图片，加载后重新对齐。
        el.querySelectorAll('img').forEach((img) => {
          if (!img.complete) {
            img.addEventListener('load', align, { once: true })
            img.addEventListener('error', align, { once: true })
          }
        })
      })
    }
  }
}
</script>

<!-- 全局样式：锁定高度、禁止滚动（背景图在 mounted 中绑定到 body） -->
<style>
html,
body,
#app {
  height: 100vh;
  overflow: hidden;
  overscroll-behavior: none;
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>

<style scoped>
.chat-page {
  position: relative;
  overflow: hidden;
  height: 100%;
  padding-bottom: calc(110px + env(safe-area-inset-bottom, 0));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 44px;
}

/* 导航栏：与整页背景同图、同尺寸、顶部对齐 → 头部即背景图的顶部裁切，二者无缝衔接 */
.chat-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  flex: none;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: env(safe-area-inset-top, 20px) 12px 0;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
}

.hd-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hd-back {
  color: #0d0d0d;
}

.hd-avatar {
  width: 46px;
  position: relative;
  top: 2px;
}

.hd-title {
  font-size: 16px;
  font-weight: 500;
  color: #000;
}

.hd-right {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border-radius: 14px;
  padding: 5px 12px;
  color: #0d0d0d;
}

.hd-divider {
  width: 1px;
  height: 12px;
  background: #e5e5e5;
}

.shortcuts-img {
  display: block;
  width: calc(100% - 32px);
  margin: calc(24px + env(safe-area-inset-top, 20px)) 16px 0;
  border-radius: 6px;
  z-index: 1;
}

.faq-img {
  display: block;
  width: calc(100% - 32px);
  margin: 12px 16px 0;
  border-radius: 6px;
  z-index: 1;
}

.placeholder {
  height: 8px;
}

.chat-list {
  z-index: 1;
  flex: 1;
  overflow-y: auto;
  padding: calc(12px + env(safe-area-inset-top, 20px)) 0 12px;
  overscroll-behavior: none;
}

.msg-row {
  display: flex;
  margin: 0 16px 12px;
}

.msg-row.user {
  justify-content: flex-end;
}

.msg-row.bot {
  justify-content: flex-start;
}

.bubble {
  position: relative;
  max-width: 75%;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  color: #0d0d0d;
  word-break: break-word;
}

.bubble.user {
  background: rgba(118, 152, 229, 0.34);
}

.bubble.bot {
  background: #fff;
}

/* 文本气泡小尖角：主态在右、客态在左（不含「正在思考」气泡） */
.bubble.user::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 100%;
  margin-left: -8px;
  width: 20px;
  height: 26px;
  background: url('./assets/img/bubble-me.svg') no-repeat left top;
}

.bubble.bot:not(.thinking)::before {
  content: '';
  position: absolute;
  top: 5px;
  left: -3px;
  width: 4px;
  height: 10px;
  background: url('./assets/img/bubble-bot.svg') no-repeat left top;
}

/* 富文本气泡（v-html 内容，需用 deep 选择器） */
.rich >>> ul {
  margin: 6px 0 0;
  padding-left: 18px;
}

.rich >>> li {
  line-height: 22px;
  list-style: disc;
}

.rich >>> b {
  font-weight: 600;
}

/* 自定义下划线：4px 粗的半透明红色底条，随文本换行 */
.rich >>> u {
  text-decoration: none;
  background-image: linear-gradient(rgba(229, 76, 76, 0.22), rgba(229, 76, 76, 0.22));
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 100% 4px;
}

.thinking-head {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dots {
  display: inline-flex;
  gap: 3px;
}

.dots {
  align-items: center;
}

.dots .star {
  display: inline-block;
}

.dots .star path {
  animation: starBlink 1.2s infinite ease-in-out both;
}

.dots .star:nth-child(2) path {
  animation-delay: 0.2s;
}

.dots .star:nth-child(3) path {
  animation-delay: 0.4s;
}

@keyframes starBlink {
  0%, 100% {
    opacity: 0.2;
  }
  33% {
    opacity: 0.4;
  }
  66% {
    opacity: 0.3;
  }
}

.cot {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
}

.cot li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #666;
  line-height: 22px;
}

.comp {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
}

.contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #e6ecf7;
  border-radius: 6px;
  background: #f7faff;
}

.c-name {
  font-weight: 500;
  color: #0d0d0d;
}

.c-card {
  font-size: 12px;
  color: #999;
}

.comp-wrap {
  width: 100%;
}

.placeholder-comp {
  color: #999;
  font-size: 12px;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 16px calc(8px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  z-index: 1;
  background: #f7f7f7;
}

.quick-tags {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 10px;
}

.tag {
  flex: none;
  padding: 5px 12px;
  font-size: 12px;
  color: #141414;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #fff;
  border-radius: 18px;
  white-space: nowrap;
}

.input-bar {
  height: 41px;
  background: #fff;
  border-radius: 20.5px;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.mic {
  color: #999;
  margin-right: 8px;
}

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: #0d0d0d;
  background: transparent;
}

.chat-input::placeholder {
  color: #ccc;
}

.more {
  color: #999;
}

.send-btn {
  margin-left: 8px;
}

.footer-tip {
  text-align: center;
  font-size: 12px;
  color: rgba(128, 128, 128, 0.6);
  margin: 8px 0 0;
}
</style>
