<template>
  <div class="pension-card">
    <!-- 分段选择养老类型 -->
    <div class="pl-tabs">
      <div
        v-for="(p, i) in data"
        :key="p.id"
        class="pl-tab"
        :class="{ active: i === activeIndex }"
        @click="activeIndex = i"
      >
        {{ p.name }}
      </div>
    </div>

    <div class="pl-amount-row">
      <span class="pl-label">总金额</span>
      <span class="pl-amount">{{ current.amount }} <span class="pl-unit">元/月</span></span>
    </div>
    <div class="pl-equal">相当于现在的{{ current.current }}元</div>
    <div class="pl-tip">总金额是您未来退休后的每个月的养老花费，您可根据实际情况进行调整。</div>
    <div class="pl-detail">查看明细 <van-icon name="arrow-down" size="12" /></div>

    <button class="pension-btn" :disabled="done" @click="onConfirm">确认</button>
  </div>
</template>

<script>
export default {
  name: 'PensionPlanConfirm',
  props: { data: { type: Array, default: () => [] } },
  data() {
    // 默认选中第二项（精致型）
    return { activeIndex: this.data.length > 1 ? 1 : 0, done: false }
  },
  computed: {
    current() {
      return this.data[this.activeIndex] || {}
    }
  },
  methods: {
    onConfirm() {
      if (this.done) return
      this.done = true
      this.$emit('submit', {
        query: this.current.name,
        event_type: 'ui-pension-plan-confirm',
        event_payload: { planType: this.current.name }
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

.pl-tabs {
  display: flex;
  background: #f7f8fa;
  border-radius: 6px;
  padding: 3px;
}

.pl-tab {
  flex: 1;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #808080;
  border-radius: 4px;
}

.pl-tab.active {
  background: #fff;
  color: #e54c4c;
  box-shadow: 0 1px 4px rgba(229, 76, 76, 0.12);
}

.pl-amount-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 18px;
}

.pl-label {
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
}

.pl-amount {
  font-family: 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #0d0d0d;
}

.pl-unit {
  font-family: 'PingFang SC', sans-serif;
  font-weight: 400;
}

.pl-equal {
  margin-top: 6px;
  text-align: right;
  font-size: 12px;
  color: #dc6d1c;
}

.pl-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  line-height: 18px;
  border-top: 1px solid #f2f3f5;
  padding-top: 10px;
}

.pl-detail {
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  color: #808080;
}

.pension-btn {
  margin-top: 14px;
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
