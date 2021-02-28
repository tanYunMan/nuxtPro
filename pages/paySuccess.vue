<template>
  <div class="web" v-if="platform === 'web'">
    <h3>
      <span>当前位置：支付成功</span>
    </h3>
    <section>
      <img class="ok" src="~@/assets/ok.png" />
      <h4>充值成功</h4>
      <h4>
        充值金额：<em>{{ money }}</em
        >元
      </h4>
      <a href="/main">返回首页</a>
    </section>
  </div>
  <div class="wap" v-else-if="platform === 'wap'">
    <section>
      <img class="ok" src="~@/assets/ok.png" />
      <h4>充值成功</h4>
      <h4>
        充值金额：<em>{{ money }}</em
        >元
      </h4>
      <a href="/wap/user">返回</a>
    </section>
  </div>
</template>

<script>
import getPlatform from '@/common/platform'

export default {
  layout: ({ req, store }) => {
    let platform = store.state.platform
    if (req) {
      const userAgent = req.headers['user-agent']
      platform = getPlatform(userAgent)
      store.commit('updatePlatform', platform)
    }
    return platform === 'wap' ? 'wap' : 'webIn'
  },
  asyncData({ store, app, route }) {
    const { money } = route.query
    app.$cookies.set('pay-redirect', money)
    app.$cookies.set('pay-success', money)
    return { platform: store.state.platform, money }
  }
}
</script>

<style lang="scss" scoped>
.web {
  section {
    padding: 10px 15px 100px 15px;
    background: white;
    text-align: center;
    .ok {
      width: 100px;
      margin: 30px;
    }
    h4 {
      font-size: 18px;
      line-height: 40px;
      em {
        font-size: 25px;
        color: $--basic-red;
      }
    }
    a {
      font-size: 14px;
      color: $--color-primary;
    }
  }
}
.wap {
  text-align: center;
  .ok {
    width: 100px;
    margin: 30px;
  }
  h4 {
    font-size: 18px;
    line-height: 40px;
    em {
      font-size: 25px;
      font-style: normal;
      color: $--basic-red;
    }
  }
  a {
    font-size: 14px;
    color: $--color-primary;
  }
}
</style>
