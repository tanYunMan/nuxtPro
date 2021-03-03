<template>
  <div class="bg" :class="{ update: updateEnable }">
    <div class="first_type_bl bg" v-if="page ===1 || !page">
      <header>
      <quick></quick>
      <div class="top-nav">
        <div class="bw clear">
          <span class="logo">
            <img :alt="site.systemName" :src="site.logo | imgCache(300, 0)"/>
          </span>
          <h1>{{ site.systemName }}</h1>
          <span class="nav">
            <a v-for="(tab, idx) in tabList" :key="idx" :href="tab.path">
              <el-button :class="{'active':tabsClass[idx]}" @click="changeClass()">{{ tab.label }}</el-button>
            </a>
            <a :href="item.menuLink" v-for="(item, index) in linkMenuDataTop" target="_blank" :key="index">
              <el-tooltip class="item" v-if="item.menuTips" effect="dark" :content="item.menuTips" placement="top-start" >
                <el-button>{{item.menuName}}</el-button>
              </el-tooltip>
              <el-button v-else>{{item.menuName}}</el-button>
            </a>
          </span>
        </div>
      </div>
    </header>
    <section class="bw clear">
      <aside>
        <left-board></left-board>
        <el-menu
          v-if="isSupply"
          :default-active="activeIndex"
          :default-openeds="['0', '1', '2', '3']"
        >
          <el-submenu v-for="(item, idx) in navList" :key="idx" :index="`${idx}`">
            <template slot="title">
              <i :class="`el-icon-${item.icon}`"></i>
              <span>{{ item.title }}</span>
              <span :style="item.style">{{ item.title }}</span>
            </template>
            <a v-for="(nav, navIdx) in item.list" :key="navIdx" :href="nav.path">
              <el-menu-item :index="`${idx}-${navIdx}`">
                <span :style="nav.style">
                {{
                nav.label
                }}
                </span>
              </el-menu-item>
            </a>
          </el-submenu>
        </el-menu>
        <el-menu v-else :default-active="activeIndex">
          <div v-for="(nav, idx) in navList" :key="idx">
            <a v-if="nav.path && checkSupply(nav)" :href="nav.path">
              <el-menu-item :index="`${idx}`">
                <i :class="`el-icon-${nav.icon}`"></i>
                <span :style="nav.style" slot="title">{{ nav.label }}</span>
              </el-menu-item>
            </a>
            <el-submenu v-else-if="checkSupply(nav)" :index="`${idx}`">
              <template slot="title">
                <i :class="`el-icon-${nav.icon}`"></i>
                <span :style="nav.style">{{ nav.label }}</span>
              </template>
              <div v-for="(child, cid) in nav.children" :key="cid">
                <a v-if="checkSupply(child)" :href="child.path">
                  <el-menu-item :index="`${idx}-${cid}`">
                    <i :class="`el-icon-${child.icon}`"></i>
                    <span :style="child.style" slot="title">{{ child.label }}</span>
                  </el-menu-item>
                </a>
              </div>
            </el-submenu>
          </div>
          <div class="el-menu-item custom-menu" @click="$refs.vip.show()">
            <i class="el-icon-unlock"></i>
            <span>架设Vip站</span>
          </div>
          <!-- <div v-if="updateEnable" class="el-menu-item custom-menu" @click="$refs.self.show()"> -->
          <div class="el-menu-item custom-menu" @click="$refs.self.show()">
            <i class="el-icon-key"></i>
            <span>自助升级</span>
          </div>
        </el-menu>
      </aside>
      <main>
        <nuxt/>
      </main>
    </section>
    <footer>
      <div class="bw">
        <div>
          <a href="/about">关于我们</a>
          <a href="/contact-us">联系方式</a>
          <a href="/help">帮助中心</a>
        </div>
        <p>{{ site.operator }}</p>
        <p>{{ site.icp }} {{ site.icp2 }}</p>
      </div>
    </footer>
    <vip-dialog ref="vip"></vip-dialog>
    <self-update ref="self"></self-update>
    <qplayer v-if="systemStyle.frontStyle === 2&&systemStyle.backMusic" :url="systemStyle.backMusic"/>
    </div>
    <div class="second_type_fx bg" v-if="page ===2">
      <header>
        <div class="header_top">
          <div class="logo_l_box">
            <div class="img_logo">
              <a href="" target="_brank"></a>
              <img :src="site.logo | imgCache(300, 0)" alt="">
            </div>
            <img class="img_btn" @click="toUpDatSlider" src="~/assets/caidan.png" />
          </div>
          <div class="r_make_box">
            <div class="goods_l">
              <ul>
                <li>
                  <a class="jump_btn_a" href="/main">
                    <img class="goods_icon" src="~/assets/ico-index.png" />
                    <span class="t_btn">首页</span>
                  </a>
                </li>
                <li>
                  <a class="jump_btn_a" href="/category-list">
                    <img class="goods_icon" src="~/assets/shangpin.png" />
                    <span class="t_btn">商品</span>
                  </a>
                </li>
                 <li>
                  <a class="jump_btn_a" href="/orders">

                    <span class="t_btn">我的订单</span>
                  </a>
                </li>
                 <li>
                  <a class="jump_btn_a" href="/complain">

                    <span class="t_btn">我的投诉</span>
                  </a>
                </li>
                 <li>
                  <a class="jump_btn_a" href="/bill">

                    <span class="t_btn">我的明细</span>
                  </a>
                </li>
                <li v-for="(item, index) in linkMenuDataTop" :key="index">
                  <el-tooltip class="item" v-if="item.menuTips" effect="dark" :content="item.menuTips" placement="top-start" >
                    <a class="download_btn" target="_blank" :href="item.menuLink">{{item.menuName}}</a>
                  </el-tooltip>
                    <a class="download_btn" v-else target="_blank" :href="item.menuLink">{{item.menuName}}</a>
                </li>
                <li>
                  <span class="t_txt">查询：</span>
                  <el-input v-model="searchTxt" placeholder="请输入内容" size="small"></el-input>
                  <el-button type="danger" size="small" @click="toSearchGoods">搜索商品</el-button>
                  <!-- <el-button type="primary" size="small" @click="toSearchCatalog">搜索目录</el-button> -->
                </li>
              </ul>
            </div>
            <div class="user_box">
              <div class="money_box">
                <ul>
                  <li>
                    <span>余额</span>
                    <span>{{ (user.userMoney ? user.userMoney.money : 0) | n3 }}元</span>
                  </li>
                  <li>
                    <img src="~/assets/shuaxin.png" @click="toLoadAgain" />
                  </li>
                  <li>
                    <span>可用余额</span>
                    <span>{{ (user.userMoney ? user.userMoney.saleMoney : 0) | n3 }}元</span>
                  </li>
                  <li>
                    <span>冻结余额</span>
                    <span>{{ (user.userMoney ? user.userMoney.frozenMoney : 0) | n3 }}元</span>
                  </li>
                </ul>
              </div>
              <div class="user_box">
                <a href="/message/list" class="emali_img">
                  <img src="~/assets/youxiang.png" alt="">
                </a>
                <div class="user_picture_box">
                  <img class="user_img" src="~/assets/ziyuan.png" />
                  <el-popover
                    placement="bottom-end"
                    trigger="click">
                    <div class="user_mask_box">
                      <div class="t_top_user">
                        <div class="user_name">{{user.userName}}</div>
                        <span>我的余额：{{ (user.userMoney ? user.userMoney.money : 0) | n3 }}</span>
                        <span>我的编号：{{user.localUserID}}</span>
                        <span>我的等级：{{ user.userLevel ? user.userLevel.levelName : '' }}</span>
                        <span>地区：{{ user.userArea || '未知' }}</span>
                      </div>
                      <ul class="make_box">
                        <li>
                          <a href="/account">
                            <span class="txt_icon"></span>
                            <span class="txt">修改资料</span>
                          </a>
                        </li>
                        <li>
                          <a href="/safe">
                            <span class="txt_icon"></span>
                            <span class="txt">安全设置</span>
                          </a>
                        </li>
                        <li @click="doLogout">
                          <span class="txt_icon"></span>
                          <span class="txt">安全退出</span>
                        </li>
                      </ul>
                    </div>
                    <el-button slot="reference" class="mask_hide_btn"></el-button>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="bw clear">
        <aside :style="{width: isCollapse ? '64px' : 'auto'}">
          <!-- <left-board></left-board> -->
          <div :class="{slider_left_box: true, slider_noS_box: !isCollapse}" :style="{width: isCollapse ? '64px' : '180px', height: isWindowHeight ? isWindowHeight + 'px' : '1000px'}">
            <div class="user_box">
              <span class="user_name">{{user.userName}}</span>
              <span class="user_bh">我的余额：{{ (user.userMoney ? user.userMoney.money : 0) | n3 }}</span>
              <span class="user_bh">我的编号：{{user.localUserID}}</span>
              <span class="user_bh">我的等级：{{ user.userLevel ? user.userLevel.levelName : '' }}</span>
              <span class="user_bh">地区：{{ user.userArea || '未知' }}</span>
              <div class="make_btn">
                <a href="/charge"><el-button type="primary" size="small">充值</el-button></a>
                <a href="/withdraw"><el-button type="primary" size="small">提现</el-button></a>
              </div>
            </div>
            <div class="menu_box">
              <el-menu
                v-if="isSupply"
                :default-active="activeIndex"
                :default-openeds="['0', '1', '2', '3']"
                :collapse="isCollapse"
              >
                <el-submenu v-for="(item, idx) in navList" :key="idx" :index="`${idx}`">
                  <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span>{{ item.title }}</span>
                    <span :style="item.style">{{ item.title }}</span>
                  </template>
                  <a v-for="(nav, navIdx) in item.list" :key="navIdx" :href="nav.path">
                    <el-menu-item :index="`${idx}-${navIdx}`">
                      <span :style="nav.style">
                      {{

                      nav.label
                      }}
                      </span>
                    </el-menu-item>
                  </a>
                </el-submenu>
              </el-menu>
              <el-menu v-else :default-active="activeIndex" :collapse="isCollapse">
                <div v-for="(nav, idx) in navList" :key="idx">
                  <a v-if="nav.path && checkSupply(nav)" :href="nav.path">
                    <el-menu-item :index="`${idx}`">
                      <i :class="`el-icon-${nav.icon}`"></i>
                      <span :style="nav.style" slot="title">{{ nav.label }}</span>
                    </el-menu-item>
                  </a>
                  <el-submenu v-else-if="checkSupply(nav)" :index="`${idx}`">
                    <template slot="title">
                      <i :class="`el-icon-${nav.icon}`"></i>
                      <span :style="nav.style" :class="{hideSpanNow: isCollapse}">{{ nav.label }}</span>
                    </template>
                    <div v-for="(child, cid) in nav.children" :key="cid">
                      <a v-if="checkSupply(child)" :href="child.path">
                        <el-menu-item :index="`${idx}-${cid}`">
                          <i :class="`el-icon-${child.icon}`"></i>
                          <span :style="child.style" slot="title">{{ child.label }}</span>
                        </el-menu-item>
                      </a>

                    </div>
                  </el-submenu>
                </div>
                <div class="el-menu-item custom-menu" @click="$refs.vip.show()">
                  <i class="el-icon-unlock"></i>
                  <span>架设Vip站</span>
                </div>
                <!-- <div v-if="updateEnable" class="el-menu-item custom-menu" @click="$refs.self.show()"> -->
                <div class="el-menu-item custom-menu" @click="$refs.self.show()">
                  <i class="el-icon-key"></i>
                  <span>自助升级</span>
                </div>
              </el-menu>
            </div>
          </div>
        </aside>
        <main>
          <nuxt/>
        </main>
      </section>
      <footer>
        <div class="bw">
          <div>
            <a href="/about">关于我们</a>
            <a href="/contact-us">联系方式</a>
            <a href="/help">帮助中心</a>
          </div>
          <p>{{ site.operator }}</p>
          <p>{{ site.icp }} {{ site.icp2 }}</p>
        </div>
      </footer>
      <vip-dialog ref="vip"></vip-dialog>
      <self-update ref="self"></self-update>
      <qplayer v-if="systemStyle.frontStyle === 2&&systemStyle.backMusic" :url="systemStyle.backMusic"/>
    </div>
  </div>
</template>

<script>
  import '@/plugins/element-ui'
  import { mapState,mapMutations } from 'vuex'
  import fixupMixin from '@/mixins/fixup'
  import Quick from '@/components/quick'
  import tabs from '@/constants/navTabs'
  import supplyTabs from '@/constants/supplyNavTabs'
  import leftNavs from '@/constants/webLeftNavs'
  import supplyLeftNavs from '@/constants/supplyLeftNavs'
  import LeftBoard from '@/components/leftBoard'
  import vipDialog from '@/components/dialog/updateVip'
  import selfUpdate from '@/components/dialog/selfUpdate'
  import qplayer from '@/components/themes/qplayer'
  import user from '@/common/user'

  export default {
    middleware: ['authorization', 'site', 'themes'],
    components: {
      Quick,
      LeftBoard,
      vipDialog,
      selfUpdate,
      qplayer
    },
    mixins: [fixupMixin],
    data() {
      return {
        urlArr:['/main','/category-list','/goods-list','/bill','/orders','/complain'],
        tabsClass:[false,false,false,false,false,false],
        fixupPage: 'in',
        activeIndex: '-1',
        isSupply: false,
        isCollapse: false,
        searchTxt: '',
        isWindowHeight: 0,
        linkMenuDataTop: []
      }
    },
    created() {
      var url  = this.$route.path;
      this.urlArr.forEach((element,index) => {
        if(url.indexOf(element) != -1){
          this.tabsClass[index] = true;
        }
      });
      if (this.$route.path === '/goods-list') {
        if (this.$route.query.categoryId) {
          this.tabsClass[1] = true
          this.tabsClass[2] = false
        }
      }
      this.getLinkMenuList()
    },
    methods: {
      toLoadAgain () {
        window.location.reload();
      },
      doLogout() {
        user.removeToken(this.$cookies)
        location.href = '/'
      },
      toSearchGoods () {
        if (this.$route.path === '/goods-list') {
          this.setSearchFeach(this.searchTxt)
        } else {
          this.$router.push({
            path: '/goods-list',
            query: {
              keywords: this.searchTxt
            }
          })
        }
      },
      toSearchCatalog () {
        this.$router.push({
          path: '/category-list',
          query: {
            keywords: this.searchTxt
          }
        })
      },
      changeClass(){

        this.tabsClass.forEach((item,index)=>{
          this.tabsClass[index] = false;
        })
      },
      checkSupply(nav) {
        if (!nav.isSupply) {
          return true
        }
        // 是true，需要校验用户类型
        const user = this.$store.getters.user
        if (!user.userExtend) {
          return false
        }
        if (user.userExtend.isSupply === 1) {
          return true
        }
        return false
      },
      toUpDatSlider () {
        this.isCollapse = !this.isCollapse
        //console.log(this.isCollapse)
      },
      getWindowHeight () {
        let bodyDom = window.screen.availHeight;
        //console.log(bodyDom)
        this.isWindowHeight = bodyDom - 63
      },
      async getLinkMenuList() {
        let that = this
        const res = await this.$axios.get('/site/customMenu/listForDomain')
        if (res.code === 1001) {
          if (res.body) {
            that.linkMenuDataTop = res.body
          }
        }
      },
      ...mapMutations([
        'setSearchFeach'
      ])
    },
    computed: {
      ...mapState({
        updateEnable: (state) => state.updateEnable,
        site: (state) => state.site,
        systemStyle: (state) => state.systemStyle,
        user: (state) => state.user,
        page: (state) => state.systemStyle.insideStyle
      }),
      tabList() {
        if (this.isSupply) {
          return supplyTabs
        } else {
          return tabs
        }
      },
      navList() {
        if (this.isSupply) {
          return supplyLeftNavs
        } else {
          return leftNavs
        }
      }
    },
    mounted() {
      for (let i = 0; i < this.navList.length; i++) {
        if (this.navList[i].children) {
          const subList = this.navList[i].children
          for (let j = 0; j < subList.length; j++) {
            if (subList[j].path === location.pathname) {
              this.activeIndex = `${i}-${j}`
              break
            }
          }
        } else {
          if (this.navList[i].path === location.pathname) {
            this.activeIndex = `${i}`
            break
          }
        }

      }
      // } else {
      //   for (let i = 0; i < this.navList.length; i++) {
      //     if (this.navList[i].path === location.pathname) {
      //       this.activeIndex = `${i}`
      //       break
      //     }
      //   }
      // }

      this.getWindowHeight()
    },
    head() {
      return {
        title: this.site.systemName,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.site.remark
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.site.keyWord
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import 'element-ui/lib/theme-chalk/index.css';
  // @import '../static/iconfont.css';

  html {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    color: #333;
  }

  html,
  body,
  #__nuxt,
  #__layout,
  #__layout > div:first-child {
    min-height: 100%;
  }

  html,
  body,
  ul,
  p,
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    padding: 0;
  }

  main,
  section,
  aside,
  header,
  footer {
    display: block;
  }

  li {
    list-style: none;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: $--black-text-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: $--color-primary;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .clear::after {
    content: '';
    display: block;
    visibility: hidden;
    clear: both;
  }

  em {
    font-style: normal;
  }

  .line2 {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .el-input.is-disabled .el-input__inner {
    color: #999;
  }

  .d-vip {
    min-width: 700px;
  }

  .el-menu {
    padding: 10px 0;
    font-weight: 500;

    .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }

  .el-menu {
    padding: 10px 0;
    font-weight: 500;

    .el-submenu {
      .el-submenu__title {
        height: 40px;
        line-height: 40px;
      }
    }
  }

  .el-table td,
  .el-table th {
    padding: 5px 0;
    font-size: 12px;
  }

  .el-table + .el-pagination {
    margin-top: 15px;
  }
</style>

<style lang="scss" scoped>
  .user_mask_box {
    padding: 8px;
    width: 230px;
    .t_top_user {
      border-bottom: 1px solid #dcdfe6;
      img {
        width: 80px;
        height: 80px;
        display: block;
        margin: 0 auto 20px;
      }
      .user_name {
        height: 24px;
        line-height: 24px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        width: 100%;
        display: inline-block;
        line-height: 20px;
        font-size: 13px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .make_box {
      margin: 0;
      padding: 20px 0 0;
      li {
        height: 22px;
        display: flex;
        align-items: center;
        cursor: pointer;
        a {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .txt_icon {
          width: 16px;
          height: 16px;
          margin-right: 20px;
          display: block;
        }
        .txt {
          height: 25px;
          line-height: 25px;
        }
      }
    }
  }


  .slider_left_box {
    background: #fff;
    width: 240px;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    .user_box {
      padding-top: 20px;
      .user_img {
        width: 60px;
        height: 60px;
        display: block;
        margin: 0 auto;
      }
      .user_name {
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-weight: 700;
        display: inline-block;
        width: 100%;
      }
      .user_bh {
        font-size: 14px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        display: inline-block;
        width: 100%;
      }
      .make_btn {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 5px;
        .el-button {
          margin: 0 0 5px;
        }
      }
    }
    .menu_box {
      flex: 1;
      .el-icon-hide {
        content: '';
      }
      .hideSpanNow {
        display: none;
      }
    }
  }

  .slider_left_box.slider_noS_box {
    .user_box {
      .make_btn {
        .el-button {
          margin-right: 5px;
        }
      }
    }
  }

  .active{
    background:#ECF5FF;
    color: #409EFF;
  }
  .bg {
    min-width: 1280px;
    background: $--wap-bg-color;
  }

  .bw {
    min-width: 1280px;
    padding: 0 15px;

    &::after {
      content: '';
      display: block;
      visibility: hidden;
      clear: both;
    }
  }

  .bg > header {
    padding: 0;
    border-bottom: 3px solid $--main-top-border;

    .top-nav {
      background: white;
      text-align: right;
      padding: 15px 0;

      .logo {
        width: 144px;
        height: 80px;
        float: left;

        img {
          object-fit: contain;
        }
      }

      .nav {
        margin-top: 24px;
        display: inline-block;
      }

      a {
        background: white;
      }

      .el-button {
        padding: 8px 0;
        min-width: 88px;
      }

      a + a {
        margin-left: 25px;
      }

      .el-button.selected {
        color: $--color-primary;
        border-color: $--button-border-primary;
        background-color: $--light-color-primary;
      }
    }

    .header_top {
      height: 60px;
      display: flex;
      background: #fff;
      .logo_l_box {
        border-bottom: 1px solid #dcdfe6;
        border-right: 1px solid #dcdfe6;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 10px;
        width: 180px;
        justify-content: center;
        .img_logo {
          width: 144px;
          height: 80px;
          margin-right: 20px;
          position: relative;
          img {
            height: 100%;
            width: 100%;
            display: block;
            object-fit: contain;
          }
          a {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
        .img_btn {
          width: 18px;
          height: 14px;
          cursor: pointer;
        }
      }
      .r_make_box {
        flex: 1;
        overflow: hidden;
        display: flex;
        padding: 0 5px;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        .goods_l {
          ul {
            display: inline-flex;
            li {
              display: inline-flex;
              padding: 10px 5px;
              cursor: pointer;
              align-items: center;
              .jump_btn_a {
                display: inline-flex;
                text-decoration: none;
                align-items: center;
              }
              a {
                text-decoration: none;
                height: 20px;
                line-height: 20px;
              }
              .goods_icon {
                width: 20px;
                height: 20px;
                display: block;
                font-size: 20px;
                line-height: 20px;
                margin-right: 10px;
              }
              .t_btn {
                white-space: nowrap;
                height: 20px;
                line-height: 20px;
              }
              .t_txt {
                height: 20px;
                line-height: 20px;
                white-space: nowrap;
              }
              .el-input {
                width: 200px;
                margin-right: 10px;
              }
            }
          }
        }
        .user_box {
          display: flex;
          .money_box {
            display: inline-flex;
            ul {
              display: inline-flex;
              li {
                display: inline-flex;
                align-items: center;
                cursor: pointer;
                margin-right: 5px;
                span:first-child {
                  margin: 0 5px;
                  white-space: nowrap;
                }
                span:last-child {
                  background: #409EFF;
                  padding: 6px 10px;
                  border-radius: 3px;
                  color: #ffffff;
                  font-size: 75%;
                  white-space: nowrap;
                }
                img {
                  width: 20px;
                  height: 20px;
                  display: block;
                }
              }
            }
          }
          .user_box {
            display: inline-flex;
            margin-left: 25px;
            align-items: center;
            .emali_img {
              cursor: pointer;
              margin-right: 10px;
              width: 20px;
              height: 20px;
              display: block;
              font-size: 24px;
              line-height: 20px;
            }
            .user_picture_box {
              width: 30px;
              height: 30px;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              .user_img {
                width: 16px;
                height: 16px;
                cursor: pointer;
              }
              .mask_hide_btn {
                position: absolute;
                left: 0;
                top: 0;
                width: 30px;
                height: 30px;
                padding: 0;
                z-index: 1;
                background: transparent;
                border: 0;
                outline: none;
              }
            }
          }
        }
      }
    }

    h1 {
      font-size: 18px;
      line-height: 80px;
      float: left;
      display: none;
    }

    & + section {
      min-height: calc(100% - 260px);
    }
  }

  .bg.second_type_fx > header {
    border-bottom: 0;
  }

  .bg > section {
    padding: 25px 15px;
    position: relative;

    aside {
      width: 170px;
      float: left;
      background-color: #fff;

      .el-menu {
        border-right: 0;

        .el-menu-item.is-active {
          outline: 0;
          background-color: #ecf5ff;
          width: 100%;
          min-width: auto;
        }

        a:hover {
          text-decoration: none;

          i,
          span {
            color: $--color-primary;
          }
        }
      }
    }

    ::v-deep main {
      margin-left: 185px;
      overflow: hidden;
      position: relative;

      h3 {
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        padding: 0 20px;
        color: #010101;
        background: white;
        margin-bottom: 15px;

        & > span {
          padding-left: 26px;
          border-left: 4px solid $--color-primary;
        }

        .el-button {
          float: right;
          padding: 6px 10px;
          margin-top: 4px;
        }

        a + a {
          .el-button {
            margin-right: 15px;
          }
        }
      }

      h3 + .el-button + section,
      section + section {
        margin-top: 15px;
      }

      .query {
        float: right;
        padding: 10px 15px;
        margin: 15px 15px 0 0;
      }

      .filter {
        padding: 6px 15px;
        background: white;
        margin: 10px 0;

        section {
          padding: 6px 0;

          & + section {
            margin-top: 0;
          }

          &:not(:last-child) {
            border-bottom: 1px dashed $--basic-border-color;
          }
        }

        .query {
          margin: 5px 0 0;
        }
      }

      .tip {
        font-size: 12px;
        background: white;
        padding: 15px;
        color: $--basic-orange;

        a {
          color: $--black-text-color;

          &:hover {
            color: $--color-primary;
          }
        }
      }
    }
  }

  .bg.second_type_fx {
    section {
      padding: 0;
    }
    .bw {
      display: flex;
      main {
        flex: 1;
        overflow: hidden;
        margin: 5px;
      }
    }
  }

  .bg > footer {
    padding: 15px 0;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    background: $--tab-gray-color;

    a:not(:last-child)::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 12px;
      background: $--gray-text-color;
      vertical-align: text-top;
      margin: 2px 0 0 15px;
    }

    a + a {
      margin-left: 15px;
    }
  }
</style>
