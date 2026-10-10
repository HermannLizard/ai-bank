const { defineConfig } = require('@vue/cli-service')

// 远端后端地址（不支持 CORS，本地通过 devServer 代理转发）
const API_TARGET = process.env.API_TARGET || 'http://10.43.13.10:9389'

module.exports = defineConfig({
  transpileDependencies: true,
  // // HPM 的 [HPM] 日志经 webpack logger 走 .debug()，默认 info 级别会被过滤，
  // // 调到 verbose 才能看到原生 logLevel:'debug' 的代理日志
  // configureWebpack: {
  //   infrastructureLogging: { level: 'verbose' }
  // },
  // devServer: {
  //   proxy: {
  //     // 前端请求 /api/chat，实际转发到 http://10.43.13.10:9389/serve/msgTest
  //     '/api/chat': {
  //       target: API_TARGET,
  //       changeOrigin: true,
  //       pathRewrite: { '^/api/chat': '/serve/msgTest' },
  //       logLevel: 'debug',
  //       // logLevel 的 [HPM] 日志常被 vue-cli 吞掉，这里手动打印，确保能看到
  //       onProxyReq(proxyReq, req) {
  //         // req.url 此时已被 pathRewrite 改写，原始路径要读 req.originalUrl
  //         console.log('[proxy] →', req.method, req.originalUrl, '=>', API_TARGET + proxyReq.path)
  //       },
  //       onProxyRes(proxyRes, req) {
  //         console.log('[proxy] ←', proxyRes.statusCode, req.originalUrl)
  //       },
  //       onError(err, req) {
  //         console.error('[proxy] ✗', req.url, err.message)
  //       }
  //     }
  //   }
  // },
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
    },
    home: {
      entry: 'src/pages/home/main.js',
      template: 'public/index.html',
      filename: 'home.html',
      title: '智享版'
    }
  }
})
