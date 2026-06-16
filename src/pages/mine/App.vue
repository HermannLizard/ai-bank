<template>
  <div class="page">
    <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="goIndex" />
    <van-cell-group>
      <van-cell title="姓名" value="张三" />
      <van-cell title="手机号" value="138****0000" />
      <van-cell title="返回首页" is-link @click="goIndex" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goIndex() {
      window.location.href = 'index.html'
    }
  }
}
</script>

<style>
.page {
  min-height: 100vh;
  background: #f7f8fa;
}
</style>
