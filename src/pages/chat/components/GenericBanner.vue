<template>
  <div class="generic-banner">
    <img class="gb-img" :src="data.img" alt="" @click="onClick" />

    <!-- name=assets-allocate：点击调起半屏弹窗（固定图片） -->
    <van-popup v-model="showSheet" position="bottom" round :style="{ height: '85%' }">
      <div class="gb-sheet">
        <div class="gb-head">
          <span class="gb-title">智能资产配置</span>
          <span class="gb-cancel" @click="showSheet = false">取消</span>
        </div>
        <div class="gb-scroll">
          <img class="gb-sheet-img" :src="izhipeiImg" alt="" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import izhipeiImg from '../assets/img/izhipei.png'

export default {
  name: 'GenericBanner',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return { izhipeiImg, showSheet: false }
  },
  methods: {
    onClick() {
      // 调起半屏弹窗类型
      if (this.data.name === 'assets-allocate') {
        this.showSheet = true
        return
      }
      const url = this.data.url
      if (!url) return
      // 外链直接跳转；站内路由 demo 阶段先抛事件
      if (/^https?:/.test(url)) {
        window.open(url, '_blank')
      } else {
        this.$emit('navigate', url)
      }
    }
  }
}
</script>

<style scoped>
.generic-banner {
  width: 327px;
  max-width: 100%;
}

.gb-img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

/* 半屏弹窗 */
.gb-sheet {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.gb-head {
  flex: none;
  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f2f3f5;
}

.gb-title {
  font-size: 18px;
  font-weight: 500;
  color: #0d0d0d;
}

.gb-cancel {
  position: absolute;
  right: 16px;
  font-size: 14px;
  color: #808080;
}

.gb-scroll {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.gb-sheet-img {
  display: block;
  width: 100%;
}
</style>
