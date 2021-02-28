<template>
  <section class="sec">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="注册新账号" name="common"></el-tab-pane>
      <el-tab-pane label="绑定已有账号" name="login"></el-tab-pane>
    </el-tabs>
    <el-form ref="form" :rules="formRules" :model="form" label-width="100px">
      <div v-if="activeName === 'common'">
        <el-form-item label="登录名" prop="login">
          <el-input
            v-model="form.login"
            placeholder="您的登录名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="默认密码">
          <div>123123</div>
        </el-form-item>
        <!-- <el-form-item label="设置密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="建议至少用两种字符组合"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordRepeat">
          <el-input
            v-model="form.passwordRepeat"
            placeholder="再次输入密码"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="QQ号码">
          <el-input
            v-model="form.qq"
            placeholder="建议使用常用QQ号码，用于找回密码"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="上级编号">
          <el-input
            v-model="form.parentID"
            placeholder="没有可不填"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </div>
      <div v-if="activeName === 'login'">
        <el-form-item label="登录名" prop="login">
          <el-input
            v-model="form.xlogin"
            placeholder="请输入登录名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入登录密码"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submitForm()">{{
          activeName === 'common' ? '注册并绑定' : '绑定账户'
        }}</el-button>
      </div>
    </el-form>
  </section>
</template>

<script>
import regMixin from '@/mixins/register'
import { randomString } from '@/common/utils'
import { mapState } from 'vuex'

export default {
  layout: 'web',
  mixins: [regMixin],
  created() {
    this.formRules.userName = null
    this.form.login = randomString(10)
  },
  methods: {
    submitForm() {
      if (
        this.activeName === 'login' &&
        (this.form.xlogin.length < 4 || this.form.xlogin.length > 20)
      ) {
        return this.$message.error('登录名长度在4到20个字符')
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.doRegister()
        }
      })
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
          this.$message.success('注册成功，即将跳转')
          if(this.systemStyle.goPage == null || this.systemStyle.goPage == 0){
             this.$router.push('/main')
          }else{
             this.$router.push('/category-list')
          }
          // location.href = '/main'
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
          this.$message.success('绑定成功，即将跳转')
          if(this.systemStyle.goPage == null || this.systemStyle.goPage == 0){
             this.$router.push('/main')
          }else{
             this.$router.push('/category-list')
          }
          // location.href = '/main'
        }
      }
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
