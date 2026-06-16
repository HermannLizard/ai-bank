<template>
  <div class="returns-overview-total">
    <div class="rot-row">
      <div class="rot-col">
        <div class="rot-lbl">{{ data.returnsDesc }}</div>
        <div class="rot-val">+{{ money(data.returns) }}</div>
      </div>
      <div class="rot-col right">
        <div class="rot-lbl">{{ data.returnRateDesc }}</div>
        <div class="rot-val">+{{ ratePct(data.returnRate) }}%</div>
      </div>
    </div>
    <div class="rot-foot">
      <span class="rot-update">{{ data.updateDateDesc }}</span>
      <span class="rot-trend">查看收益走势 ›</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReturnsOverviewTotal',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    money(n) {
      return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    ratePct(rate) {
      return (Number(rate || 0) * 100).toFixed(2)
    }
  }
}
</script>

<style scoped>
.returns-overview-total {
  width: 343px;
  max-width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 16px;
  box-sizing: border-box;
}

.rot-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.rot-col.right {
  text-align: right;
}

.rot-lbl {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  line-height: 22px;
}

.rot-val {
  font-family: 'D-DIN-PRO', 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #e62c3b;
  line-height: 36px;
}

.rot-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.rot-update {
  font-size: 12px;
  color: #b1b1b1;
}

.rot-trend {
  font-size: 12px;
  color: #808080;
  background: #f2f2f2;
  border-radius: 20px;
  padding: 2px 8px;
}
</style>
