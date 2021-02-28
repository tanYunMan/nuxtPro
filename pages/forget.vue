<template>
  <section>
    <div class="go-login">
      已有账号？
      <a href="/">请登录</a>
    </div>
    <div class="tip">
      <span>注</span
      >找回密码之前，请确定您已进行微信安全绑定，否则请联系人工客服进行处理
    </div>
    <el-form :model="form" :rules="rules" label-width="100px">
      <el-form-item label="您的帐号" prop="pass">
        <el-input
          placeholder="您的用户名和登录名"
          v-model="form.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="checkPass">
        <el-input
          placeholder="建议至少用两种字符组合"
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          placeholder="再次输入密码"
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <div class="submit">
        <el-button type="primary" @click="submitForm()">立即找回</el-button>
      </div>
    </el-form>
  </section>
</template>

<script>
export default {
  layout: 'web',
  data() {
    return {
      activeName: 'common',
      form: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [{ trigger: 'blur' }],
        checkPass: [{ trigger: 'blur' }],
        age: [{ trigger: 'blur' }]
      }
    }
  },
  methods: {
    tabClick() {
      this.form.pass = ''
    },
    submitForm() {}
  }
}
</script>

<style lang="scss" scoped>
section {
  width: 800px;
  margin: 40px auto 80px auto;
  position: relative;
  .go-login {
    position: absolute;
    right: 0;
    top: -150px;
    font-size: 16px;
    color: $--gray-text-color;
  }
  .tip {
    text-align: center;
    line-height: 50px;
    margin-bottom: 15px;
    font-weight: 600;
    color: $--color-primary;
    span {
      background: $--color-primary;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      display: inline-block;
      line-height: 32px;
      margin-right: 5px;
    }
  }
  .el-form {
    margin: 0 auto;
    width: 480px;
    padding: 20px 25px 0 0;
    .el-form-item {
      margin-bottom: 40px;
      &.phone-validate {
        .el-input {
          width: 200px;
        }
        .el-button {
          float: right;
        }
      }
    }
    .submit {
      padding-left: 32px;
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
