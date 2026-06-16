<template>
  <div class="pension-card">
    <div class="pac-q">好的，请问您是否缴纳<b>企业年金</b>？</div>
    <div
      v-for="opt in options"
      :key="String(opt.value)"
      class="pac-opt"
      :class="{ selected: selected === opt.value }"
      @click="onSelect(opt)"
    >
      <span class="pac-radio" :class="{ on: selected === opt.value }">
        <van-icon v-if="selected === opt.value" name="success" size="12" color="#fff" />
      </span>
      <span class="pac-label">{{ opt.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PensionAnnuityConfirm',
  data() {
    return {
      selected: null,
      done: false,
      options: [
        { label: '是的，有缴纳企业年金', value: true },
        { label: '没有缴纳企业年金', value: false }
      ]
    }
  },
  methods: {
    onSelect(opt) {
      if (this.done) return
      this.selected = opt.value
      this.done = true
      this.$emit('submit', {
        query: opt.label,
        event_type: 'ui-pension-corporate-annuity-confirm',
        event_payload: { corporateAnnuity: opt.value }
      })
    }
  }
}
</script>

<style scoped>
.pension-card {
  width: 319px;
  max-width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 16px;
  box-sizing: border-box;
}

.pac-q {
  font-size: 14px;
  color: #0d0d0d;
  line-height: 22px;
}

.pac-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  margin-top: 12px;
  padding: 0 12px;
  background: #f7f8fa;
  border-radius: 8px;
}

.pac-radio {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 0.5px solid #e54c4c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pac-radio.on {
  background: #e54c4c;
  border-color: #e54c4c;
}

.pac-label {
  font-size: 14px;
  color: #0d0d0d;
}
</style>
