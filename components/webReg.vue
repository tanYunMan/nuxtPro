<template>
  <section class="sec">
    <div class="go-login">
      已有账号？
      <a href="/">请登录</a>
    </div>
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="普通注册" name="common"></el-tab-pane>
      <!-- <el-tab-pane label="手机验证码注册" name="phone"></el-tab-pane> -->
    </el-tabs>
    <el-form ref="form" :rules="formRules" :model="form" label-width="100px">
      <el-form-item v-if="activeName === 'common'" label="登录名" prop="login">
        <el-input
          v-model="form.login"
          placeholder="您的登录名"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="activeName === 'phone'"
        label="手机号码"
        prop="phoneNum"
      >
        <el-input
          v-model="form.phoneNum"
          placeholder="请输入手机号码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="设置密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="建议至少用两种字符组合"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="activeName === 'common'"
        label="确认密码"
        prop="passwordRepeat"
      >
        <el-input
          v-model="form.passwordRepeat"
          placeholder="再次输入密码"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="form.userName"
          placeholder="用户名"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="activeName === 'common'" label="QQ号码">
        <el-input
          v-model="form.qq"
          placeholder="建议使用常用QQ号码，用于找回密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="activeName === 'common'" label="上级编号">
        <el-input
          v-model="form.parentID"
          placeholder="没有可不填"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="activeName === 'phone'"
        class="phone-validate"
        label="手机验证码"
        prop="varifyCode"
      >
        <el-input
          v-model="form.varifyCode"
          placeholder="手机验证码"
          autocomplete="off"
        ></el-input>
        <el-button>点击获取验证码</el-button>
      </el-form-item>
      <div class="submit">
        <el-button type="primary" @click="submitForm()">立即注册</el-button>
      </div>
    </el-form>
  </section>
</template>

<script>
import regMixin from '@/mixins/register'
import { mapState } from 'vuex'

export default {
  layout: 'web',
  mixins: [regMixin],
  mounted() {
    const { parentNo } = this.$route.query
    if (parentNo) {
      this.form.parentID = parentNo
    }
  },
  methods: {
    regSuccess() {
      this.$message.success('注册成功，即将跳转')
      if(this.systemStyle.goPage == null || this.systemStyle.goPage == 0){
         this.$router.push('/main')
      }else{
         this.$router.push('/category-list')
      }

      // location.href = '/main'
    }
  },
  computed: {
    ...mapState({
      systemStyle: (state) => state.systemStyle
    })
  }
}
</script>

<style lang="scss" scoped>
section {
  width: 800px;
  padding: 40px 0;
  margin: 0 auto;
  position: relative;
  .go-login {
    position: absolute;
    right: 0;
    top: -150px;
    font-size: 16px;
    color: $--gray-text-color;
  }
  .el-tabs--top {
    text-align: center;
    height: 54px;
    ::v-deep .el-tabs__header {
      display: inline-block;
      .el-tabs__item {
        min-width: 150px;
      }
    }
  }
  .el-form {
    width: 480px;
    padding-right: 25px;
    margin: 0 auto;
    padding-top: 20px;
    .el-form-item {
      margin-bottom: 30px;
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
