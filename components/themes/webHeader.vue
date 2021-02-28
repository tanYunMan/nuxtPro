<template>
  <header>
    <div class="title main-w clear">
      <span class="logo">
        <img :slt="site.systemName" :src="site.logo | imgCache(300, 0)" />
      </span>
      <nav class="menus">
        <div class="main-w">
          <span class="span">
            <a href="/" :class="{ selected: idx === 0 }">首页</a>
          </span>
          <span class="span">
            <a href="javascript:void(0)" @click="loginBoxShow" v-if="$route.name === 'themes1'" ref="showBox">商品界面</a>
            <a v-else href="/register" :class="{ selected: idx === 1 }" :index="$route.name">用户注册</a>
          </span>
          <span class="span" v-if="$route.name != 'themes1'">
            <a href="/notice" :class="{ selected: idx === 2 }">公告信息</a>
          </span>
          <span v-for="(item, index) in linkMenuDataTop" :key="index" v-if="index < 3">
            <el-tooltip
              class="item"
              v-if="item.menuTips"
              effect="dark"
              :content="item.menuTips"
              placement="top-start"
            >
              <span class="span">
                <a class="download_btn" target="_blank" :href="item.menuLink">{{
                  item.menuName
                }}</a>
              </span>
            </el-tooltip>
            <span class="span" v-else>
              <a class="download_btn" target="_blank" :href="item.menuLink">{{
                item.menuName
              }}</a>
            </span>
          </span>

          <a href="javascript:void(0)" v-if="linkMenuDataTop.length>3" @click="showMoreBaiduLink">更多</a>

        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    let idx = -1
    if (this.$route.name === 'themes') {
      // idx = 0
    } else if (this.$route.name === 'register') {
      idx = 1
    } else if (~this.$route.name.indexOf('notice')) {
      idx = 2
    }
    let This = this;
    setTimeout(function(){
      console.log(This.$data.linkMenuDataTop);
      for (let i = 0;i < 6; i++){
      This.$data.linkMenuDataTop.push({
        menuLink: "javascript:void(0)",
        menuName: "zheng",
        menuTips: "zhengxiya",
      })}
    },1000)
    return {
      idx,
      linkMenuDataTop: [],
    }
  },
  created() {
    this.getLinkMenuList()
  },
  computed: {
    ...mapState({
      site: (state) => state.site,
      systemStyle: (state) => state.systemStyle,
    }),
  },
  methods: {
    loginBoxShow(){
      this.$emit("listenToChildEvent",this.$refs.showBox);
    },
    showMoreBaiduLink(){
        this.$emit("listenToChildEvent1",this.$data.linkMenuDataTop);
    },
    setHomePage() {},
    addToFav() {},
    async getLinkMenuList() {
      let that = this
      const res = await this.$axios.get('/site/customMenu/listForDomain')
      if (res.code === 1001) {
        if (res.body) {
          that.linkMenuDataTop = res.body
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  width: 1000px;
  margin: 0 auto 0;
  padding-top: 30px;
  position: relative;
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
      line-height: 90px;
      margin-right: 15px;
      img {
        width: 180px;
        height: 60px;
        vertical-align: middle;
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
    min-width: 1190px;
    line-height: 90px;
    .span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      margin-right: 30px;
      position: relative;
      &:hover {
        transition: all 0.3s ease-out;
        &::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 100%;
          box-sizing: border-box;
          border-width: 0 25px;
          border-style: solid;
          border-color: #fff;
          height: 2px;
          background-color: #1e9fff;
          transition: all 0.3s ease-out;
        }
      }
    }
    a {
      text-align: center;
      padding: 5px 25px;
      line-height: 20px;
      display: inline-block;
      min-width: 75px;
      text-align: center;
      font-weight: 500;
      text-decoration: none;
      color: #fff;
      background-color: #000;
      border-radius: 8px;
      &:hover,
      &.selected {
        // background: $--deep-color-primary;
        transition: all 0.3s ease-out;
        background-color: #fff;
        color: #000;
      }
    }
  }
}
.el-message-box__wrapper{
  background-color: rgba(0,0,0,0.6);
}
</style>
