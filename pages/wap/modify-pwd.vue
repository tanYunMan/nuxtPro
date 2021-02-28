<template>
  <section class="forget">
    <h1>修改密码</h1>
    <van-cell-group>
      <van-field
        v-model="password"
        type="password"
        required
        clearable
        placeholder="请输入旧密码"
      />
      <van-field
        :right-icon="pwType === 'text' ? 'eye-o' : 'closed-eye'"
        @click-right-icon="changePwType"
        v-model="newPassword"
        :type="pwType"
        placeholder="设置新密码，建议至少使用两种字符组合"
        required
      />
      <van-field
        v-model="repeatPassword"
        :type="pwType"
        placeholder="请确认新密码"
        required
      />
    </van-cell-group>
    <van-button @click="updatePwd" type="primary">立即修改</van-button>
  </section>
</template>

<script>
import user from '@/common/user'

export default {
  layout: 'wap',
  data() {
    return {
      password: '',
      newPassword: '',
      repeatPassword: '',
      pwType: 'password'
    }
  },
  methods: {
    changePwType() {
      if (this.pwType === 'password') {
        this.pwType = 'text'
      } else {
        this.pwType = 'password'
      }
    },
    async updatePwd() {
      if (this.password.length < 6 || this.password.length > 20) {
        return this.$notify({ type: 'danger', message: '旧密码输入错误' })
      }
      if (this.newPassword.length < 6 || this.newPassword.length > 20) {
        return this.$notify({
          type: 'danger',
          message: '新密码长度必须在6到20个字符'
        })
      }
      if (this.repeatPassword !== this.newPassword) {
        return this.$notify({ type: 'danger', message: '两次密码输入不一致' })
      }
      const res = await this.$axios.post(
        '/user/user/updateUserPassword',
        null,
        {
          params: {
            oldPassword: this.password,
            password: this.newPassword
          }
        }
      )
      if (res.code === 1001) {
        this.$notify({ type: 'success', message: '修改用户密码成功' })
        user.removeToken(this.$cookies)
        location.replace('/wap/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.forget {
  padding: 60px 15px 15px 15px;
  h1 {
    font-size: 22px;
    margin-top: 15px;
    color: $--gray-text-color;
  }
  h1 + div {
    margin-top: 30px;
  }
  button {
    width: 100%;
    font-weight: 500;
    margin: 60px 0 30px 0;
    span {
      color: white;
    }
  }
  ::v-deep input {
    padding-left: 10px;
  }
}
</style>
