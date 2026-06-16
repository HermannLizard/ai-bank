<template>
  <van-popup
    :value="visible"
    position="bottom"
    round
    :style="{ height: '85%' }"
    @input="$emit('update:visible', $event)"
  >
    <div class="pd">
      <!-- 固定头部（不随内容滚动） -->
      <div class="pd-head">
        <span class="pd-title">产品详情</span>
        <span class="pd-cancel" @click="$emit('update:visible', false)">取消</span>
      </div>

      <!-- 可滚动的产品详情（demo 阶段整体用一张图代替） -->
      <div class="pd-scroll">
        <img class="pd-img" :src="detailImg" alt="产品详情" />
      </div>

      <!-- 底部操作栏 -->
      <div class="pd-actions">
        <div class="pd-tip">15:00前购买，预计06-16确认</div>
        <div class="pd-bar">
          <div class="pd-fav">
            <van-icon name="star" color="#e54c4c" size="22" />
            <span>已收藏</span>
          </div>
          <button class="pd-buy" @click="onBuy">购买</button>
        </div>
      </div>
    </div>

    <!-- 支付密码 -->
    <pay-password :visible.sync="showPwd" account="0089" @done="onPaid" />
  </van-popup>
</template>

<script>
import PayPassword from './PayPassword.vue'
import detailImg from '../assets/img/product-detail.png'

export default {
  name: 'ProductDetail',
  components: { PayPassword },
  props: {
    visible: { type: Boolean, default: false },
    product: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      detailImg,
      showPwd: false
    }
  },
  methods: {
    onBuy() {
      this.showPwd = true
    },
    // 支付密码完成 → 通知父级交易完成
    onPaid() {
      this.$emit('paid', this.product)
    }
  }
}
</script>

<style scoped>
.pd {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 固定头部 */
.pd-head {
  flex: none;
  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f2f3f5;
}

.pd-title {
  font-size: 18px;
  font-weight: 500;
  color: #0d0d0d;
}

.pd-cancel {
  position: absolute;
  right: 16px;
  font-size: 14px;
  color: #808080;
}

.pd-scroll {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.pd-img {
  display: block;
  width: 100%;
}

/* 底部操作栏 */
.pd-actions {
  flex: none;
  border-top: 1px solid #f2f3f5;
}

.pd-tip {
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 12px;
  color: #e54c4c;
  background: #fff5f5;
}

.pd-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px calc(6px + env(safe-area-inset-bottom));
  background: #fff;
}

.pd-fav {
  flex: none;
  width: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  color: #808080;
}

.pd-buy {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 24px;
  background: linear-gradient(90deg, #f15b5b, #e54c4c);
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

.pd-buy:active {
  opacity: 0.9;
}
</style>
