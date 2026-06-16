<template>
  <div class="fin-success">
    <div class="fs-card">
      <img class="fs-icon" :src="iconSuccess" alt="" />
      <div class="fs-title">{{ data.title || '您的交易委托已接收' }}</div>
      <div class="fs-sub">{{ data.sub || '该笔交易成功与否以产品管理机构确认结果为准，您在「理财-我的理财」进行查询' }}</div>

      <div class="timeline">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="tl-item"
          :class="{ active: i < current, last: i === steps.length - 1 }"
        >
          <div class="tl-axis">
            <span class="tl-dot"></span>
            <span v-if="i !== steps.length - 1" class="tl-line"></span>
          </div>
          <div class="tl-body">
            <div class="tl-step-title">{{ step.title }}</div>
            <div class="tl-step-content">{{ step.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconSuccess from '../assets/img/icon-success.png'

export default {
  name: 'FinPurchaseSuccess',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return { iconSuccess }
  },
  computed: {
    steps() {
      return (this.data.timeline && this.data.timeline.all) || []
    },
    current() {
      return (this.data.timeline && this.data.timeline.current) || 0
    }
  }
}
</script>

<style scoped>
.fin-success {
  width: 327px;
  max-width: 100%;
}

.fs-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.fs-icon {
  display: block;
  width: 56px;
  height: 56px;
  margin: 0 auto;
}

.fs-title {
  margin-top: 12px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.fs-sub {
  margin: 8px auto 0;
  max-width: 286px;
  text-align: center;
  font-size: 14px;
  color: #808080;
  line-height: 20px;
}

/* 时间线 */
.timeline {
  margin-top: 20px;
  padding-left: 4px;
}

.tl-item {
  display: flex;
  gap: 10px;
}

.tl-axis {
  flex: none;
  width: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tl-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #d8d8d8;
  margin-top: 2px;
}

.tl-item.active .tl-dot {
  background: #ff7a00;
}

.tl-line {
  flex: 1;
  width: 2px;
  background: #ebedf0;
  margin: 2px 0;
}

.tl-item.active .tl-line {
  background: #ffd0a6;
}

.tl-body {
  flex: 1;
  padding-bottom: 16px;
}

.tl-item.last .tl-body {
  padding-bottom: 0;
}

.tl-step-title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.95);
  line-height: 14px;
}

.tl-item:not(.active) .tl-step-title {
  color: #808080;
}

.tl-step-content {
  margin-top: 6px;
  font-size: 12px;
  color: #808080;
}
</style>
