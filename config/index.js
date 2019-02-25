'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    proxyTable: {                            //代理规则
      '/yxdDataCenter/**': {
        target: 'http://172.16.9.60:7002',        // 数据中心接口域名
        // target: 'http://172.16.2.41:7002',        // 数据中心接口域名
        secure: false,
        changeOrigin: false
      },
      '/unifiedlogin/**': {
        target: 'http://172.16.9.60:7000',        // 接口的域名 - 【综合登录】
        // target: 'http://172.16.2.209:7008',        // 接口的域名 - 张鹏
        secure: false,
        changeOrigin: false,
      },
      '/management/**': {
        target: 'http://172.16.9.60:7001',        // 接口的域名 - 【综合管理】
        // target: 'http://172.16.2.128:8081',        // 接口的域名 - 贾海港
        secure: false,
        changeOrigin: false,
      },
      '/auditchanges/**': {
        target: 'http://172.16.9.60:7003',        // 接口的域名 - 【资审系统】
        secure: false,
        changeOrigin: false,
      },
      '/trade/**': {
        target: 'http://172.16.9.60:7006',        // 接口的域名 - 【交易】
        secure: false,
        changeOrigin: false
      },
      '/contract/**': {
        target: 'http://172.16.9.60:7005',        // 接口的域名 - 【合同】
        secure: false,
        changeOrigin: false
      },
      '/select/**': {
        target: 'http://172.16.9.60:7004',        // 接口的域名 - 【遴选】
        secure: false,
        changeOrigin: false
      },
      '/supervision/**': {
        target: 'http://172.16.9.60:7007',        // 接口的域名 - 【监管】
        secure: false,
        changeOrigin: false
      },
      // '/rabbitmq/**': {
      //   target: 'http://172.16.9.60:7008',        // 接口的域名 - 【消息】
      //   secure: false,
      //   changeOrigin: false
      // }
    },

    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
