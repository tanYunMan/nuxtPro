<template>
  <div class="sec web1">
    <div v-if="systemStyle.backImg && !systemStyle.backVideo" class="bg" :style="{ backgroundImage: `url(${systemStyle.backImg || bgdefImg})` }"></div>
    <div v-if="systemStyle.backVideo" class="bg">
      <video autoplay="" loop="">
        <source :src="systemStyle.backVideo" type="video/mp4" />
      </video>
    </div>
    <div v-if="!systemStyle.backImg && !systemStyle.backVideo" class="bg" :style="{ backgroundImage: `url(${bgdefImg})` }"></div>
    <webHeader props="" @listenToChildEvent="showMsgFromChild" @listenToChildEvent1="showMoreBaiduA"/>



    <section class="main-section">
      <section class="board-box main-w clear" ref="innerMes">
        <div class="board-box-left">
          <div class="item">
            <div class="item-list-title">
                  上架/补货/业务客服QQ
            </div>
            <div class="item-list-qq">
                215255597
            </div>
          </div>
          <div class="item">
            <div class="item-list-title">
                  上架/补货/业务客服QQ
            </div>
            <div class="item-list-qq">
                215255597
            </div>
          </div>
          <div class="item">
            <div class="item-list-title">
                  上架/补货/业务客服QQ
            </div>
            <div class="item-list-qq">
                215255597
            </div>
          </div>
        </div>
        <aside class="board" ref="mesBoxCon">
          <el-input v-model="login" placeholder="请输入用户名或手机号"></el-input>
          <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
          <div class="forget">
            <a href="/forget">找回密码？</a>
          </div>

            <nuxt-link to="/show-list">跳到测试页</nuxt-link>

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
        <div class="board-box-right">
          <a href="javascript:void(0)"><img src="http://img.qqlogin.top/Uploads/KAYISU/10756/2020-09-27/5f701fa0e4149.png" alt=""></a>
          <a href="javascript:void(0)"><img src="http://img.qqlogin.top/Uploads/KAYISU/10756/2020-09-27/5f701fa0e4149.png" alt=""></a>
          <a href="javascript:void(0)"><img src="http://img.qqlogin.top/Uploads/KAYISU/10756/2020-09-27/5f701fa0e4149.png" alt=""></a>
        </div>


      </section>
    </section>
    <webFooter />
    <!--    <qplayer :url="systemStyle.backMusic" />-->
    <qqservice :qq-link="systemStyle.qqLink" :qun-link="systemStyle.qunLink" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import webHeader from './webHeader'
import webFooter from './webFooter'
import qqservice from './qqservice'
import fixupMixin from '@/mixins/fixup'
import bgdefImg from '@/assets/bg_def.jpg'

export default {
  components: {
    webHeader,
    webFooter,
    qqservice
  },
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
      password: '',
      bgdefImg
    }
  },
  computed: {
    ...mapState({
      site: (state) => state.site,
      systemStyle: (state) => state.systemStyle
    })
  },
  mounted() {

    console.log(this.systemStyle)
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

    showMoreBaiduA(e){
      console.log(e);
    },

    showMsgFromChild(d){
      const h = this.$createElement;
      let This = this;

      setTimeout(function(){

        document.getElementsByClassName('el-message-box__content')[0].innerHTML = "";
        document.getElementsByClassName('el-message-box__content')[0].appendChild(This.$refs.mesBoxCon);
      },50)
      this.$msgbox({
        title: '登录',
        message: h("div",null,""),
        showCancelButton: false,
        showConfirmButton: false,
        beforeClose: (action, instance, done) => {
          setTimeout(function(){This.$refs.innerMes.appendChild(This.$refs.mesBoxCon)},100)

          done();
        }
      }).catch(()=>{
        new Error("弹窗错误")
      });
    },
    async doLogin() {
           this.$router.push('/category-list')
      const res = await this.$axios.post('/login/login/login', null, {
        params: {
          login: this.login,
          password: this.password
        },
        tokenUpdate: true
      })
      if (res.code === 1001) {
        await this.$store.dispatch('getUserExtend')
         console.log(this.systemStyle.goPage);
        if(this.systemStyle.goPage == null || this.systemStyle.goPage == 0){
           this.$router.push('/main')
        }else{
           this.$router.push('/category-list')
        }

      }
    }
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  &:hover{
      cursor: url("https://img.alicdn.com/imgextra/i1/1747058769/O1CN01M2sRPI2EeFj2u0hKz_!!1747058769.png?t=1601084255000"),default;
    }
}
.el-message-box{
  background-color: rgba(255,255,255,0.17);
  border: none;
    border-radius: 15px;
    box-shadow: 0 0 5 rgba(0,0,0,0.5);
  .el-message-box__header span{
    color: #fff;
  }
  .el-message-box__close{
    color: #fff;
  }
  .board {
      background: transparent;
    }
}
.web1 {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background: top center no-repeat;
    background-size: cover;
    video {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
.board-box {
  position: relative;
  z-index: 2;
  padding-top: 15px;
  text-align: center;
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
}
  .board {
    display: inline-block;
    vertical-align: top;
    width: 325px;
    height: 320px;
    padding: 20px;
    margin: 5% auto 0;
    /*background: white;*/
    background: rgba(255,255,255,.17);
    border-radius: 15px;
    box-shadow: 0 0 5 rgba(0,0,0,0.5);
    a {
      color: #999;
    }
    .el-input {
      ::v-deep input {
        height: 38px;
        line-height: 38px;
        border-radius: 0;
      }
      input{
        background-color: transparent;
        color: #fff;
        &:focus{
          background-color: #333;
          border: #fff 1px solid;
        }
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
      color: #999;
    }
    .social {
      text-align: center;
      button {
        padding: 10px 22px 10px 45px;
        background-color: #fff;
      }
      a + a {
        margin-left: 30px;
      }
      .wx {
        background: #fff left 12px center no-repeat url('~@/assets/wx.png');
        background-size: 18px auto;
      }
      .tb {
        background: left 12px center no-repeat url('~@/assets/tb.png');
        background-size: 18px auto;
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
  margin-top: 15px;
  & > section {
    padding: 20px;
    // margin-right: 316px;
    main {
      border: 1px solid $--light-color-primary;
    }
  }
  & > aside {
    float: right;
    width: 320px;
    padding: 20px;
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
    margin-top: 15px;
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
    padding: 20px 15px;
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
  padding: 15px 20px 20px;
  background: white;
  position: relative;
  z-index: 2;
  main {
    border: 1px solid $--light-color-primary;
    & > div {
      font-size: 12px;
      padding: 15px;
    }
  }
  a {
    white-space: nowrap;
    margin: 0 30px 8px 0;
  }
}
.contact {
  padding: 15px 0;
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
.board-box-left{
  margin-top: 60px;
  float: left;
  padding: 25px 35px;
  background: rgba(255,255,255,.17);
  border-radius: 15px;
  box-shadow: 0 0 5 rgba(0,0,0,0.5);
  .item{
    padding-bottom: 32px;
    min-width: 240px;
    .item-list-title{
      padding-bottom: 6px;
      font-size: 20px;
      color: #fff;
      color: rgba(255,255,255,0.7);
    }
    .item-list-qq{
      font-size: 22px;
      color: #f00;
      color: rgba(255,0,0,0.7);
      text-align: right;
    }
  }
}
.board-box-right{
  float: right;
  margin-top: 60px;
  &>:last-child img{
    margin-bottom: 0;
  }
  img{
    display: block;
    width: 280px;
    height: 90px;
    margin-bottom: 25px;
  }
}
.el-message-box__wrapper{
  background-color: rgba(0,0,0,0.7);
}
</style>
