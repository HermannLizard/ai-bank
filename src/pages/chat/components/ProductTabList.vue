<template>
  <div class="product-tab-list">
    <div class="ptl-card">
      <!-- 头部 -->
      <div class="ptl-head">
        <span class="ptl-title">小京精选</span>
        <span class="ptl-more">更多产品 ›</span>
      </div>

      <!-- 期限标签 -->
      <div class="ptl-tabs">
        <div
          v-for="(cat, i) in data"
          :key="cat.categoryName"
          class="ptl-tab"
          :class="{ active: i === activeIndex }"
          @click="activeIndex = i"
        >
          {{ cat.categoryDesc }}
        </div>
      </div>

      <!-- 产品列表 -->
      <div class="ptl-products">
        <div v-for="p in currentProducts" :key="p.id" class="prod">
          <div class="prod-top">
            <span class="prod-name">{{ p.name }}</span>
            <span v-for="t in p.tags" :key="t" class="prod-tag">{{ t }}</span>
          </div>
          <div class="prod-mid">
            <div class="prod-left">
              <div class="prod-rate">+{{ ratePct(p.rate) }}%</div>
              <div class="prod-ratedesc">{{ p.rateDesc }}</div>
            </div>
            <div class="prod-right">
              <div class="prod-base">{{ p.baseAmount }}</div>
              <div class="prod-remark">{{ p.remark.join('  ') }}</div>
            </div>
          </div>
          <van-button round class="prod-btn" @click="$emit('buy', p)">去买入</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductTabList',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  computed: {
    currentProducts() {
      const cat = this.data[this.activeIndex]
      return (cat && cat.products) || []
    }
  },
  methods: {
    ratePct(rate) {
      return (Number(rate || 0) * 100).toFixed(2)
    }
  }
}
</script>

<style scoped>
.product-tab-list {
  width: 343px;
  max-width: 100%;
}

.ptl-card {
  background: linear-gradient(180deg, #ffefdc 0%, #fff 22%);
  border-radius: 10px;
  padding: 14px 12px;
  box-sizing: border-box;
}

/* 头部 */
.ptl-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 4px;
}

.ptl-title {
  font-size: 20px;
  font-weight: 600;
  color: #98562d;
}

.ptl-more {
  font-size: 12px;
  color: #808080;
}

/* 标签 */
.ptl-tabs {
  display: flex;
  gap: 28px;
  padding: 14px 4px 4px;
}

.ptl-tab {
  position: relative;
  font-size: 13px;
  color: #333;
  padding-bottom: 8px;
}

.ptl-tab.active {
  font-size: 15px;
  font-weight: 500;
  color: #0d0d0d;
}

.ptl-tab.active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  border-radius: 1px;
  background: #0d0d0d;
}

/* 产品卡 */
.ptl-products {
  margin-top: 8px;
}

.prod {
  background: #f8f8f8;
  border: 1px solid #fff;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
}

.prod:last-child {
  margin-bottom: 0;
}

.prod-top {
  display: flex;
  align-items: center;
  gap: 6px;
}

.prod-name {
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
}

.prod-tag {
  font-size: 10px;
  color: #fffdfb;
  padding: 2px 6px;
  border-radius: 3px;
  background: linear-gradient(135deg, #e3c189, #c2974d);
}

.prod-mid {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
}

.prod-left {
  flex: none;
}

.prod-rate {
  font-family: 'D-DIN-PRO', 'Helvetica Neue', Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #e62c3b;
  line-height: 1.2;
}

.prod-ratedesc {
  margin-top: 4px;
  font-size: 12px;
  color: #808080;
}

.prod-right {
  flex: 1;
  text-align: left;
  padding-left: 24px;
}

.prod-base {
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
}

.prod-remark {
  margin-top: 4px;
  font-size: 12px;
  color: #808080;
}

.prod-btn {
  display: block;
  margin: 12px auto 0;
  width: 120px;
  height: 34px;
  background: #e54c4c;
  border-color: #e54c4c;
  color: #fff;
  font-size: 14px;
}
</style>
