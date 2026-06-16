<template>
  <van-popup :value="visible" position="bottom" round get-container="body" @input="$emit('update:visible', $event)">
    <div class="aas">
      <div class="aas-head">
        <span class="aas-cancel" @click="$emit('update:visible', false)">取消</span>
        <span class="aas-title">行内资产</span>
      </div>

      <div class="aas-list">
        <div v-for="a in list" :key="a.id" class="aas-item" @click="toggle(a.id)">
          <span class="aas-check" :class="{ on: isSel(a.id) }">
            <van-icon v-if="isSel(a.id)" name="success" size="14" color="#fff" />
          </span>
          <div class="aas-info">
            <div class="aas-name">{{ a.name }}</div>
            <div class="aas-sub">
              <span class="aas-amt">{{ a.amountDesc }} <b>¥ {{ money(a.amount) }}</b></span>
              <span class="aas-card">{{ a.cardDesc }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="aas-bar">
        <span class="aas-check sm" :class="{ on: allSelected }" @click="toggleAll">
          <van-icon v-if="allSelected" name="success" size="12" color="#fff" />
        </span>
        <span class="aas-all" @click="toggleAll">全选</span>
        <span class="aas-count">已选 <b>{{ selected.length }}</b></span>
        <button class="aas-confirm" :disabled="!selected.length" @click="onConfirm">确认添加</button>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'PensionAddAssetSheet',
  props: {
    visible: { type: Boolean, default: false },
    list: { type: Array, default: () => [] }
  },
  data() {
    return { selected: [] }
  },
  computed: {
    allSelected() {
      return this.list.length > 0 && this.selected.length === this.list.length
    }
  },
  watch: {
    visible(val) {
      if (val) this.selected = this.list.map((a) => a.id) // 默认全选
    }
  },
  methods: {
    money(n) {
      return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    isSel(id) {
      return this.selected.includes(id)
    },
    toggle(id) {
      const i = this.selected.indexOf(id)
      if (i > -1) this.selected.splice(i, 1)
      else this.selected.push(id)
    },
    toggleAll() {
      this.selected = this.allSelected ? [] : this.list.map((a) => a.id)
    },
    onConfirm() {
      if (!this.selected.length) return
      this.$emit('confirm', this.selected.slice())
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.aas {
  background: #fff;
  border-radius: 12px 12px 0 0;
}

.aas-head {
  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aas-cancel {
  position: absolute;
  left: 16px;
  font-size: 14px;
  color: #808080;
}

.aas-title {
  font-size: 18px;
  font-weight: 500;
  color: #0d0d0d;
}

.aas-list {
  max-height: 50vh;
  overflow-y: auto;
}

.aas-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #f2f3f5;
}

.aas-check {
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aas-check.on {
  background: #e54c4c;
  border-color: #e54c4c;
}

.aas-check.sm {
  width: 18px;
  height: 18px;
}

.aas-info {
  flex: 1;
  min-width: 0;
}

.aas-name {
  font-size: 14px;
  color: #0d0d0d;
}

.aas-sub {
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.aas-amt {
  font-size: 12px;
  color: #808080;
}

.aas-amt b {
  font-family: 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  color: #0d0d0d;
}

.aas-card {
  font-size: 12px;
  color: #808080;
}

.aas-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
}

.aas-all {
  font-size: 14px;
  color: #0d0d0d;
}

.aas-count {
  flex: 1;
  font-size: 14px;
  color: #808080;
}

.aas-count b {
  color: #323232;
}

.aas-confirm {
  width: 160px;
  height: 44px;
  border: none;
  border-radius: 22px;
  background: #e54c4c;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

.aas-confirm:disabled {
  opacity: 0.5;
}
</style>
