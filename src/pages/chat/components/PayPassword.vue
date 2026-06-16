<template>
  <van-popup :value="visible" position="bottom" round get-container="body" @input="$emit('update:visible', $event)" @closed="onClosed">
    <div class="pwd-sheet">
      <!-- 标题栏 -->
      <div class="pwd-head">
        <van-icon name="cross" class="pwd-close" @click="close" />
        <span class="pwd-title">请输入支付密码</span>
        <span class="pwd-forget">忘记密码？</span>
      </div>
      <p class="pwd-sub">
        请输入 <span class="hl">北京银行账户（{{ account }}）</span> 的支付密码
      </p>

      <!-- 6 位密码框 -->
      <div class="pwd-boxes">
        <div v-for="i in 6" :key="i" class="pwd-box"><i v-if="pwd.length >= i"></i></div>
      </div>

      <!-- 安全键盘 -->
      <div class="keyboard">
        <div class="kb-head">
          <span class="kb-logo">京</span>
          <span class="kb-title">北京银行安全键盘</span>
          <van-icon name="closed-eye" class="kb-hide" @click="close" />
        </div>
        <div class="kb-grid">
          <div
            v-for="(k, idx) in keypad"
            :key="idx"
            class="kb-key"
            :class="{ empty: k === '', del: k === 'del' }"
            @click="onKey(k)"
          >
            <span v-if="k === 'del'" class="kb-del">⌫</span>
            <template v-else>{{ k }}</template>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'PayPassword',
  props: {
    visible: { type: Boolean, default: false },
    account: { type: String, default: '****' }
  },
  data() {
    return {
      pwd: '',
      done: false,
      keypad: []
    }
  },
  watch: {
    visible(val) {
      if (val) {
        // 每次打开：清空密码、重置状态、刷新随机键盘
        this.pwd = ''
        this.done = false
        this.keypad = this.genKeypad()
      }
    }
  },
  methods: {
    // 生成随机安全键盘：0-9 乱序，左下角留空，右下角为删除键
    genKeypad() {
      const d = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      for (let i = d.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[d[i], d[j]] = [d[j], d[i]]
      }
      return [d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], '', d[9], 'del']
    },
    close() {
      this.$emit('update:visible', false)
    },
    onKey(k) {
      if (k === '') return
      if (k === 'del') {
        this.pwd = this.pwd.slice(0, -1)
        return
      }
      if (this.pwd.length >= 6) return
      this.pwd += k
      if (this.pwd.length === 6) {
        // 密码输入完成（mock 校验通过）：关闭弹窗
        this.done = true
        setTimeout(() => this.close(), 150)
      }
    },
    // 关闭动画结束后，若已输满则通知父级
    onClosed() {
      if (this.done) {
        this.done = false
        this.$emit('done')
      }
    }
  }
}
</script>

<style scoped>
.pwd-sheet {
  background: #fff;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}

.pwd-head {
  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pwd-close {
  position: absolute;
  left: 16px;
  color: #0d0d0d;
  font-size: 20px;
}

.pwd-title {
  font-size: 18px;
  font-weight: 500;
  color: #0d0d0d;
}

.pwd-forget {
  position: absolute;
  right: 16px;
  font-size: 14px;
  color: #7698e5;
}

.pwd-sub {
  margin: 0;
  text-align: center;
  font-size: 14px;
  color: #808080;
}

.pwd-sub .hl {
  color: #e54c4c;
}

.pwd-boxes {
  display: flex;
  gap: 8px;
  padding: 24px 24px 32px;
}

.pwd-box {
  flex: 1;
  height: 52px;
  border: 1px solid #ebedf0;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pwd-box i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #0d0d0d;
}

.keyboard {
  background: #f2f3f5;
  padding: 0 6px calc(6px + env(safe-area-inset-bottom));
}

.kb-head {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.kb-logo {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e54c4c;
  color: #fff;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}

.kb-title {
  font-size: 14px;
  color: #808080;
}

.kb-hide {
  position: absolute;
  right: 10px;
  color: #969799;
  font-size: 18px;
}

.kb-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.kb-key {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: #323233;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  user-select: none;
}

.kb-key:active {
  background: #ddd;
}

.kb-key.empty {
  background: transparent;
  box-shadow: none;
  pointer-events: none;
}

.kb-key.del {
  background: #e6e6e6;
  box-shadow: none;
}

.kb-del {
  font-size: 24px;
  color: #323233;
}
</style>
