<template>
  <ul class="bw">
    <li class="welcome">
      <span>欢迎您，{{ user.userName }}</span>
      <el-button @click="doLogout">[退出]</el-button>
    </li>
    <li>
      <a href="/account">我的账户</a>
    </li>
    <li>
      <a href="/wallet">我的余额</a>
    </li>
    <li>
      <a href="/message/list">站内信</a>
    </li>
    <li>
      <a href="/safe">安全设置</a>
    </li>
    <!-- <li v-if="!supply">
      <a href="/" target="_blank">API下载</a>
    </li> -->
    <!-- <li v-if="!isSupply">
      <a href="/supply">供货系统</a>
    </li>
    <li v-else>
      <a href="/main">零售系统</a>
    </li> -->
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import user from '@/common/user'

export default {
  props: {
    supply: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      isSupply: (state) => false
    })
  },
  methods: {
    doLogout() {
      user.removeToken(this.$cookies)
      location.href = '/'
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  text-align: right;
  font-size: 0;
  &.bw {
    padding: 5px 20px;
  }
  .welcome {
    .el-button {
      padding: 0;
      border: none;
      font-size: 12px;
      margin-left: 15px;
      background: transparent;
    }
  }
  li {
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    padding-left: 15px;
    &::after {
      content: '';
      display: inline-block;
      height: 12px;
      border-right: 1px solid $--gray-text-color;
      padding-left: 15px;
      margin-top: 1px;
      vertical-align: text-top;
    }
    a {
      cursor: pointer;
      text-decoration: none;
    }
    a:not(:hover) {
      color: $--gray-text-color;
    }
    &:last-child::after {
      content: none;
    }
  }
}
</style>
