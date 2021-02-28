<template>
  <section>
    <van-tabs @change="onTabChange">
      <van-tab title="注册新账号"></van-tab>
      <van-tab title="绑定已有账号"></van-tab>
    </van-tabs>
    <div class="register">
      <van-cell-group v-if="activeName === 'common'">
        <van-field
          v-model="form.login"
          required
          clearable
          placeholder="您的登录名"
        />
        <van-cell style="padding-left: 25px" title="默认密码" value="123123" />
        <!-- <van-field
          :right-icon="pwType === 'text' ? 'eye-o' : 'closed-eye'"
          @click-right-icon="changePwType"
          v-model="form.password"
          :type="pwType"
          placeholder="设置新密码，建议至少使用两种字符组合"
          required
        />
        <van-field
          v-model="form.passwordRepeat"
          :type="pwType"
          placeholder="请确认新密码"
          required
        />
        <van-field v-model="form.userName" clearable placeholder="您的用户名" />
        <van-field
          v-model="form.qq"
          clearable
          placeholder="建议使用常用QQ号码，用于找回密码"
        /> -->
        <van-field
          v-model="form.parentID"
          clearable
          placeholder="上级编号，没有可不填"
        />
      </van-cell-group>
      <van-cell-group v-if="activeName === 'login'">
        <van-field
          v-model="form.xlogin"
          required
          clearable
          placeholder="您的登录名"
        />
        <van-field
          :right-icon="pwType === 'text' ? 'eye-o' : 'closed-eye'"
          @click-right-icon="changePwType"
          v-model="form.password"
          :type="pwType"
          placeholder="您的登录密码"
          required
        />
      </van-cell-group>
      <van-button class="reg" type="primary" @click="submit">{{
        activeName === 'common' ? '注册并绑定' : '绑定账户'
      }}</van-button>
    </div>
  </section>
</template>

<script>
import regMixin from '@/mixins/register'
import { randomString } from '@/common/utils'

export default {
  layout: 'wap',
  mixins: [regMixin],
  data() {
    return {
      pwType: 'password'
    }
  },
  mounted() {
    this.form.login = randomString(10)
  },
  methods: {
    onTabChange(val) {
      this.activeName = val === 0 ? 'common' : 'login'
    },
    changePwType() {
      this.pwType = this.pwType === 'password' ? 'text' : 'password'
    },
    submit() {
      if (this.activeName === 'login') {
        if (this.form.password.length < 4 || this.form.password.length > 20) {
          return this.$notify({
            type: 'danger',
            message: '密码长度在6到20个字符'
          })
        }
        if (this.form.xlogin.length < 4 || this.form.xlogin.length > 20) {
          return this.$notify({
            type: 'danger',
            message: '登录名长度在4到20个字符'
          })
        }
      } else if (this.form.login.length < 4 || this.form.login.length > 20) {
        return this.$notify({
          type: 'danger',
          message: '登录名长度在4到20个字符'
        })
      }
      this.doRegister()
    },
    async doRegister() {
      if (this.activeName === 'common') {
        const { openid, tk, auth } = this.$route.query
        const res = await this.$axios.post(
          `${location.origin}/web-api/third-register`,
          null,
          {
            params: { ...this.form, openid, tk, auth }
          }
        )
        if (res.code === 1001) {
          this.$notify({
            type: 'success',
            message: '注册成功，即将跳转用户首页'
          })
          location.href = '/wap/user'
        }
      } else if (this.activeName === 'login') {
        const { openid, tk, auth } = this.$route.query
        const res = await this.$axios.post(
          `${location.origin}/web-api/third-bind`,
          null,
          {
            params: {
              login: this.form.xlogin,
              password: this.form.password,
              openid,
              tk,
              auth
            }
          }
        )
        if (res.code === 1001) {
          this.$notify({
            type: 'success',
            message: '绑定成功，即将跳转用户首页'
          })
          location.href = '/wap/user'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  padding: 15px;
  button {
    span {
      color: white;
    }
  }
  button.reg {
    width: 100%;
    font-weight: 500;
    margin: 60px 0 20px 0;
    & + a {
      p {
        text-align: center;
        font-size: 14px;
        color: $--gray-text-color;
      }
    }
  }
  ::v-deep input {
    padding-left: 10px;
  }
  .van-hairline--top-bottom::after {
    border-width: 0 0 1px;
  }
}
</style>
