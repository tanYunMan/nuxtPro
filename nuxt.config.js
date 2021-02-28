const __DEV__ = process.env.NODE_ENV === 'development'

const proxy = {}
const axios = {
  baseURL: 'http://127.0.0.1:9010',
  browserBaseURL: '/api/'
}

// 调试环境，统一请求localhost
if (__DEV__) {
  axios.proxy = true
  axios.baseURL = 'http://localhost:8998/api'
  proxy['/api'] = {
    target: 'http://test.333ks.cn/',
    headers: {
      host: 'test.333ks.cn'
    }
  }
}

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'renderer', content: 'webkit' },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          '平台,低价平台,平台,搭建平台,平台代理,平台平台,平台代理,平台排行榜,平台排行榜第一,平台系统,搭建平台,做平台'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: '/jquery-1.9.0.min.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    // '@/static/iconfont.css'
  ],
  router: {
    // 服务中间件，最优先执行
    middleware: ['siteBydomain']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/axios', '@/plugins/index'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'cookie-universal-nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios,
  proxy,
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/, /^vant/],
    splitChunks: {
      layouts: true
    },
    extractCSS: !__DEV__,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  styleResources: {
    scss: ['./assets/variables.scss']
  },
  server: {
    port: 8998
  }
}
