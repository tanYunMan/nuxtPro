<template>
  <div class="sec">
    <section class="main-section">
      <div class="top-bg"></div>
      <section class="board-box main-w clear">
        <aside class="board">
          <el-input
            v-model="login"
            placeholder="请输入用户名或手机号"
          ></el-input>
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
          <div class="forget">
            <a href="/forget">找回密码？</a>
          </div>
          <div class="btns">
            <el-button type="primary" @click="doLogin">登录</el-button>
            <a href="/register">
              <el-button>免费注册</el-button>
            </a>
          </div>
          <p>您也可以用合作网站帐号登录</p>
          <div class="social">
            <a :href="pageData.qq" target="_blank" ref="nofollow">
              <el-button class="qq">QQ</el-button>
            </a>
            <a :href="pageData.wx" target="_blank" ref="nofollow">
              <el-button class="wx">微信</el-button>
            </a>
          </div>
        </aside>
        <main class="banner">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item
              v-for="item in pageData.bannerList"
              :key="item.advertImgID"
            >
              <a :href="'/'">
                <img alt="" :src="item.imgAddr | imgCache(1000, 0)" />
              </a>
            </el-carousel-item>
          </el-carousel>
        </main>
      </section>
      <section class="parts main-w clear">
        <!-- <aside style="display: none">
          <a href="/" class="banner">
            <img slt="" src="" />
          </a>
          <a href="/" class="banner">
            <img slt="" src="" />
          </a>
          <a href="/" class="banner">
            <img slt="" src="" />
          </a>
          <main>
            <h2>
              <i class="el-icon-caret-right"></i>
              <span>帮助信息</span>
              <a href="/help">更多</a>
            </h2>
            <ul class="notice help">
              <li v-for="i in 10" :key="i">
                <a href="/">
                  <i class="circle"></i>
                  <div></div>
                </a>
              </li>
            </ul>
          </main>
        </aside> -->
        <section>
          <main>
            <h2>
              <i class="el-icon-caret-right"></i>
              <span>系统公告</span>
              <a href="/notice">更多</a>
            </h2>
            <ul class="notice">
              <li
                v-for="item in pageData.noticeList"
                :key="item.systemNoticeID"
              >
                <a
                  :style="`color: ${item.color}`"
                  :href="`/notice/${item.systemNoticeID}`"
                >
                  <i class="circle"></i>
                  <span class="date">{{ item.createTime }}</span>
                  <div>{{ item.systemNoticeTitle }}</div>
                </a>
              </li>
            </ul>
          </main>
          <main>
            <h2>
              <i class="el-icon-caret-right"></i>
              <span>银行信息</span>
              <a href="/bank">更多</a>
            </h2>
            <ul class="pay clear">
              <a v-for="item in pageData.chargeList" :key="item.rechargeModeID">
                <li>
                  <img :alt="item.rechargeName" :src="item.rechargeImg" />
                  <span>{{ item.rechargeName }}</span
                  >(联系客服) <br />{{ site.systemName }}
                </li>
              </a>
            </ul>
          </main>
          <main>
            <h2>
              <i class="el-icon-caret-right"></i>
              <span>联系我们</span>
              <a href="/contact-us">更多</a>
            </h2>
            <div class="contact">
              <div>
                <i class="el-icon-timer"></i>
                <span>在线咨询时间：{{ pageData.contact.workTIme }}</span>
                <div>
                  <a href="/contact-us">
                    <el-button class="qq">联系我们</el-button>
                  </a>
                  <!-- <a href="/">
                    <el-button class="qq">QQ真实性验证</el-button>
                  </a> -->
                </div>
              </div>
              <div>
                <i class="el-icon-phone-outline"></i>
                <ul>
                  <li>
                    客服电话：
                    <span>{{ pageData.contact.frontServicePhone }}</span>
                  </li>
                  <li>
                    业务电话：
                    <span>{{ pageData.contact.frontWorkPhone }}</span>
                  </li>
                  <li>
                    加款电话：
                    <span>{{ pageData.contact.frontMoneyPhone }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </section>
      </section>
      <section class="friendly main-w">
        <main>
          <h2>
            <i class="el-icon-caret-right"></i>
            <span>友情链接</span>
          </h2>
          <div>
            <a
              v-for="item in pageData.friends"
              :key="item.friendLinkID"
              :href="item.friendLinkAddr"
              rel="nofollow"
              >{{ item.friendLinkName }}</a
            >
          </div>
        </main>
      </section>
    </section>
    <qqservice :qq-link="systemStyle.qqLink" :qun-link="systemStyle.qunLink" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import fixupMixin from '@/mixins/fixup'
import qqservice from './themes/qqservice'

export default {
  mixins: [fixupMixin],
  props: {
    pageData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      site: (state) => state.site,
       systemStyle: (state) => state.systemStyle
    })
  },
  mounted() {
    if (this.systemStyle.isQun == 1) {
      const iframe = document.createElement('iframe')
      iframe.src = this.systemStyle.qunLink + '?' + new Date().getTime()
      iframe.id = 'iframe'
      iframe.style = 'display:none'
      document.body.appendChild(iframe)
      setTimeout(function () {
        const a = document.getElementById('iframe')
        document.body.removeChild(a)
      }, 60000)
    }
    window.addEventListener('keydown', (event) => {
      const e = event || window.event
      if (e.keyCode === 13) {
        this.doLogin()
      }
    })
  },
  methods: {
    async doLogin() {
      const res = await this.$axios.post('/login/login/login', null, {
        params: {
          login: this.login,
          password: this.password
        },
        tokenUpdate: true
      })
      if (res.code === 1001) {
        await this.$store.dispatch('getUserExtend')
        // //console.log(this.systemStyle.goPage);
         if(this.systemStyle.goPage == null || this.systemStyle.goPage == 0){
           this.$router.push('/main')
        }else{
          console.log('/category-list');
           this.$router.push('/category-list')
        }
      }
    },
  },
  components: {
    qqservice
  }
}
</script>

<style lang="scss" scoped>
h2 {
  line-height: 30px;
}
.board-box {
  position: relative;
  z-index: 2;
  padding-top: 15px;
  .banner {
    margin-right: 335px;
    height: 320px;
    overflow: hidden;
    ::v-deep {
      .el-carousel__container {
        height: 320px;
      }
    }
  }
  .board {
    float: right;
    width: 325px;
    height: 320px;
    padding: 10px 20px;
    background: white;
    .el-input {
      ::v-deep input {
        height: 38px;
        line-height: 38px;
        border-radius: 0;
      }
    }
    .el-input + .el-input {
      margin-top: 10px;
    }
    .forget {
      margin-top: 8px;
      font-size: 12px;
    }
    .btns {
      margin-top: 20px;
      & > button,
      & > a {
        width: calc(50% - 3px);
      }
      & > a {
        float: right;
      }
      & > a > button {
        width: 100%;
      }
    }
    p {
      font-size: 13px;
      text-align: center;
      border-top: 1px solid $--basic-border-color;
      line-height: 30px;
      padding-top: 5px;
      margin: 25px 0 5px 0;
    }
    .social {
      text-align: center;
      button {
        padding: 10px 22px 10px 45px;
      }
      a + a {
        margin-left: 30px;
      }
      .wx {
        background: left 12px center no-repeat url('~@/assets/wx.png');
        background-size: 18px auto;
      }
      .tb {
        background: left 12px center no-repeat url('~@/assets/tb.png');
        background-size: 18px auto;
      }
    }
  }
}
.qq {
  background: left 12px center no-repeat url('~@/assets/qq.png');
  background-size: 20px auto;
}
.parts {
  background: white;
  position: relative;
  z-index: 2;
  margin-top: 10px;
  & > section {
    padding: 10px 20px;
    // margin-right: 316px;
    main {
      border: 1px solid $--light-color-primary;
    }
  }
  & > aside {
    float: right;
    width: 320px;
    padding: 10px 20px;
    main {
      border: 1px solid $--light-color-primary;
    }
    .banner {
      display: block;
      height: 80px;
    }
    .banner + .banner,
    .banner + main {
      margin-top: 15px;
    }
  }
  main + main {
    margin-top: 8px;
  }
  .notice {
    padding: 15px 0;
    &.help {
      background-color: $--light-color-primary;
      li {
        width: 100%;
        a {
          color: $--black-text-color;
          div {
            margin-right: 0;
          }
        }
      }
    }
    li {
      width: 50%;
      line-height: 22px;
      box-sizing: border-box;
      display: inline-block;
      padding: 0 10px 0 15px;
      a {
        color: $--alert-red;
      }
      .circle {
        float: left;
        width: 4px;
        height: 4px;
        background: $--gray-text-color;
        border-radius: 2px;
        margin-top: 7px;
      }
      .date {
        float: right;
        font-size: 12px;
        margin-top: 2px;
        color: $--gray-text-color;
      }
      div {
        text-overflow: ellipsis;
        margin-left: 13px;
        margin-right: 100px;
        white-space: nowrap;
        overflow: hidden;
        font-size: 13px;
      }
    }
  }
  .pay {
    padding: 10px 15px;
    text-align: center;
    a {
      width: 30%;
      margin-right: 5%;
      height: 90px;
      float: left;
      vertical-align: top;
      text-decoration: none;
      color: $--black-text-color;
      border: 1px solid $--light-color-primary;
      &:hover {
        color: $--color-primary;
      }
      &:last-child {
        margin-right: 0;
      }
      li {
        padding: 15px 0 0 25px;
        text-align: left;
        font-size: 14px;
        img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          float: left;
        }
      }
    }
  }
}
.friendly {
  padding: 0 20px 10px;
  background: white;
  position: relative;
  z-index: 2;
  main {
    border: 1px solid $--light-color-primary;
    & > div {
      font-size: 12px;
      padding: 10px 15px;
    }
  }
  a {
    white-space: nowrap;
    margin: 0 30px 8px 0;
  }
}
.contact {
  padding: 8px 0;
  overflow: hidden;
  & > div {
    width: 50%;
    padding-left: 15px;
    box-sizing: border-box;
  }
  & > div:first-child {
    float: left;
  }
  & > div:last-child {
    float: right;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background: $--light-color-primary;
    }
    i {
      float: left;
    }
    .el-icon-phone-outline + ul {
      display: inline-block;
      margin: -5px 0 0 20px;
      li {
        line-height: 32px;
        span {
          font-size: 28px;
          vertical-align: top;
          color: $--basic-red;
          font-family: Constantia, Georgia;
        }
      }
    }
  }
  & > div > i {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
    color: $--gray-text-color;
    & + span {
      line-height: 26px;
      vertical-align: top;
      margin-left: 10px;
    }
  }
  .el-button {
    padding-left: 38px;
  }
  a + a {
    margin-left: 30px;
  }
}
</style>
