<template>
  <el-dialog
    custom-class="d-log"
    title="登录日志"
    :visible.sync="visible"
    @closed="dialogClose"
  >
    <el-table :data="tableData">
      <el-table-column prop="num" label="时间"></el-table-column>
      <el-table-column prop="name" label="地点"></el-table-column>
      <el-table-column prop="name" label="类型/模版"></el-table-column>
      <el-table-column prop="name" label="目录"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}]
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

<style lang="scss">
.d-log {
  .el-dialog__body {
    padding-top: 0px;
  }
}
</style>
