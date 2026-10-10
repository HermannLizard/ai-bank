<template>
  <div class="page">
    <div class="header">
      <!-- 导航栏，顶部预留安全区 -->
      <div class="navbar">
        <span class="nav-login">登录</span>
        <div class="nav-search">
          <i class="nav-search-icon"></i>
          <span class="nav-search-placeholder">{{ searchPlaceholder }}</span>
        </div>
        <div class="nav-action nav-action-msg">
          <i class="nav-icon nav-icon-msg"></i>
          <span v-if="msgCount" class="nav-badge">{{ msgCount > 99 ? '99+' : msgCount }}</span>
        </div>
        <div class="nav-action">
          <i class="nav-icon nav-icon-service"></i>
        </div>
        <div class="nav-action">
          <i class="nav-icon nav-icon-more"></i>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- 银行卡信息 -->
      <div class="cards">
        <div class="card-info-back"></div>
        <div class="card-info-bg"></div>
        <div class="card-info-content">
          <p class="card-info-hello">Hi，{{ greeting }}</p>
          <p class="card-info-tip">登录后查询余额</p>
          <div class="card-info-btn">查询余额</div>
        </div>
      </div>
      <!-- 主功能区：田字格 -->
      <div class="main_funcs">
        <div v-for="item in mainFuncs" :key="item.name" class="main-func-item" :style="{backgroundImage: `url(${item.icon})`}">
          <span class="main-func-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 功能菜单：2 行 5 列 -->
    <div class="menu">
      <div v-for="item in menus" :key="item.name" class="menu-item">
        <div class="menu-icon-wrap">
          <img class="menu-icon" :src="item.icon" alt="" />
          <span v-if="item.badge" class="menu-badge"><div>{{ item.badge }}</div></span>
        </div>
        <span class="menu-name">{{ item.name }}</span>
      </div>
    </div>
    <!-- 消息通知 -->
    <div class="messages">
      <i class="msg-icon"></i>
      <span class="msg-label">消息</span>
      <span class="msg-text">{{ message }}</span>
      <i class="msg-arrow"></i>
    </div>
    <!-- 广告轮播：5s 自动切换 -->
    <div class="ads">
      <van-swipe class="ads-swipe" :autoplay="5000" indicator-color="#fff">
        <van-swipe-item v-for="(src, i) in ads" :key="i">
          <img class="ads-img" :src="src" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="product_card">
      <!-- 京选财富 -->
      <div class="card wealth-card">
        <!-- 小京为您优选 -->
        <h3 class="sec-title">京选财富</h3>
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
      </div>
    </div>
    <!-- 底部导航栏 -->
    <div class="tabbar">
      <div
        v-for="(t, i) in tabbar"
        :key="t.name"
        class="tabbar-item"
        :class="{ active: i === activeTabbar }"
      >
        <img class="tabbar-icon" :src="t.icon" alt="" />
        <span class="tabbar-name">{{ t.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import banner from './assets/banner.png'

export default {
  name: 'App',
  data() {
    return {
      searchPlaceholder: '手机银行10.0焕新升级',
      msgCount: 100,
      message: '您的风险评级将在7天后过期，去测评',
      ads: [
        require('./assets/ads/1.png'),
        require('./assets/ads/2.jpg'),
        require('./assets/ads/3.png'),
        require('./assets/ads/4.jpg'),
        require('./assets/ads/5.png')
      ],
      mainFuncs: [
        { name: '转账', icon: require('./assets/menu-icons/main-1.png') },
        { name: '账户总览', icon: require('./assets/menu-icons/main-2.png') },
        { name: '乘车码', icon: require('./assets/menu-icons/main-3.png') },
        { name: '收支明细', icon: require('./assets/menu-icons/main-4.png') }
      ],
      menus: [
        { name: '基金', icon: require('./assets/menu-icons/1.png') },
        { name: '理财', icon: require('./assets/menu-icons/2.png') },
        { name: '养老金融', icon: require('./assets/menu-icons/3.png'), badge: '养老金' },
        { name: 'x+会员', icon: require('./assets/menu-icons/4.png') },
        { name: '贷款', icon: require('./assets/menu-icons/5.png') },
        { name: '信用卡', icon: require('./assets/menu-icons/6.png') },
        { name: '工资服务', icon: require('./assets/menu-icons/7.png') },
        { name: '医保码', icon: require('./assets/menu-icons/8.png') },
        { name: '政务惠民', icon: require('./assets/menu-icons/9.png') },
        { name: '全部', icon: require('./assets/menu-icons/10.png') }
      ],
      img: {
        banner
      },
      tabbar: [
        { name: '首页', icon: require('./assets/tabbar-icons/1.png') },
        { name: '财富', icon: require('./assets/tabbar-icons/2.png') },
        { name: '社区', icon: require('./assets/tabbar-icons/3.png') },
        { name: '生活', icon: require('./assets/tabbar-icons/4.png') },
        { name: '我的', icon: require('./assets/tabbar-icons/5.png') }
      ],
      activeTabbar: 0,
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
  },
  computed: {
    greeting() {
      const h = new Date().getHours()
      if (h < 6) return '晚上好'
      if (h < 12) return '上午好'
      if (h < 13) return '中午好'
      if (h < 18) return '下午好'
      return '晚上好'
    }
  },
  methods: {}
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #fff;
}
</style>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: -apple-system, 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #0d0d0d;
  /* 给吸底导航栏留位置 */
  padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));
}

/* 头部 banner */
.header {
  position: relative;
  /* padding-top: env(safe-area-inset-top, 20px); */
  padding-top: 44px;
  /* height: calc(env(safe-area-inset-top, 20px) + 44px + 135px); */
  height: 220px;
  background: url(./assets/banner.jpg) no-repeat;
  background-size: 100% auto;
}
.header-banner {
  display: block;
  width: 100%;
}
/* 以下两层按 375 宽设计稿定位 */
.header-shade {
  position: absolute;
  top: -4.5px;
  left: -4px;
  width: 229.7px;
  pointer-events: none;
}
.header-title {
  position: absolute;
  top: 60px;
  left: 23px;
  width: 183px;
}

/* 导航栏：透明背景，盖在 banner 上，顶部留出安全区 */
.navbar {
  z-index: 2;
  height: 44px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.nav-login {
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.9);
}
.nav-search {
  flex: 1;
  min-width: 0;
  height: 28px;
  /* svg 自带 1px 描边留白，内边距和间距各减 1px */
  padding: 0 10px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  gap: 11px;
}
.nav-search-icon {
  width: 15px;
  height: 15px;
  background: url(./assets/nav_icon_search.svg) no-repeat;
  background-size: contain;
  flex-shrink: 0;
}
.nav-search-placeholder {
  font-size: 13px;
  line-height: 13px;
  color: #000;
  opacity: 0.41;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav-action {
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-icon {
  background-repeat: no-repeat;
  background-size: contain;
}
.nav-icon-msg {
  width: 18px;
  height: 18px;
  background-image: url(./assets/nav_icon_msg.svg);
}
.nav-icon-service {
  width: 20px;
  height: 19px;
  background-image: url(./assets/nav_icon_service.svg);
}
.nav-icon-more {
  width: 20px;
  height: 20px;
  background-image: url(./assets/nav_icon_more.svg);
}
/* 消息角标 */
.nav-badge {
  position: absolute;
  top: -2px;
  left: 10px;
  min-width: 24px;
  height: 11px;
  padding: 0 3px;
  border-radius: 6px;
  background: #e54c4c;
  font-size: 10px;
  font-weight: 500;
  line-height: 11px;
  color: #fff;
  text-align: center;
  white-space: nowrap;
}

/* 主区域：盖住 banner 底部 10px */
.main {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 14px;
  margin-top: -10px;
  padding: 0 16px;
}

/* 银行卡信息 */
.cards {
  position: relative;
  width: 135px;
  height: 170px;
  flex-shrink: 0;
  background: url(./assets/card_info_bg.png) no-repeat;
  background-size: 100% 100%;
}
/* 后面一层叠卡，向右下错开 10px */
.card-info-back {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 129px;
  height: 150px;
  background: linear-gradient(187.05deg,#e1e8f1 0.93%,#e0e4ea 41.84%,#dce2ea 92.7%);
  border-radius: 6px;
  z-index: -1;
}

.card-info-content {
  position: relative;
  padding-top: 46px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-info-hello {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  color: #0d0d0d;
}
.card-info-tip {
  margin: 8px 0 0;
  font-size: 11px;
  line-height: 11px;
  color: #808080;
}
.card-info-btn {
  width: 72px;
  height: 28px;
  margin-top: 16px;
  background: url(./assets/card_info_btn.svg) no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 12px;
  color: #e54c4c;
}

/* 主功能区：占满卡片右侧剩余宽度，2x2 田字格 */
.main_funcs {
  flex: 1;
  min-width: 0;
  height: 170px;
  padding: 2px 16px 0;
  background: url(./assets/main-bg.png) no-repeat;
  background-size: 100% 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
.main-func-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-size: 100%;
  padding-bottom: 8px;
}
.main-func-name {
  color: white;
  font-size: 13px;
  line-height: 13px;
  word-wrap: break-word
}

/* 功能菜单：5 等分列，375 宽下首列中心 38px，与设计稿一致 */
.menu {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 24px;
  padding: 28px 0 12px;
}
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu-icon-wrap {
  position: relative;
  width: 28px;
  height: 28px;
}
.menu-icon {
  display: block;
  width: 28px;
  height: 28px;
}
/* 角标：从图标中心偏右处起，悬在图标上方 */
.menu-badge {
  position: absolute;
  bottom: 32px;
  left: 18px;
  padding: 0 5px;
  border-radius: 7px 7px 7px 0;
  background: #e54c4c;
  font-size: 10px;
  line-height: 14px;
  color: #fff;
  white-space: nowrap;
  width: 40px;
  height: 14px;
  background: #e54c4c;
  box-shadow: 0px 2px 6px rgba(178, 178, 178, 0.5);
}
.menu-badge div {
  font-size: 20px;
  scale: 0.5;
  transform-origin: center left;
}
.menu-name {
  margin-top: 10px;
  font-size: 12px;
  line-height: 12px;
  color: #0d0d0d;
  white-space: nowrap;
}

/* 消息通知：343x44，左右各留 16px */
.messages {
  height: 44px;
  margin: 4px 16px 0;
  display: flex;
  align-items: center;
  height: 44px;
  background: #f7f8fb;
  border-radius: 6px;
  padding: 0 12px 0 14px;
}
/* 18x18 图标位，svg 按自身尺寸居中 */
.msg-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  background: url(./assets/message-icon.png) no-repeat center;
  background-size: contain;
}
.msg-label {
  flex-shrink: 0;
  margin-left: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  color: #333;
}
.msg-text {
  flex: 1;
  min-width: 0;
  margin-left: 8px;
  font-size: 12px;
  line-height: 12px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.msg-arrow {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  margin-left: 16px;
  background: url(./assets/message-more.png) no-repeat center;
  background-size: contain;
}
.ads {
  height: 85px;
  margin: 16px;
  border-radius: 8px;
  overflow: hidden;
}
.ads-swipe {
  height: 100%;
}
.ads-img {
  display: block;
  width: 100%;
  height: 85px;
  object-fit: cover;
}

/* 京选财富卡片（复制自 home） */
.product_card {
  margin: 0 16px 16px;
}
.card {
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 6px 20px rgba(210, 160, 150, 0.12);
}
/* 京选财富 */
.wealth-card {
  padding: 16px;
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
  margin: 0;
  font-size: 18px;
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

/* 底部导航栏：吸底，375 宽下每列 75px，图标 50x50 顶对齐，文字紧贴图标下方 */
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  height: calc(48px + env(safe-area-inset-bottom, 0px));
  padding-bottom: env(safe-area-inset-bottom, 0px);
  display: flex;
  background: #fff;
}
.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -18px;
}
.tabbar-icon {
  display: block;
  width: 50px;
  height: 50px;
}
.tabbar-name {
  font-size: 11px;
  font-weight: 500;
  line-height: 11px;
  color: #0d0d0d;
  white-space: nowrap;
}
.tabbar-item.active .tabbar-name {
  color: #f21e1e;
}
</style>
