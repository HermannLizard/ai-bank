<template>
  <div class="pension-card">
    <div class="pa-title">{{ title }}</div>
    <div class="pa-sub">{{ subtitle }}</div>
    <div class="pa-input">
      <span class="pa-cur">¥</span>
      <input v-model="amount" class="pa-field" type="tel" inputmode="numeric" placeholder="0.00" />
      <van-icon v-if="amount" name="clear" class="pa-clear" @click="amount = ''" />
    </div>
    <button class="pension-btn" :disabled="!valid || done" @click="onConfirm">确认</button>
  </div>
</template>

<script>
export default {
  name: 'PensionAmountInput',
  props: {
    title: { type: String, default: '请输入金额' },
    subtitle: { type: String, default: '' },
    eventType: { type: String, required: true },
    fieldKey: { type: String, default: 'amount' },
    query: { type: String, default: '确认' },
    defaultValue: { type: [Number, String], default: '' }
  },
  data() {
    return { amount: this.defaultValue ? String(this.defaultValue) : '', done: false }
  },
  computed: {
    valid() {
      return Number(this.amount) > 0
    }
  },
  methods: {
    onConfirm() {
      if (!this.valid || this.done) return
      this.done = true
      this.$emit('submit', {
        query: this.query,
        event_type: this.eventType,
        event_payload: { [this.fieldKey]: Number(this.amount) }
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
}

.pa-title {
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
}

.pa-sub {
  margin-top: 8px;
  font-size: 12px;
  color: #808080;
  line-height: 18px;
}

.pa-input {
  margin-top: 16px;
  display: flex;
  align-items: center;
  background: #f7f8fa;
  border-radius: 8px;
  padding: 10px 12px;
}

.pa-cur {
  font-size: 22px;
  color: #0d0d0d;
  margin-right: 6px;
}

.pa-field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
  font-size: 30px;
  font-weight: 700;
  color: #0d0d0d;
  width: 0;
}

.pa-clear {
  color: #c8c9cc;
  font-size: 18px;
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

.pension-btn:disabled {
  opacity: 0.5;
}

.pension-btn:active:not(:disabled) {
  background: #fff5f5;
}
</style>
