<template>
  <div class="page">
    <van-nav-bar title="首页" />
    <van-cell-group>
      <van-cell title="跳转到我的页面" is-link @click="goMine" />
    </van-cell-group>
    <div class="content">
      <van-button type="primary" block @click="onClick">点我</van-button>
      <p class="tip" v-if="count">已点击 {{ count }} 次</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    onClick() {
      this.count++
    },
    goMine() {
      window.location.href = 'mine.html'
    }
  }
}
</script>

<style>
.page {
  min-height: 100vh;
  background: #f7f8fa;
}
.content {
  padding: 16px;
}
.tip {
  margin-top: 12px;
  color: #969799;
  font-size: 14px;
  text-align: center;
}
</style>
