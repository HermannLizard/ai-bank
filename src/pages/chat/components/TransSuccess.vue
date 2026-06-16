<template>
  <div class="trans-success">
    <div class="ts-card">
      <van-icon name="checked" class="ts-icon" />
      <div class="ts-body">
        <div class="ts-title">{{ data.title || '转账成功' }}</div>
        <div class="ts-tip">{{ data.tip || '预计10秒内到账，实际时间取决于对方银行' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransSuccess',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.trans-success {
  width: 327px;
  max-width: 100%;
}

.ts-card {
  background: #fff;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.ts-icon {
  flex: none;
  font-size: 40px;
  color: #1bc47d;
}

.ts-body {
  flex: 1;
  min-width: 0;
}

.ts-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.ts-tip {
  margin-top: 6px;
  font-size: 12px;
  color: #808080;
}
</style>
