<template>
  <div class="pension-card">
    <div class="pac-title">添加其他备老资产</div>

    <div class="pac-row" @click="openInner">
      <div class="pac-icon inner">内</div>
      <div class="pac-main">
        <div class="pac-name">
          行内资产添加
          <span v-if="innerCount" class="pac-badge">待添加 {{ innerCount }} 笔</span>
        </div>
        <div class="pac-desc">将现有持仓产品添加至备老账本，独立管理、跟踪投资表现。</div>
      </div>
      <van-icon name="arrow" size="14" class="pac-arrow" />
    </div>

    <div class="pac-row" @click="$emit('outer')">
      <div class="pac-icon outer">外</div>
      <div class="pac-main">
        <div class="pac-name">行外资产添加</div>
        <div class="pac-desc">将行外已储备的养老资产添加进备老账本，以便更全面地管理和规划未来的养老生活。</div>
      </div>
      <van-icon name="arrow" size="14" class="pac-arrow" />
    </div>

    <div class="pac-skip" @click="onSkip">暂不添加</div>

    <pension-add-asset-sheet :visible.sync="sheetVisible" :list="data.inner || []" @confirm="onAdded" />
  </div>
</template>

<script>
import PensionAddAssetSheet from './PensionAddAssetSheet.vue'

export default {
  name: 'PensionAssetsConfirm',
  components: { PensionAddAssetSheet },
  props: { data: { type: Object, default: () => ({ inner: [] }) } },
  data() {
    return { sheetVisible: false, done: false }
  },
  computed: {
    innerCount() {
      return (this.data.inner || []).length
    }
  },
  methods: {
    openInner() {
      if (this.done) return
      this.sheetVisible = true
    },
    onAdded(ids) {
      if (this.done) return
      this.done = true
      this.$emit('submit', {
        query: '已添加',
        event_type: 'ui-pension-private-assets-confirm',
        event_payload: { assets: ids }
      })
    },
    onSkip() {
      if (this.done) return
      this.done = true
      this.$emit('submit', {
        query: '暂不添加',
        event_type: 'ui-pension-private-assets-confirm',
        event_payload: { assets: [] }
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

.pac-title {
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
}

.pac-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 14px;
  padding: 12px;
  background: #f7f8fa;
  border-radius: 8px;
}

.pac-icon {
  flex: none;
  width: 29px;
  height: 29px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #fff;
}

.pac-icon.inner {
  background: linear-gradient(180deg, #ffa7a7, #ff6e6e);
}

.pac-icon.outer {
  background: linear-gradient(180deg, #b6dcff, #6eb7ff);
}

.pac-main {
  flex: 1;
  min-width: 0;
}

.pac-name {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
}

.pac-badge {
  font-size: 10px;
  color: #fff;
  background: #e54c4c;
  border-radius: 8px 8px 8px 0;
  padding: 2px 6px;
}

.pac-desc {
  margin-top: 6px;
  font-size: 12px;
  color: #808080;
  line-height: 18px;
}

.pac-arrow {
  align-self: center;
  color: #c8c9cc;
}

.pac-skip {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  color: #808080;
}
</style>
