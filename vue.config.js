const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/pages/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '首页'
    },
    mine: {
      entry: 'src/pages/mine/main.js',
      template: 'public/index.html',
      filename: 'mine.html',
      title: '我的'
    },
    chat: {
      entry: 'src/pages/chat/main.js',
      template: 'public/index.html',
      filename: 'chat.html',
      title: '北京银行AI次方'
    }
  }
})
