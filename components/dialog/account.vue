<template>
  <el-dialog
    custom-class="inp-wrapper d-account"
    title="修改账户资料"
    width="600px"
    :visible.sync="visible"
    @closed="dialogClose"
  >
    <el-form
      style="padding-right: 50px;"
      ref="form"
      :model="form"
      label-width="120px"
    >
      <!-- <el-form-item label="手机号码：">
        <el-input v-model="form.a"></el-input>
      </el-form-item>
      <el-form-item label="公司名称：">
        <el-input v-model="form.b"></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="form.c"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：">
        <el-input v-model="form.d"></el-input>
      </el-form-item> -->
      <el-form-item label="联系QQ：">
        <el-input v-model="form.e"></el-input>
      </el-form-item>
      <el-form-item label="联系地址：">
        <el-input v-model="form.f"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return { visible: false, form: {} }
  },
  methods: {
    show() {
      this.visible = true
    },
    dialogClose() {
      this.visible = false
    }
  }
}
</script>
