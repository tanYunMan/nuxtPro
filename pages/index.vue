<template>
  <component :is="page" :page-data="pageData"></component>
</template>

<script>
import getPlatform, { platformMeta } from '@/common/platform'
import site from '@/middleware/site'
import { detectBroswer } from '@/common/utils'

export default {
  middleware: ['detect'],
  layout: ({ req, store, app }) => {
    if (req && req.headers && detectBroswer(req.headers)) {
      return ''
    }
    let platform = store.state.platform
    if (req) {
      const userAgent = req.headers['user-agent']
      platform = getPlatform(userAgent)
      store.commit('updatePlatform', platform)
    }
    if (platform === 'wap') {
      app.$cookies.set('isMobileShow', store.state.isMobileShow)
      store.commit('setIsMobile', true)
      if (!store.state.isMobileShow) {
        store.commit('updatePlatform', 'web')
        platform = 'web'
      }
    }
    return platform
  },
  head({ $store }) {
    return platformMeta($store)
  },
  components: {
    web: () => import('@/components/webIndex'),
    wap: () => import('@/components/wapIndex'),
    openout: () => import('@/components/openOut')
  },
  async asyncData({ store, $axios }) {
    if (store.state.browser) {
      return { page: 'openout', pageData: {} }
    }
    const pageData = {}
    if (store.state.platform === 'web') {
      site({ store, $axios })
      // 联系我们
      pageData.contact = {}
      const a = await $axios.get('/site/onlineService/getFK')
      if (a.code === 1001 && a.body) {
        pageData.contact = a.body
      }
      // 系统公告
      const b = await $axios.post('/site/systemNotice/pageFK', null, {
        params: {
          pageNum: 1,
          pageSize: 16
        }
      })
      pageData.noticeList = []
      if (b.code === 1001 && b.body) {
        pageData.noticeList = b.body.records
      }
      // 支付方式
      const c = await $axios.get('/finance/rechargeMode/getListForClient', {
        params: {
          rechargeType: 1
        }
      })
      pageData.chargeList = []
      if (c.code === 1001 && c.body) {
        pageData.chargeList = c.body.slice(0, 3)
      }
      // 友情链接
      const d = await $axios.get('/site/friendLink/friendLinkList')
      pageData.friends = []
      if (d.code === 1001 && d.body) {
        pageData.friends = d.body
      }
      // 站点广告图
      const e = await $axios.get('/site/advertimg/advertimgList')
      pageData.bannerList = []
      if (e.code === 1001 && e.body) {
        console.log(e.body)
        pageData.bannerList = e.body
      }
      // qq互联
      const f = await $axios.get('/user/qqConfig/getLoginUrl')
      if (f.code === 1001 && f.body) {
        pageData.qq = f.body
      }
      pageData.wx = ''
    } else if (store.state.platform === 'wap') {
      store.commit('updateWapHeader', {
        isLogo: true,
        isBack: false
      })
    }
    return {
      page: store.state.platform,
      pageData
    }
  }
}
</script>
