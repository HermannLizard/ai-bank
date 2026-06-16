<template>
  <div class="trans-confirm">
    <div class="tc-card">
      <!-- 摘要区 -->
      <div class="tc-summary">
        <div class="tc-payee">转给{{ data.payee.name }}</div>
        <div class="tc-bank">
          <span class="tc-bank-logo">京</span>
          <span class="tc-bank-text">{{ data.payee.bank }} {{ formatCard(data.payee.card_no) }}</span>
        </div>
        <div class="tc-amount">
          <span class="cur">¥</span><span class="int">{{ intPart }}</span><span class="dec">.{{ decPart }}</span>
        </div>
        <div class="tc-arrival">{{ data.arrival }}</div>
      </div>

      <!-- 付款卡 -->
      <div class="tc-row">
        <span class="tc-label">付款卡</span>
        <div class="tc-card-info">
          <div class="tc-card-name">{{ data.pay_card.name }}</div>
          <div class="tc-balance">
            <van-icon name="info-o" size="12" />
            可用余额{{ data.pay_card.balance }}元
          </div>
        </div>
        <van-icon name="arrow" size="16" class="tc-arrow" />
      </div>

      <!-- 转账附言 -->
      <div class="tc-row">
        <span class="tc-label">转账附言</span>
        <span class="tc-remark">{{ data.remark || '请输入(选填)' }}</span>
        <van-icon name="edit" size="16" class="tc-arrow" />
      </div>

      <!-- 确认按钮 -->
      <van-button round block class="tc-btn" :disabled="done" @click="onConfirm">
        {{ done ? '已确认' : '确认转账' }}
      </van-button>

      <!-- 安全提示 -->
      <div class="tc-divider"></div>
      <div class="tc-safety">
        <span class="tc-safety-text">安全提示：1、为了您的资金安全，切莫相信以冒...</span>
        <van-icon name="arrow-down" size="14" />
      </div>
    </div>

    <!-- 反馈 -->
    <div class="tc-feedback">
      <span class="fb"><van-icon name="good-job-o" size="18" /></span>
      <span class="fb fb-down"><van-icon name="good-job-o" size="18" /></span>
    </div>

    <!-- 支付密码（半屏） -->
    <pay-password :visible.sync="showPwd" :account="payerAcct" @done="onPwdDone" />
  </div>
</template>

<script>
import PayPassword from './PayPassword.vue'

export default {
  name: 'TransConfirm',
  components: { PayPassword },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      done: false,
      showPwd: false
    }
  },
  computed: {
    intPart() {
      return String(this.data.amount || '0').split('.')[0]
    },
    decPart() {
      const dec = String(this.data.amount || '0').split('.')[1]
      return (dec || '00').slice(0, 2).padEnd(2, '0')
    },
    // 付款账户尾号（用于密码弹窗副标题）
    payerAcct() {
      const m = String((this.data.pay_card && this.data.pay_card.name) || '').match(/\((\d+)\)/)
      return m ? m[1] : '****'
    }
  },
  methods: {
    formatCard(cardNo) {
      return String(cardNo || '')
        .replace(/\s/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
    },
    // 点击「确认转账」：由本组件负责发起转账 —— 先弹出支付密码
    onConfirm() {
      if (this.done) return
      this.showPwd = true
    },
    // 支付密码输入完成：校验通过（mock），发起转账
    onPwdDone() {
      this.done = true
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>
.trans-confirm {
  width: 327px;
  max-width: 100%;
}

.tc-card {
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  box-sizing: border-box;
}

/* 摘要区 */
.tc-summary {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px 12px;
  text-align: center;
}

.tc-payee {
  font-size: 16px;
  font-weight: 500;
  color: #1d2129;
}

.tc-bank {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 6px;
}

.tc-bank-logo {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e54c4c;
  color: #fff;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}

.tc-bank-text {
  font-size: 12px;
  color: #808080;
}

.tc-amount {
  margin-top: 10px;
  color: #222;
  font-family: 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
}

.tc-amount .cur {
  font-size: 20px;
  margin-right: 2px;
}

.tc-amount .int {
  font-size: 36px;
}

.tc-amount .dec {
  font-size: 20px;
}

.tc-arrival {
  margin-top: 8px;
  font-size: 12px;
  color: #808080;
}

/* 信息行 */
.tc-row {
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #f2f2f2;
}

.tc-label {
  flex: none;
  width: 64px;
  font-size: 14px;
  color: #0d0d0d;
}

.tc-card-info {
  flex: 1;
  text-align: right;
}

.tc-card-name {
  font-size: 14px;
  color: #0d0d0d;
}

.tc-balance {
  margin-top: 4px;
  font-size: 12px;
  color: #808080;
}

.tc-remark {
  flex: 1;
  text-align: right;
  font-size: 14px;
  color: #808080;
}

.tc-arrow {
  color: #c8c9cc;
  margin-left: 8px;
}

/* 按钮 */
.tc-btn {
  margin-top: 16px;
  height: 44px;
  background: #e54c4c;
  border-color: #e54c4c;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

/* 安全提示 */
.tc-divider {
  height: 1px;
  background: #f2f2f2;
  margin: 16px 0 12px;
}

.tc-safety {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #808080;
}

.tc-safety-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 反馈 */
.tc-feedback {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.fb {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #808080;
}

.fb-down >>> .van-icon {
  transform: rotate(180deg);
}
</style>
