<template>
  <div class="pension-card">
    <div class="pp-title">您在我行持有的<b>个人养老金</b></div>
    <div class="pp-amount"><span class="pp-cur">¥</span>{{ money(data.amount) }}</div>
    <div class="pp-tip">数据有疑问，<span class="pp-link">去更新</span></div>
    <button class="pension-btn" :disabled="done" @click="onConfirm">没问题，继续</button>
  </div>
</template>

<script>
export default {
  name: 'PensionPrivatePension',
  props: { data: { type: Object, default: () => ({}) } },
  data() {
    return { done: false }
  },
  methods: {
    money(n) {
      return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    onConfirm() {
      if (this.done) return
      this.done = true
      this.$emit('submit', {
        query: '确认',
        event_type: 'ui-pension-private-pension-confirm',
        event_payload: {}
      })
    }
  }
}
</script>

<style scoped>
.pension-card {
  width: 343px;
  max-width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
}

.pp-title {
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
  text-align: left;
}

.pp-amount {
  margin-top: 16px;
  font-family: 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #0d0d0d;
}

.pp-cur {
  font-size: 24px;
  margin-right: 2px;
}

.pp-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #808080;
}

.pp-link {
  color: #7698e5;
}

.pension-btn {
  margin-top: 16px;
  width: 100%;
  height: 44px;
  background: #fff;
  border: 1px solid #f0c6c6;
  border-radius: 8px;
  color: #e54c4c;
  font-size: 16px;
  font-weight: 500;
}

.pension-btn:active {
  background: #fff5f5;
}
</style>
