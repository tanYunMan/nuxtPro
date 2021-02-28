<template>
  <section class="login">
    <h1>帐号登录</h1>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        placeholder="请输入用户名或手机号"
      />
      <van-field
        :right-icon="pwType === 'text' ? 'eye-o' : 'closed-eye'"
        @click-right-icon="changePwType"
        v-model="password"
        :type="pwType"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button @click="doLogin" type="primary">立即登录</van-button>
    <a class="forget" href="/wap/forget">忘记密码</a>
    <a class="register" href="/register">新用户注册</a>
    <div class="third">
      <a :href="pageData.qq" target="_blank" ref="nofollow"
        ><span class="qq"></span
      ></a>
      <a :href="pageData.wx" target="_blank" ref="nofollow"
        ><span class="wx"></span
      ></a>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'wap',
  middleware: ['wapIsLogin'],
  async asyncData({ $axios }) {
    const pageData = {}
    // qq互联
    const f = await $axios.get('/user/qqConfig/getLoginUrl')
    if (f.code === 1001 && f.body) {
      pageData.qq = f.body
    }
    pageData.wx = ''
    return { pageData }
  },
  data() {
    return { username: '', password: '', pwType: 'password' }
  },
  methods: {
    changePwType() {
      if (this.pwType === 'password') {
        this.pwType = 'text'
      } else {
        this.pwType = 'password'
      }
    },
    async doLogin() {
      const res = await this.$axios.post('/login/login/login', null, {
        params: {
          login: this.username,
          password: this.password
        },
        tokenUpdate: true
      })
      if (res.code === 1001) {
        if (
          document.referrer &&
          !(
            ~document.referrer.indexOf('/register') ||
            ~document.referrer.indexOf('/wap/forget')
          )
        ) {
          location.href = document.referrer
        } else {
          await this.$store.dispatch('getUserExtend')
          this.$router.push('/wap/user');
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 60px 15px 15px 15px;
  h1 {
    margin-top: 15px;
    font-size: 22px;
    color: $--gray-text-color;
  }
  h1 + div {
    margin-top: 30px;
    ::v-deep input {
      padding-left: 10px;
    }
  }
  button {
    width: 100%;
    font-weight: 500;
    margin: 60px 0 30px 0;
    span {
      color: white;
    }
  }
  .forget,
  .register {
    font-size: 14px;
    color: $--gray-text-color;
  }
  .register {
    float: right;
  }
  .third {
    margin-top: 20px;
    text-align: center;
    & > a > span {
      width: 48px;
      height: 48px;
      display: inline-block;
      background: center center no-repeat;
      background-size: 100% auto;
    }
    .qq {
      background-image: url('~@/assets/login_qq.png');
      margin-right: 50px;
    }
    .wx {
      background-image: url('~@/assets/login_wx.png');
    }
  }
}
</style>
