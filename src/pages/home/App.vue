<template>
  <div class="home">
    <!-- 导航栏 -->
    <div class="navbar">
      <div class="nav-logo"></div>
      <div class="nav-actions">
        <div class="navi_actions_icon navi_actions_icon_mute"></div>
        <div class="navi_actions_icon navi_actions_icon_version_change"></div>
      </div>
    </div>

    <!-- 欢迎语 -->
    <div class="welcome">
      <div class="hello">
        <div class="hello_img"></div>
        <div class="hello_sub">
          <p>我是小京</p>
          <p>您的问题我来解答～</p>
        </div>
      </div>
      <div class="ip">
        <div class="ip_img"></div>
        <div class="ip_bubble"></div>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="main">
      <!-- 京行看板 -->
      <div class="card board-card">
        <div class="board-top">
          <span class="board-title">京行看板</span>
          <span class="asset-chip">
            <div class="chip-dot"></div>资产情况<van-icon name="arrow" size="10" color="#333" />
          </span>
        </div>
        <div class="board-stats">
          <div class="stat">
            <p class="stat-label">总资产</p>
            <p class="stat-value">
              <span class="num">{{ asset.total }}</span>
              <span class="unit">元</span>
            </p>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <p class="stat-label">最新收益({{ asset.profitDate }})</p>
            <p class="stat-value">
              <span class="num profit">{{ asset.profit }}</span>
              <span class="unit">元</span>
            </p>
          </div>
          <div class="sparkline"></div>
        </div>
        <div class="risk-banner">
          <div class="risk-text">
            <van-icon name="info-o" size="12" color="#e54c4c" />
            <span>您的风险评测还有<b>{{ asset.riskDays }}天</b>过期</span>
          </div>
          <span class="risk-btn">去评测</span>
        </div>
      </div>

      <!-- 功能图标 -->
      <div class="card func-card">
        <img class="func-icons" :src="img.funcIcons" alt="功能入口" />
      </div>

      <!-- 京选财富 -->
      <div class="card wealth-card">
        <!-- 一级标签 -->
        <div class="tabs">
          <div
            v-for="(t, i) in tabs"
            :key="t"
            class="tab"
            :class="{ active: i === activeTab }"
            @click="activeTab = i"
          >
            {{ t }}
            <span v-if="i === activeTab" class="tab-bar"></span>
          </div>
        </div>

        <!-- banner -->
        <img class="banner" :src="img.banner" alt="资产配置" />

        <!-- 小京为您优选 -->
        <h3 class="sec-title">小京为您优选</h3>
        <div class="product-row">
          <!-- 大卡 -->
          <div class="pcard-big">
            <img class="pcard-bg" :src="img.cardFlex" alt="" />
            <div class="pcard-content">
              <div class="pc-head">
                <span class="pc-fire">🔥</span>
                <span class="pc-head-txt">大家都在看</span>
              </div>
              <p class="pc-name">闲钱理财 灵活投资</p>
              <p class="pc-rate"><span class="big">4.73</span><span class="pct">%</span></p>
              <p class="pc-rate-label">近1月年化</p>
              <p class="pc-desc">全球配置高评级美元日...</p>
              <div class="pc-tags">
                <span class="pc-tag">低风险</span>
                <span class="pc-tag">1元起购</span>
              </div>
              <div class="pc-btn">查看详情</div>
            </div>
          </div>
          <!-- 右侧两张小卡 -->
          <div class="pcard-side">
            <img :src="img.cardNight" alt="理财夜市" />
            <img :src="img.cardIndex" alt="优质指数" />
          </div>
        </div>
        <div class="dots">
          <span class="dot active"></span><span class="dot"></span><span class="dot"></span>
        </div>

        <!-- 今日话题 -->
        <h3 class="sec-title topic-title">今日话题</h3>
        <div class="topic-list">
          <div v-for="(tp, i) in topics" :key="i" class="topic-item">
            <div class="topic-head">
              <span class="topic-icon">
                <van-icon name="chat-o" size="12" color="#e54c4c" />
              </span>
              <span class="topic-name">{{ tp.title }}</span>
              <van-icon class="topic-arrow" name="arrow" size="12" color="#bbb" />
            </div>
            <p v-if="tp.desc" class="topic-desc">{{ tp.desc }}</p>
            <div v-if="tp.vote" class="vote-bar">
              <div class="vote-yes">会</div>
              <div class="vote-no">不会</div>
              <span class="vote-vs">VS</span>
            </div>
          </div>
        </div>
        <div class="refresh">换一批</div>
      </div>
    </div>

    <!-- 底部AI输入 -->
    <div class="ai-footer">
      <div class="ai-bar">
        <span class="ai-mic"><van-icon name="service" size="18" color="#fff" /></span>
        <span class="ai-placeholder">可以帮您点什么～</span>
      </div>
      <p class="ai-caption">京智AI大模型提供服务，7*24小时安全守护</p>
      <div class="home-indicator"></div>
    </div>
  </div>
</template>

<script>
import concentric from './assets/concentric.png'
import mascot from './assets/mascot.png'
import funcIcons from './assets/func-icons.png'
import banner from './assets/banner.png'
import cardFlex from './assets/card-flex.png'
import cardNight from './assets/card-night.png'
import cardIndex from './assets/card-index.png'
import sparkline from './assets/sparkline.png'

export default {
  name: 'App',
  data() {
    return {
      img: {
        concentric,
        mascot,
        funcIcons,
        banner,
        cardFlex,
        cardNight,
        cardIndex,
        sparkline
      },
      asset: {
        total: '109423.56',
        profit: '+823.56',
        profitDate: '09-01',
        riskDays: 3
      },
      tabs: ['京选财富', '消费金融', '特色金融', '政务便民', '本地生活'],
      activeTab: 0,
      topics: [
        {
          title: '你认为美联储还会降息吗？',
          desc: '花旗集团预计,收疲软的劳动力市场数据支撑,美联储...',
          vote: true
        },
        { title: '你看好Al未来的发展吗?' },
        { title: '查查自己投资最近的收支情况。' }
      ]
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #f2f5f7;
}
</style>

<style scoped>
* {
  box-sizing: border-box;
}

.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-image: url('./assets/home_bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #f2f5f7;
  overflow-x: hidden;
  font-family: -apple-system, 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #0d0d0d;
  padding-bottom: 24px;
}

/* 导航栏 */
.navbar {
  position: relative;
  z-index: 2;
  height: 45px;
  /* padding: env(safe-area-inset-top, 20px) 16px 0; */
  padding: 44px 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;
}
.nav-logo {
  display: flex;
  background: url(./assets/version_logo.png) no-repeat;
  background-size: contain;
  width: 78px;
  height: 20px;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.navi_actions_icon_mute {
  background: url(./assets/navbar_btn_mute.png);
}
.navi_actions_icon_version_change {
  background: url(./assets/navbar_btn_change_version.png);
}
.navi_actions_icon {
  width: 24px;
  height: 22.5px;
  background-size: contain;
}

/* 欢迎语 */
.welcome {
  position: relative;
  z-index: 2;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
}
.hello {
  
}
.hello_img {
  background: url(./assets/helloU.png) no-repeat;
  width: 75.5px;
  height: 28px;
  background-size: contain;
  margin-bottom: 8px;
}
.hello_sub {
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  color: #34334c;
}
.hello_sub p {
  margin: 0;
}
.ip {
  position: absolute;
  right: 50px;
  top: 42px;
  width: 80px;
  height: 107px;
}
.ip_img {
  width: 100%;
  height: 100%;
  background: url(./assets/jing_ip.png) no-repeat;
  background-size: contain;
}
.ip_bubble {
  width: 166px;
  height: 53.5px;
  background: url(./assets/bubble.png) no-repeat;
  background-size: contain;
  position: absolute;
  top: -35px;
  left: -80px;
}

/* 通用卡片 */
.main {
  position: relative;
  z-index: 2;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card {
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 6px 20px rgba(210, 160, 150, 0.12);
}

/* 京行看板 */
.board-card {
  position: relative;
  padding: 16px;
  background: linear-gradient(180deg, #fff5f3 0%, #ffffff 42%);
  overflow: hidden;
}
.board-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.board-title {
  font-size: 15px;
  font-weight: 700;
  color: #0d0d0d;
}
.asset-chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 8px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  background: linear-gradient(160deg, #ffecec 3%, #ffffff 54%);
  font-size: 12px;
  color: #333;
  box-shadow: 0 2px 4px rgba(253, 212, 212, 0.42);
}
.chip-dot {
  width: 15px;
  height: 16px;
  background: url(./assets/icon_coin.png) no-repeat;
  background-size: contain;
}
.sparkline {
  /* position: absolute;
  top: 54px;
  right: 18px; */
  width: 70px;
  height: 44px;
  background: url(./assets/fake_chart.png) no-repeat;
  background-size: contain;
}
.board-stats {
  display: flex;
  align-items: flex-start;
  margin-top: 22px;
}
.stat {
  flex: 1;
}
.stat:last-of-type {
  padding-left: 24px;
}
.stat-divider {
  width: 1px;
  height: 36px;
  margin-top: 6px;
  background: #eee;
}
.stat-label {
  font-size: 12px;
  color: #808080;
  margin-bottom: 8px;
}
.stat-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.stat-value .num {
  font-size: 24px;
  font-weight: 600;
  color: #0d0d0d;
  font-family: 'DIN Alternate', 'D-DIN-PRO', -apple-system, sans-serif;
  letter-spacing: -0.5px;
}
.stat-value .num.profit {
  color: #fb0031;
}
.stat-value .unit {
  font-size: 12px;
  color: #333;
}
.risk-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 9px 12px;
  border-radius: 8px;
  background: linear-gradient(90deg, #fff6f2, #ffeee8);
}
.risk-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #808080;
}
.risk-text b {
  color: #333;
  font-weight: 400;
}
.risk-btn {
  padding: 2px 8px;
  border-radius: 17px;
  background: #ffe5dd;
  font-size: 12px;
  font-weight: 500;
  color: #e54c4c;
}

/* 功能图标 */
.func-card {
  padding: 16px 0;
}
.func-icons {
  display: block;
  width: 321px;
  margin: 0 auto;
}

/* 京选财富 */
.wealth-card {
  padding: 0 16px 16px;
  background: linear-gradient(180deg, #fff8f6 0%, #ffffff 120px);
}
.tabs {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  height: 48px;
  overflow: hidden;
}
.tab {
  position: relative;
  font-size: 14px;
  color: #0d0d0d;
  padding-bottom: 10px;
  white-space: nowrap;
  flex-shrink: 0;
}
.tab.active {
  font-size: 18px;
  font-weight: 500;
  color: #e54c4c;
}
.tab-bar {
  position: absolute;
  left: 50%;
  bottom: 4px;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  border-radius: 1px;
  background: #e54c4c;
}
.banner {
  display: block;
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
}
.sec-title {
  margin: 24px 0 0;
  font-size: 16px;
  font-weight: 500;
  color: #0d0d0d;
}

/* 产品区 */
.product-row {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.pcard-big {
  position: relative;
  width: 170px;
  height: 252px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}
.pcard-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pcard-content {
  position: absolute;
  inset: 0;
  padding: 14px;
  display: flex;
  flex-direction: column;
}
.pc-head {
  display: flex;
  align-items: center;
  gap: 4px;
}
.pc-fire {
  font-size: 13px;
}
.pc-head-txt {
  font-size: 14px;
  font-weight: 500;
  color: #0d0d0d;
}
.pc-name {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #0d0d0d;
}
.pc-rate {
  margin-top: 18px;
  color: #e54c4c;
  font-family: 'DIN Alternate', -apple-system, sans-serif;
  display: flex;
  align-items: flex-end;
  line-height: 1;
}
.pc-rate .big {
  font-size: 30px;
  font-weight: 700;
}
.pc-rate .pct {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 2px;
}
.pc-rate-label {
  margin-top: 6px;
  font-size: 10px;
  color: #787878;
}
.pc-desc {
  margin-top: 14px;
  font-size: 12px;
  color: #af8753;
  line-height: 16px;
}
.pc-tags {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}
.pc-tag {
  padding: 1px 6px;
  border: 0.5px solid #d9b98a;
  border-radius: 8px;
  font-size: 8px;
  color: #af8753;
  background: rgba(255, 255, 255, 0.5);
}
.pc-btn {
  margin-top: auto;
  align-self: center;
  width: 116px;
  height: 28px;
  border-radius: 14px;
  background: linear-gradient(90deg, #ff6a3d, #e54c4c);
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pcard-side {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}
.pcard-side img {
  width: 100%;
  height: 122px;
  object-fit: cover;
  border-radius: 10px;
}
.dots {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 14px;
}
.dot {
  width: 4px;
  height: 2px;
  border-radius: 1px;
  background: #bfbdbd;
}
.dot.active {
  width: 8px;
  background: #e54c4c;
}

/* 今日话题 */
.topic-title {
  margin-top: 24px;
}
.topic-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.topic-item {
  padding: 12px 0;
  border-bottom: 0.5px solid #f0f0f0;
}
.topic-item:last-child {
  border-bottom: none;
}
.topic-head {
  display: flex;
  align-items: center;
}
.topic-icon {
  margin-right: 6px;
  display: inline-flex;
}
.topic-name {
  flex: 1;
  font-size: 14px;
  color: #0d0d0d;
}
.topic-arrow {
  flex-shrink: 0;
}
.topic-desc {
  margin: 6px 0 0 20px;
  font-size: 12px;
  color: #808080;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vote-bar {
  position: relative;
  height: 36px;
  margin: 12px 0 2px;
  display: flex;
}
.vote-yes,
.vote-no {
  height: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}
.vote-yes {
  width: 53%;
  padding-left: 22%;
  background: linear-gradient(90deg, #ff7a6b, #f5394b);
  border-radius: 6px 0 0 6px;
  clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
}
.vote-no {
  width: 47%;
  justify-content: flex-end;
  padding-right: 16%;
  background: linear-gradient(90deg, #5b8cff, #3b6bff);
  border-radius: 0 6px 6px 0;
  clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%);
  margin-left: -6px;
}
.vote-vs {
  position: absolute;
  top: 50%;
  left: 53%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #ffe3d8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #333;
  z-index: 1;
}
.refresh {
  margin: 20px auto 0;
  width: fit-content;
  font-size: 12px;
  color: #808080;
}

/* 底部AI输入 */
.ai-footer {
  position: relative;
  z-index: 2;
  margin-top: 16px;
  padding: 16px 16px 0;
  text-align: center;
}
.ai-bar {
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0 10px;
  border-radius: 50px;
  background: #fff;
  border: 1.5px solid #ffd4d4;
  box-shadow: 0 6px 15px -8px rgba(229, 76, 76, 0.5);
}
.ai-mic {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(46deg, rgba(255, 28, 0, 0.5) 24%, #ff0c00 100%);
  box-shadow: 0 2px 4px rgba(255, 12, 0, 0.15);
}
.ai-placeholder {
  margin-left: 14px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}
.ai-caption {
  margin-top: 14px;
  font-size: 12px;
  color: rgba(128, 128, 128, 0.6);
}
.home-indicator {
  width: 134px;
  height: 5px;
  margin: 10px auto 0;
  border-radius: 100px;
  background: #000;
}
</style>
