<template>
  <section>
    <van-tabs @change="onTabChange">
      <van-tab title="普通注册"></van-tab>
      <!-- <van-tab title="手机验证码注册"></van-tab> -->
    </van-tabs>
    <div class="register">
      <van-cell-group>
        <van-field
          v-if="activeName === 'common'"
          v-model="form.login"
          required
          clearable
          placeholder="您的登录名"
        />
        <van-field
          v-if="activeName === 'phone'"
          v-model="form.phoneNum"
          required
          clearable
          placeholder="手机号码"
        />
        <van-field
          :right-icon="pwType === 'text' ? 'eye-o' : 'closed-eye'"
          @click-right-icon="changePwType"
          v-model="form.password"
          :type="pwType"
          placeholder="设置新密码，建议至少使用两种字符组合"
          required
        />
        <van-field
          v-if="activeName === 'common'"
          v-model="form.passwordRepeat"
          :type="pwType"
          placeholder="请确认新密码"
          required
        />
        <van-field
          v-if="activeName === 'common'"
          v-model="form.userName"
          required
          clearable
          placeholder="您的用户名"
        />
        <van-field
          v-if="activeName === 'common'"
          v-model="form.qq"
          clearable
          placeholder="建议使用常用QQ号码，用于找回密码"
        />
        <van-field
          v-if="activeName === 'common'"
          v-model="form.parentID"
          clearable
          placeholder="上级编号，没有可不填"
        />
        <van-field
          v-if="activeName === 'phone'"
          v-model="form.newPassword"
          placeholder="手机验证码"
          required
        >
          <van-button slot="button" size="small" type="primary"
            >发送验证码</van-button
          >
        </van-field>
      </van-cell-group>
      <van-button class="reg" type="primary" @click="submit"
        >立即注册</van-button
      >
      <a href="/wap/login">
        <p>已有帐号？立即登录</p>
      </a>
    </div>
  </section>
</template>

<script>
import { Dialog } from 'vant'
import regMixin from '@/mixins/register'

export default {
  layout: 'wap',
  mixins: [regMixin],
  data() {
    return {
      pwType: 'password'
    }
  },
  mounted() {
    // Dialog({
    //   title: '提示',
    //   message: '注册成功后的初始交易密码，默认为123123'
    // })
    const { parentNo } = this.$route.query
    if (parentNo) {
      this.form.parentID = parentNo
    }
  },
  methods: {
    onTabChange(val) {
      this.activeName = val === 0 ? 'common' : 'phone'
    },
    changePwType() {
      this.pwType = this.pwType === 'password' ? 'text' : 'password'
    },
    submit() {
      if (this.form.login.length < 4 || this.form.login.length > 20) {
        return this.$notify({
          type: 'danger',
          message: '登录名长度在4到20个字符'
        })
      }
      if (this.form.password.length < 4 || this.form.password.length > 20) {
        return this.$notify({
          type: 'danger',
          message: '密码长度在6到20个字符'
        })
      }
      if (this.form.password !== this.form.passwordRepeat) {
        return this.$notify({
          type: 'danger',
          message: '两次密码内容不相同'
        })
      }
      if (this.form.userName.length < 4 || this.form.userName.length > 20) {
        return this.$notify({
          type: 'danger',
          message: '用户名长度在4到20个字符'
        })
      }
      this.doRegister()
    },
    regSuccess() {
      Dialog({
        title: '提示',
        message: '注册成功'
      }).then(() => {
        location.href = '/wap/user'
      })
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
