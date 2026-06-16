<template>
  <div class="suggest">
    <div
      v-for="(s, i) in data"
      :key="i"
      class="suggest-chip"
      @click="$emit('use', s)"
    >
      <span>{{ s.question }}</span>
      <van-icon name="arrow" size="12" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuggestChips',
  props: {
    // [{ scene, question }]
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.suggest {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.suggest-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
  padding: 8px 14px;
  background: #fff;
  border: 1px solid #e6ecf7;
  border-radius: 18px;
  font-size: 14px;
  color: #165dff;
}

.suggest-chip :deep(.van-icon),
.suggest-chip >>> .van-icon {
  color: #165dff;
}
</style>
