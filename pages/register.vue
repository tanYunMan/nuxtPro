<template>
  <component :is="page"></component>
</template>

<script>
import getPlatform, { platformMeta } from '@/common/platform'

export default {
  layout: ({ req, store, app }) => {
    let platform = store.state.platform
    if (req) {
      const userAgent = req.headers['user-agent']
      platform = getPlatform(userAgent)
      store.commit('updatePlatform', platform)
    }
    if (platform === 'wap') {
      store.commit('setIsMobile', true)
      app.$cookies.set('isMobileShow', store.state.isMobileShow)
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
    web: () => import('@/components/webReg'),
    wap: () => import('@/components/wapReg')
  },
  asyncData({ store }) {
    return { page: store.state.platform }
  }
}
</script>
