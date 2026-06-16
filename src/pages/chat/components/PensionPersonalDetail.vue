<template>
  <div class="pension-card">
    <div class="pc-title">请确认您的信息</div>
    <div class="pc-line">当前{{ data.age }}岁，</div>
    <div class="pc-line">
      您在
      <span class="pc-chip" @click="openPicker('begin')">{{ data.begin }}岁 <van-icon name="arrow-down" size="10" /></span>
      时参加工作，预计
      <span class="pc-chip" @click="openPicker('end')">{{ data.end }}岁 <van-icon name="arrow-down" size="10" /></span>
    </div>
    <div class="pc-line">
      在 <span class="pc-loc"><van-icon name="location" size="13" />{{ data.location }}</span> 退休
    </div>
    <button class="pension-btn" :disabled="done" @click="onConfirm">确认</button>

    <van-popup v-model="showPicker" position="bottom" get-container="body" round>
      <van-picker
        show-toolbar
        :title="pickerTitle"
        :columns="pickerColumns"
        :default-index="pickerDefaultIndex"
        @confirm="onPickerConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'PensionPersonalDetail',
  props: { data: { type: Object, default: () => ({}) } },
  data() {
    return {
      done: false,
      showPicker: false,
      pickerField: 'begin'
    }
  },
  computed: {
    pickerTitle() {
      return this.pickerField === 'begin' ? '参加工作年龄' : '退休年龄'
    },
    pickerColumns() {
      const range = this.pickerField === 'begin' ? [16, 35] : [50, 65]
      const columns = []
      for (let age = range[0]; age <= range[1]; age++) {
        columns.push(age + '岁')
      }
      return columns
    },
    pickerDefaultIndex() {
      const start = this.pickerField === 'begin' ? 16 : 50
      const current = Number(this.data[this.pickerField])
      const index = current - start
      return index >= 0 && index < this.pickerColumns.length ? index : 0
    }
  },
  methods: {
    openPicker(field) {
      if (this.done) return
      this.pickerField = field
      this.showPicker = true
    },
    onPickerConfirm(value) {
      this.data[this.pickerField] = parseInt(value, 10)
      this.showPicker = false
    },
    onConfirm() {
      if (this.done) return
      this.done = true
      this.$emit('submit', {
        query: '对的',
        event_type: 'ui-pension-personal-detail-confirm',
        event_payload: { begin: this.data.begin, end: this.data.end, location: this.data.location }
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

.pc-title {
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
}

.pc-line {
  margin-top: 14px;
  font-size: 14px;
  color: #0d0d0d;
  line-height: 22px;
}

.pc-chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: #f4f8ff;
  border-radius: 11px;
  padding: 2px 10px;
  margin: 0 2px;
  color: #0d0d0d;
}

.pc-loc {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #7698e5;
}

.pension-btn {
  margin-top: 16px;
  width: 100%;
  height: 44px;
  background: #fff;
  border: 1px solid #f0c6c6;
  border-radius: 8px;
  color: #e54c4c;
  font-size: 16px;
  font-weight: 500;
}

.pension-btn:active {
  background: #fff5f5;
}
</style>
