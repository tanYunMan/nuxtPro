<template>
  <el-dialog
    custom-class="inp-wrapper d-pw"
    title="发送短信"
    :visible.sync="visible"
    @closed="dialogClose"
  >
    <ul>
      <li>
        <span>短信接收人类型：</span>
        <el-checkbox-group
          v-model="checkList"
          style="margin-left: 15px; display: inline-block"
        >
          <el-checkbox label="平台管理员"></el-checkbox>
          <el-checkbox label="具体客户"></el-checkbox>
          <el-checkbox label="下级客户"></el-checkbox>
        </el-checkbox-group>
      </li>
      <li>
        <span>短信主题：</span>
        <el-input></el-input>
      </li>
      <li>
        <span>短信内容：</span>
        <el-input type="textarea"></el-input>
      </li>
    </ul>
    <el-button type="primary">确认发送</el-button>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      checkList: []
    }
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
