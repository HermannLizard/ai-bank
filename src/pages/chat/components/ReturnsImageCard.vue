<template>
  <div class="returns-image-card">
    <img v-if="src" class="ric-img" :src="src" alt="" />
    <div v-else class="ric-empty">{{ placeholder }}</div>
  </div>
</template>

<script>
export default {
  name: 'ReturnsImageCard',
  props: {
    // 后端下发的图片地址
    img: { type: String, default: '' },
    // demo 阶段的本地兜底图
    fallback: { type: String, default: '' },
    placeholder: { type: String, default: '图片加载中…' }
  },
  computed: {
    src() {
      return this.img || this.fallback
    }
  }
}
</script>

<style scoped>
.returns-image-card {
  width: 343px;
  max-width: 100%;
}

.ric-img {
  display: block;
  width: 100%;
  border-radius: 6px;
}

.ric-empty {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 6px;
  color: #b1b1b1;
  font-size: 13px;
}
</style>
