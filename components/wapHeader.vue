<template>
  <header :class="fixed ? 'fixed' : ''">
    <van-icon
      v-if="header.back"
      class="nav-left"
      name="arrow-left"
      @click="goBack"
    />
    <van-icon
      v-if="popup"
      class="nav-right"
      name="apps-o"
      @click="showMenus(true)"
    />
    <van-icon
      v-if="user"
      class="nav-right"
      name="user-circle-o"
      @click="loginTo('/wap/user')"
    />
    <a class="nav-right" href="/wap/search">
      <van-icon v-if="search" name="search"
    /></a>
    <img
      v-if="header.logo"
      :src="site.logo | imgCache(300, 0)"
      :alt="site.systemName"
    />
    <h1 :class="header.logo ? '' : 'center'">
      {{ site.systemName }}
    </h1>
    <van-popup v-model="menus" closeable position="right">
      <van-list>
        <van-cell title="首页" is-link @click="go('/')" />
        <van-cell title="商品分类" is-link @click="go('/wap/category')" />
        <van-cell title="推荐商品" is-link @click="go('/wap/recommends')" />
        <van-cell title="短信通知" is-link @click="loginTo('/wap/message')" />
        <van-cell title="网站公告" is-link @click="go('/wap/notice')" />
        <van-cell title="联系客服" is-link @click="go('/wap/contact-us')" />
        <van-cell title="个人中心" is-link @click="loginTo('/wap/user')" />
      </van-list>
    </van-popup>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import user from '@/common/user'

export default {
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    popup: {
      type: Boolean,
      default: true
    },
    user: {
      type: Boolean,
      default: true
    },
    search: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { menus: false }
  },
  computed: {
    ...mapState({
      backUrl: (state) => state.backUrl,
      site: (state) => state.site,
      header: (state) => state.wapHeader
    })
  },
  methods: {
    showMenus(show) {
      this.menus = show
    },
    loginTo(path) {
      if (user.isLogin(this.$cookies)) {
        location.href = path
      } else {
        location.href = '/wap/login'
      }
    },
    goBack() {
      if (this.backUrl) {
        location.href = this.backUrl
      } else {
        history.back()
      }
    },
    go(path) {
      this.showMenus(false)
      location.href = path
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 44px;
  line-height: 44px;
  background-color: $--color-primary;
  &.fixed {
    position: fixed;
    width: 100%;
    z-index: 13;
  }
  img {
    float: left;
    height: 30px;
    margin: 6px;
    width: auto;
  }
  h1 {
    font-size: 16px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.center {
      margin: 0 110px;
      text-align: center;
    }
  }
  & > .van-icon,
  & > a > .van-icon {
    font-size: 24px;
    line-height: 44px;
    width: 36px;
    text-align: center;
    color: white;
  }
  .nav-left {
    float: left;
  }
  .nav-right {
    float: right;
  }
}

header + ::v-deep section,
header + ::v-deep div > section:first-child {
  padding-top: 44px;
}
.van-popup {
  height: 100%;
  width: 150px;
  .van-list {
    padding-top: 50px;
    font-weight: 500;
    .van-icon {
      float: right;
      margin-top: 6px;
    }
  }
}
</style>
