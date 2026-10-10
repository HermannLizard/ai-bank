<template>
  <van-popup
    v-model="visible"
    position="bottom"
    round
    :style="{ height: '45%' }"
    @opened="onOpened"
    @closed="onClosed"
  >
    <div class="voice-input-container">
      <!-- 关闭按钮 -->
      <van-icon name="cross" class="close-btn" @click="close" />

      <!-- 识别结果展示 -->
      <div class="text-display">
        {{ recognizedText || '正在聆听...' }}
      </div>

      <!-- Lottie 声纹动效容器 -->
      <div class="lottie-container" ref="lottieContainer"></div>
    </div>
  </van-popup>
</template>

<script>
import lottie from 'lottie-web';
// 引入 lottie json 文件
import waveAnimationData from '@/pages/chat/assets/lottie/wave.json';

export default {
  name: 'VoiceInput',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value,
      recognizedText: '',
      recognition: null,
      lottieInstance: null,
      silenceTimer: null,
      hasSpoken: false // 标记用户是否已经开始说话
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('input', val);
    }
  },
  mounted() {
    this.initSpeechRecognition();
  },
  beforeDestroy() {
    this.destroyLottie();
    this.stopRecognition();
    this.clearSilenceTimer();
  },
  methods: {
    // 弹窗完全打开后，初始化动画并开始录音
    onOpened() {
      this.recognizedText = '';
      this.hasSpoken = false;
      this.initLottie();
      this.startRecognition();
    },
    // 弹窗关闭后清理资源
    onClosed() {
      this.destroyLottie();
      this.stopRecognition();
      this.clearSilenceTimer();
    },
    close() {
      this.visible = false;
    },
    initLottie() {
      if (this.lottieInstance) return;
      this.lottieInstance = lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: waveAnimationData
      });
    },
    destroyLottie() {
      if (this.lottieInstance) {
        this.lottieInstance.destroy();
        this.lottieInstance = null;
      }
    },
    initSpeechRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        this.$toast('当前浏览器不支持语音识别(Web Speech API)');
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'zh-CN';
      this.recognition.continuous = true; 
      this.recognition.interimResults = true; 

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        this.recognizedText = finalTranscript + interimTranscript;
        
        // 关键修改：只有当监听到实际内容后，才开始 2s 的输入完毕判断
        if (this.recognizedText.trim().length > 0) {
          this.hasSpoken = true;
          this.resetSilenceTimer();
        }
      };

      // 关键修改：处理 API 在长时间静默后自动停止的情况
      this.recognition.onend = () => {
        // 如果面板还开着，且用户一直没说话，强制重新启动监听以保持"一直在听"的状态
        if (this.visible && !this.hasSpoken) {
          try {
            this.recognition.start();
          } catch (e) {
            console.warn('重新启动监听失败', e);
          }
        }
      };

      this.recognition.onerror = (event) => {
        console.error('语音识别错误: ', event.error);
        if (event.error === 'not-allowed') {
          this.$toast('请授予麦克风权限');
          this.close();
        }
      };
    },
    startRecognition() {
      if (!this.recognition) return;
      try {
        this.hasSpoken = false; // 重置说话状态
        this.recognition.start();
        // 移除此处的 resetSilenceTimer()，一开始不计时
      } catch (e) {
        console.warn('识别已经启动');
      }
    },
    stopRecognition() {
      if (this.recognition) {
        // 移除 onend 事件防止在关闭面板时触发重连逻辑
        this.recognition.onend = null; 
        this.recognition.stop();
        // 恢复 onend 绑定（如果是组件复用的话）
        setTimeout(() => {
          if (this.recognition) {
            this.recognition.onend = () => {
              if (this.visible && !this.hasSpoken) {
                try { this.recognition.start(); } catch (e) {}
              }
            };
          }
        }, 100);
      }
    },
    // 处理 2 秒无输入逻辑
    resetSilenceTimer() {
      this.clearSilenceTimer();
      this.silenceTimer = setTimeout(() => {
        this.finishInput();
      }, 2000);
    },
    clearSilenceTimer() {
      if (this.silenceTimer) {
        clearTimeout(this.silenceTimer);
        this.silenceTimer = null;
      }
    },
    // 输入完成：通知父组件并关闭弹窗
    finishInput() {
      this.stopRecognition();
      if (this.recognizedText.trim()) {
        this.$emit('complete', this.recognizedText);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
/* 样式保持不变 */
.voice-input-container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 20px;
  box-sizing: border-box;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 20px;
  color: #999;
  cursor: pointer;
}

.text-display {
  flex: 1;
  width: 100%;
  font-size: 20px;
  color: #333;
  text-align: center;
  font-weight: 500;
  margin-top: 40px;
  overflow-y: auto;
  word-break: break-all;
}

.lottie-container {
  width: 100%;
  height: 200px;
  margin-top: auto;
  margin-bottom: 20px;
}
</style>