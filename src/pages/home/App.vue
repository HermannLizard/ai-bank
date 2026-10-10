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
          <div class="board-title"></div>
          <div class="asset-chip">
            <span class="chip-dot"></span>
            <span>资产情况</span>
            <van-icon name="arrow" size="12" color="#333" />
          </div>
        </div>

        <div class="board-stats">
          <div class="stat">
            <div class="stat-label">总资产</div>
            <div class="stat-value">
              <span class="num">{{ asset.total }}</span>
              <span class="unit">元</span>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <div class="stat-label">最新收益({{ asset.profitDate }})</div>
            <div class="stat-value">
              <span class="num profit">{{ asset.profit }}</span>
              <span class="unit">元</span>
            </div>
          </div>
          <div class="sparkline"></div>
        </div>

        <div class="risk-banner">
          <div class="risk-text">
            <span class="risk-icon"></span>
            <span>您的风险评测还有<b>{{ asset.riskDays }}天</b>过期</span>
          </div>
          <div class="risk-btn">去评测</div>
        </div>
      </div>

      <!-- 功能图标 -->
      <div class="card func-card">
        <div class="func-list">
          <div v-for="f in funcs" :key="f.name" class="func-item">
            <div class="func-icon" :class="f.cls">
              <img :src="f.icon" :alt="f.name" />
            </div>
            <span class="func-name">{{ f.name }}</span>
          </div>
        </div>
        <div class="func-indicator">
          <span class="func-indicator-thumb"></span>
        </div>
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
            <p class="pc-head">{{ hotProduct.head }}</p>
            <div class="pc-name-row">
              <span class="pc-name-icon"></span>
              <span class="pc-name">{{ hotProduct.name }}</span>
            </div>
            <p class="pc-desc">{{ hotProduct.desc }}</p>
            <p class="pc-rate">
              <span class="big">{{ hotProduct.rate }}</span><span class="pct">%</span>
            </p>
            <p class="pc-rate-label">{{ hotProduct.rateLabel }}</p>
            <div class="pc-tags">
              <span v-for="tag in hotProduct.tags" :key="tag" class="pc-tag">{{ tag }}</span>
            </div>
            <div class="pc-btn">查看详情</div>
            <div class="dots">
              <span class="dot active"></span><span class="dot"></span><span class="dot"></span>
            </div>
          </div>
          <!-- 右侧两张小卡 -->
          <div class="pcard-side">
            <div v-for="p in sideProducts" :key="p.title" class="pcard-small" :class="p.cls">
              <div class="ps-head">
                <span class="ps-icon"></span>
                <span class="ps-title">{{ p.title }}</span>
              </div>
              <p class="ps-name">{{ p.name }}</p>
              <p class="ps-rate">
                <span class="big">{{ p.rate }}</span><span class="pct">%</span>
              </p>
              <p class="ps-rate-label">{{ p.rateLabel }}</p>
            </div>
          </div>
        </div>

        <!-- 今日话题 -->
        <h3 class="sec-title topic-title">今日话题</h3>
        <div class="topic-list">
          <div v-for="(tp, i) in topics" :key="i" class="topic-item">
            <div class="topic-main">
              <span class="topic-icon"></span>
              <div class="topic-body">
                <div class="topic-head">
                  <span class="topic-name">{{ tp.title }}</span>
                  <span class="topic-arrow"></span>
                </div>
                <p v-if="tp.desc" class="topic-desc">{{ tp.desc }}</p>
              </div>
            </div>
            <div v-if="tp.vote" class="vote-bar">
              <div class="vote-yes">会</div>
              <div class="vote-no">不会</div>
              <div class="vote-vs"></div>
            </div>
          </div>
        </div>
        <div class="refresh">换一批</div>
      </div>
    </div>

    <!-- 底部AI输入 -->
    <div class="ai-footer">
      <div class="ai-bar">
        <span class="ai-mic"></span>
        <span class="ai-placeholder">可以帮您点什么～</span>
      </div>
      <p class="ai-caption">京智AI大模型提供服务，7*24小时安全守护</p>
    </div>
  </div>
</template>

<script>
import concentric from './assets/concentric.png'
import mascot from './assets/mascot.png'
import funcTransfer from './assets/func_transfer.svg'
import funcMetal from './assets/func_metal.svg'
import funcDeposit from './assets/func_deposit.svg'
import funcLoan from './assets/func_loan.svg'
import funcBalance from './assets/func_balance.svg'
import banner from './assets/banner.png'
import sparkline from './assets/sparkline.png'

export default {
  name: 'App',
  data() {
    return {
      img: {
        concentric,
        mascot,
        banner,
        sparkline
      },
      asset: {
        total: '109423.56',
        profit: '+823.56',
        profitDate: '09-01',
        riskDays: 3
      },
      funcs: [
        { name: '账号转账', icon: funcTransfer },
        { name: '贵金属', icon: funcMetal },
        { name: '存款', icon: funcDeposit, cls: 'func-icon-deposit' },
        { name: '贷款', icon: funcLoan, cls: 'func-icon-loan' },
        { name: '资产负债', icon: funcBalance }
      ],
      hotProduct: {
        head: '大家都在看',
        name: '闲钱理财 灵活投资',
        desc: '全球配置高评级美元日...',
        rate: '4.73',
        rateLabel: '近1月年化',
        tags: ['1元起购', '低风险']
      },
      sideProducts: [
        {
          title: '理财夜市',
          cls: 'pcard-night',
          name: '灵活成长日开...',
          rate: '5.91',
          rateLabel: '成立以来年化'
        },
        {
          title: '优质指数',
          cls: 'pcard-index',
          name: '中加丰润纯债..',
          rate: '2.8',
          rateLabel: '近1年收益率'
        }
      ],
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
  /* 吸底 AI 输入区高度 114px + 16px 间距 */
  padding-bottom: calc(130px + env(safe-area-inset-bottom, 0px));
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
  padding: 12px 14px 12px 16px;
  /* 顶部椭圆渐变装饰 */
  /* background: #fff url(./assets/board_bg.png) no-repeat top center; */
  background-size: 100% 100%;
  overflow: hidden;
}
.board-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* "京行看板" 艺术字标题 */
.board-title {
  width: 71px;
  height: 17px;
  background: url(./assets/board_title.png) no-repeat;
  background-size: contain;
}
.asset-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  background: linear-gradient(162deg, #ffecec 3.18%, #ffffff 53.93%);
  font-size: 12px;
  line-height: 20px;
  color: #333;
  filter: drop-shadow(0 2px 2px rgba(253, 212, 212, 0.42));
}
.asset-chip .van-icon {
  margin-left: -2px;
}
.chip-dot {
  width: 12px;
  height: 12px;
  background: url(./assets/icon_coin.png) no-repeat;
  background-size: contain;
}
.sparkline {
  position: absolute;
  top: 6px;
  right: 0;
  width: 70px;
  height: 44px;
  background: url(./assets/fake_chart.png) no-repeat;
  background-size: contain;
}
.board-stats {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-top: 18px;
  padding-right: 2px;
}
.stat:first-child {
  width: 123px;
  flex-shrink: 0;
}
.stat-divider {
  width: 0.5px;
  height: 20px;
  margin: 30px 12px 0 0;
  background: #e5e5e5;
  flex-shrink: 0;
}
.stat-label {
  font-size: 12px;
  line-height: 20px;
  color: #808080;
  margin-bottom: 8px;
  white-space: nowrap;
}
.stat-value {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  white-space: nowrap;
}
.stat-value .num {
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  color: #0d0d0d;
  font-family: 'D-DIN-PRO', 'DIN Alternate', -apple-system, sans-serif;
}
.stat-value .num.profit {
  color: #fb0031;
}
.stat-value .unit {
  font-size: 12px;
  line-height: 20px;
  color: #333;
}
.risk-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin: 19px -10px 0 -12px;
  padding: 0 12px;
  border-radius: 8px;
  background: linear-gradient(90deg, #fff6f2, #ffeee8);
}
.risk-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  line-height: 22px;
  color: #808080;
  white-space: nowrap;
}
.risk-text b {
  color: #333;
  font-weight: 400;
}
.risk-icon {
  width: 12px;
  height: 12px;
  background: url(./assets/icon_risk.png) no-repeat;
  background-size: contain;
  flex-shrink: 0;
}
.risk-btn {
  padding: 0 8px;
  border-radius: 17px;
  background: #ffe5dd;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: #e54c4c;
}

/* 功能图标 */
.func-card {
  padding: 16px 1px 8px;
}
.func-list {
  display: flex;
}
.func-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.func-icon {
  position: relative;
  width: 32px;
  height: 32px;
}
/* 图标按 svg 原始尺寸摆放，不拉伸 */
.func-icon img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.func-icon-deposit img {
  top: 0;
  transform: translateX(-50%);
}
.func-icon-loan img {
  top: 3.5px;
  left: 5px;
  transform: none;
}
.func-name {
  margin-top: 12px;
  font-size: 12px;
  line-height: 12px;
  color: #0d0d0d;
  white-space: nowrap;
}
.func-indicator {
  position: relative;
  width: 30px;
  height: 2px;
  margin: 16px auto 0;
  border-radius: 2px;
  background: #fceaea;
}
.func-indicator-thumb {
  position: absolute;
  top: 0;
  left: 10px;
  width: 10px;
  height: 2px;
  border-radius: 2px;
  background: #e54c4c;
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
  line-height: 24px;
  color: #0d0d0d;
}

/* 产品区 */
.product-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.pcard-big {
  width: 170px;
  height: 252px;
  flex-shrink: 0;
  padding-top: 16px;
  border-radius: 10px;
  overflow: hidden;
  background: url(./assets/card-flex.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pc-head {
  align-self: flex-start;
  margin: 0 0 0 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: #000;
}
.pc-name-row {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 13px 0 0 14px;
}
.pc-name-icon {
  width: 20px;
  height: 20px;
  background: url(./assets/icon_hot_product.svg) no-repeat;
  background-size: contain;
  flex-shrink: 0;
}
.pc-name {
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: #000;
  white-space: nowrap;
}
.pc-desc {
  width: 144px;
  margin: 9px 0 0;
  font-size: 12px;
  line-height: 12px;
  color: #af8753;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pc-rate,
.ps-rate {
  color: #e54c4c;
  font-family: 'DIN Alternate', -apple-system, sans-serif;
  font-weight: 700;
  white-space: nowrap;
}
.pc-rate {
  margin: 20px 0 0;
  line-height: 30px;
}
.pc-rate .big {
  font-size: 30px;
}
.pc-rate .pct {
  font-size: 20px;
}
.pc-rate-label {
  margin: 4px 0 0;
  font-size: 10px;
  line-height: 10px;
  color: #787878;
}
.pc-tags {
  display: flex;
  gap: 6px;
  margin-top: 15px;
}
.pc-tag {
  height: 12px;
  padding: 0 3px;
  border: 0.5px solid #d9b98a;
  border-radius: 2px;
  font-size: 8px;
  line-height: 11px;
  color: #af8753;
  white-space: nowrap;
}
.pc-btn {
  width: 116px;
  height: 28px;
  margin-top: 19px;
  background: url(./assets/btn_detail_bg.svg) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dots {
  display: flex;
  justify-content: center;
  gap: 3px;
  margin-top: 12px;
}
.dot {
  width: 4px;
  height: 2px;
  border-radius: 1px;
  background: #bfbdbd;
}
.dot.active {
  background: #e54c4c;
}

/* 右侧小卡 */
.pcard-side {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.pcard-small {
  height: 122px;
  padding: 16px 12px 0 14px;
  border-radius: 10px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.pcard-night {
  background-image: url(./assets/card_night_bg.svg);
}
.pcard-index {
  background-image: url(./assets/card_index_bg.svg);
}
.ps-head {
  display: flex;
  align-items: center;
  gap: 6px;
}
.ps-icon {
  width: 14px;
  height: 14px;
  background-repeat: no-repeat;
  background-size: contain;
  flex-shrink: 0;
}
.pcard-night .ps-icon {
  background-image: url(./assets/icon_night.svg);
}
.pcard-index .ps-icon {
  background-image: url(./assets/icon_index.svg);
}
.ps-title,
.ps-name {
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: #000;
  white-space: nowrap;
}
.ps-name {
  margin: 16px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ps-rate {
  margin: 10px 0 0;
  line-height: 20px;
}
.ps-rate .big {
  font-size: 20px;
}
.ps-rate .pct {
  font-size: 14px;
}
.ps-rate-label {
  margin: 6px 0 0;
  font-size: 10px;
  line-height: 10px;
  color: #787878;
}

/* 今日话题 */
.topic-title {
  margin-top: 24px;
}
/* 列表撑满卡片宽度，条目自带 16px 内边距 */
.topic-list {
  margin: 0 -16px;
}
.topic-item {
  position: relative;
  padding: 12px 16px;
  border-radius: 8px;
  background: #fff;
}
.topic-item::after {
  content: '';
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 0;
  height: 0.5px;
  background: #f0f0f0;
}
.topic-main {
  display: flex;
  align-items: flex-start;
  gap: 4px;
}
.topic-icon {
  width: 14px;
  height: 14px;
  margin: 4px 3px 0 0;
  background: url(./assets/icon_topic.svg) no-repeat;
  background-size: contain;
  flex-shrink: 0;
}
.topic-body {
  flex: 1;
  min-width: 0;
}
.topic-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.topic-name {
  font-size: 14px;
  line-height: 22px;
  color: #0d0d0d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.topic-arrow {
  width: 12.5px;
  height: 4.5px;
  margin-left: 8px;
  background: url(./assets/icon_topic_arrow.svg) no-repeat;
  background-size: contain;
  flex-shrink: 0;
}
.topic-desc {
  margin: 0;
  font-size: 12px;
  line-height: 20px;
  color: #808080;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 投票条 */
.vote-bar {
  position: relative;
  height: 36px;
  margin-top: 12px;
}
.vote-yes,
.vote-no {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: #fff;
}
.vote-yes {
  left: 6.75%;
  right: 45.02%;
  background-image: url(./assets/vote_yes_bg.svg);
}
.vote-no {
  left: 53.05%;
  right: 0;
  background-image: url(./assets/vote_no_bg.svg);
}
.vote-vs {
  position: absolute;
  top: 1px;
  /* 与蓝色条左端对齐，宽度变化时 VS 跟随交界处 */
  left: calc(53.05% - 16px);
  width: 34px;
  height: 34px;
  background: url(./assets/vote_vs_bg.png) no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 20px;
  color: #333;
}

.refresh {
  margin: 12px auto 0;
  width: fit-content;
  font-size: 12px;
  line-height: 20px;
  color: #808080;
}

/* 底部AI输入（吸底） */
.ai-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  padding: 16px 16px calc(12px + env(safe-area-inset-bottom, 0px));
  background: url(./assets/footer_bg.png) no-repeat top center;
  background-size: 100% 100%;
  text-align: center;
}
.ai-bar {
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0 8.5px;
  border: 1.5px solid transparent;
  border-radius: 50px;
  /* 白底 + 蓝→红渐变描边 */
  background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(90deg, #337cff 0%, #ff6b8a 50%, #ff3b4e 100%) border-box;
  box-shadow: 0 6px 15px -8px rgba(229, 76, 76, 0.5), inset 0 2px 4px rgba(201, 20, 67, 0.1);
}
.ai-mic {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: url(./assets/mic.png) no-repeat;
  background-size: contain;
  flex-shrink: 0;
}
.ai-mic-icon {
  width: 14px;
  height: 19px;
  background: url(./assets/icon_voice.svg) no-repeat;
  background-size: contain;
}
/* 右侧留出与麦克风等宽的空间，让文字在输入条内居中 */
.ai-placeholder {
  flex: 1;
  margin-right: 34px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #333;
}
.ai-caption {
  margin: 12px 0 0;
  font-size: 12px;
  line-height: 20px;
  color: rgba(128, 128, 128, 0.6);
}
</style>
