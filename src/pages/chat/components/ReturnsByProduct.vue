<template>
  <div class="returns-by-product">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="rbp-title" v-html="data.titleRichText"></div>
    <div class="rbp-card">
      <div
        v-for="(p, i) in data.list"
        :key="i"
        class="rbp-item"
        :style="{ background: bgFor(p) }"
      >
        <div class="rbp-top">
          <span class="rbp-name">{{ p.productName }}</span>
          <span class="rbp-tag" :style="tagStyle(p)">{{ p.productType }}</span>
        </div>
        <span v-if="p.cardNoDesc" class="rbp-cardno">{{ p.cardNoDesc }}</span>
        <div class="rbp-amounts">
          <div class="rbp-col">
            <div class="rbp-val">{{ money(p.holdings) }}</div>
            <div class="rbp-lbl">{{ p.holdingsDesc }}</div>
          </div>
          <div class="rbp-col right">
            <div class="rbp-val red">+{{ money(p.returns) }}</div>
            <div class="rbp-lbl">{{ p.returnsDesc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const TAG_STYLES = {
  基金: { color: '#ca7531', background: '#ffefe4', borderColor: '#ca7530' },
  理财: { color: '#e54c4c', background: '#fceaea', borderColor: '#e54c4c' },
  黄金: { color: '#c3a776', background: '#f8f4ef', borderColor: '#c3a776' }
}

export default {
  name: 'ReturnsByProduct',
  props: {
    data: {
      type: Object,
      default: () => ({ list: [] })
    }
  },
  methods: {
    money(n) {
      return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    bgFor(p) {
      return p.productType === '黄金' ? '#fffbf3' : '#fff8f8'
    },
    tagStyle(p) {
      const s = TAG_STYLES[p.productType] || TAG_STYLES['基金']
      return { color: s.color, background: s.background, border: `0.5px solid ${s.borderColor}` }
    }
  }
}
</script>

<style scoped>
.returns-by-product {
  width: 343px;
  max-width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 16px 14px;
  box-sizing: border-box;
}

.rbp-title {
  font-size: 16px;
  color: #333;
  line-height: 20px;
  margin-bottom: 14px;
}

.rbp-item {
  border-radius: 6px;
  padding: 14px 12px;
  margin-bottom: 12px;
}

.rbp-item:last-child {
  margin-bottom: 0;
}

.rbp-top {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rbp-name {
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
}

.rbp-tag {
  font-size: 12px;
  line-height: 1;
  padding: 3px 4px;
  border-radius: 4px;
}

.rbp-cardno {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  color: #808080;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 2px 5px;
}

.rbp-amounts {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;
}

.rbp-col.right {
  text-align: right;
}

.rbp-val {
  font-family: 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #0d0d0d;
  line-height: 20px;
}

.rbp-val.red {
  color: #e54c4c;
}

.rbp-lbl {
  margin-top: 8px;
  font-size: 14px;
  color: #808080;
}
</style>
