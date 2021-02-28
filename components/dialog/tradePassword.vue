<template>
  <el-dialog
    custom-class="inp-wrapper d-pw"
    title="修改交易密码"
    width="600px"
    :visible.sync="visible"
    @closed="dialogClose"
  >
    <el-form
      style="padding-right: 50px;"
      ref="form"
      :model="form"
      label-width="130px"
      v-loading="isLoading"
    >
      <el-form-item v-if="hasTradePwd" label="原交易密码：">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="新交易密码：">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <p>必须6位字符及以上，建议数字+字母混合。</p>
      <el-form-item label="确认新交易密码：">
        <el-input type="password" v-model="form.repeatPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="updatePwd" type="primary">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    hasTradePwd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      isLoading: false,
      form: {
        password: '',
        newPassword: '',
        repeatPassword: ''
      }
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    dialogClose() {
      this.visible = false
      setTimeout(() => {
        this.form = {
          password: '',
          newPassword: '',
          repeatPassword: ''
        }
      }, 500)
    },
    async updatePwd() {
      if (
        this.hasTradePwd &&
        (this.form.password.length < 6 || this.form.password.length > 20)
      ) {
        return this.$message.error('旧密码输入错误')
      }
      if (
        this.form.newPassword &&
        (this.form.newPassword.length < 6 || this.form.newPassword.length > 20)
      ) {
        return this.$message.error('新交易密码长度必须在6到20个字符')
      }
      if (this.form.repeatPassword !== this.form.newPassword) {
        return this.$message.error('两次密码输入不一致')
      }
      this.isLoading = true
      const params = {
        userTransactionPassword: this.form.newPassword
      }
      if (this.hasTradePwd) {
        params.oldTransactionPassword = this.form.password
      }
      const res = await this.$axios.post(
        '/user/user/userTransactionPassword',
        null,
        {
          params
        }
      )
      if (res.code === 1001) {
        this.$message.success('修改用户交易密码成功')
        this.dialogClose()
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
.d-pw {
  p {
    margin-left: 135px;
    padding: 10px 0;
    color: $--gray-text-color;
  }
}
</style>
