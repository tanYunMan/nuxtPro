<template>
  <section class="forget">
    <h1>找回密码</h1>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        placeholder="您的用户名和登录名"
      />
      <van-field
        :right-icon="pwType === 'text' ? 'eye-o' : 'closed-eye'"
        @click-right-icon="changePwType"
        v-model="password"
        :type="pwType"
        placeholder="设置新密码，建议至少使用两种字符组合"
        required
      />
      <van-field
        v-model="newPassword"
        :type="pwType"
        placeholder="请确认新密码"
        required
      />
    </van-cell-group>
    <van-button type="primary">立即找回</van-button>
  </section>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return { username: '', password: '', newPassword: '', pwType: 'password' }
  },
  methods: {
    changePwType() {
      if (this.pwType === 'password') {
        this.pwType = 'text'
      } else {
        this.pwType = 'password'
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
