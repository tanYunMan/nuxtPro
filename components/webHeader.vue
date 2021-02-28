<template>
  <header>
    <!-- <nav class="tools main-w">
      <a href="javascript:;" @click="setHomePage">
        <i class="el-icon-bottom-right"></i>设为首页
      </a>
      <a href="javascript:;" @click="addToFav">
        <i class="el-icon-bottom-right"></i>加入收藏
      </a>
      <a href="/register"><i class="el-icon-bottom-right"></i>免费注册</a>
    </nav> -->
    <div class="title main-w clear">
      <span class="logo">
        <img :slt="site.systemName" :src="site.logo | imgCache(300, 0)" />
      </span>
      <h1>
        {{ title ? title : site.systemName }}
      </h1>
    </div>
    <nav class="menus">
      <div class="main-w">
        <a href="/" :class="{ selected: idx === 0 }">首页</a>
        <a href="/register" :class="{ selected: idx === 1 }">用户注册</a>
        <a href="/notice" :class="{ selected: idx === 2 }">公告信息</a>
        <span v-for="(item, index) in linkMenuDataTop" :key="index">
          <el-tooltip class="item" v-if="item.menuTips" effect="dark" :content="item.menuTips" placement="top-start" >
            <a class="download_btn" target="_blank" :href="item.menuLink">{{item.menuName}}</a>
          </el-tooltip>
            <a class="download_btn" v-else target="_blank" :href="item.menuLink">{{item.menuName}}</a>
        </span>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    let idx = -1
    if (this.$route.name === 'index') {
      idx = 0
    } else if (this.$route.name === 'register') {
      idx = 1
    } else if (~this.$route.name.indexOf('notice')) {
      idx = 2
    }
    return {
      idx,
      linkMenuDataTop: []
    }
  },
  created () {
    this.getLinkMenuList()
  },
  computed: {
    ...mapState({
      site: (state) => state.site,
      systemStyle: (state) => state.systemStyle
    })
  },
  methods: { setHomePage() {}, addToFav() {},
  async getLinkMenuList() {
      let that = this
      const res = await this.$axios.get('/site/customMenu/listForDomain')
      if (res.code === 1001) {
        if (res.body) {
          that.linkMenuDataTop = res.body
        }
      }
    }, }
}
</script>

<style lang="scss" scoped>
header {
  .tools {
    padding: 5px 0;
    text-align: right;
    a {
      font-size: 12px;
      margin-left: 20px;
      color: $--gray-text-color;
    }
    i {
      color: $--basic-orange;
      font-weight: 600;
      transform: scale(0.6);
    }
  }
  .title {
    padding: 15px 0;
    .logo {
      float: left;
      height: 90px;
      margin-right: 15px;
      img {
        width: auto;
      }
    }
    h1 {
      line-height: 90px;
      font-size: 20px;
      color: $--deep-color-primary;
      display: none;
    }
  }
  .menus {
    background: white;
    min-width: 1190px;
    line-height: 40px;
    box-shadow: 0 2px 12px 0 $--basic-shadow;
    a {
      margin-right: 30px;
      padding: 5px 10px;
      line-height: 20px;
      border-radius: 16px;
      display: inline-block;
      min-width: 75px;
      text-align: center;
      font-weight: 500;
      text-decoration: none;
      color: #333;
      &:hover,
      &.selected {
        background: $--deep-color-primary;
        color: white;
      }
    }
  }
}
</style>
