<template>
  <el-dialog
    custom-class="goods-log"
    title="商品操作日志"
    :visible.sync="visible"
    @closed="hide"
  >
    <el-table :data="tableData">
      <el-table-column prop="num" label="平台类型"></el-table-column>
      <el-table-column prop="name" label="操作人"></el-table-column>
      <el-table-column prop="name" label="操作日期"></el-table-column>
      <el-table-column prop="name" label="操作IP"></el-table-column>
      <el-table-column prop="name" label="IP所在地区"></el-table-column>
      <el-table-column prop="name" label="操作类型"></el-table-column>
      <el-table-column prop="name" label="详细"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tableData: []
    }
  },
  methods: {
    async show(goodsId) {
      const res = await this.$axios.get('/goods/goods/logs', { id: goodsId })
      if (res.code === 1001 && res.body) {
      }
      //console.log(res)
    },
    hide() {
      this.tableData = []
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
.goods-log {
  .el-dialog__body {
    padding-top: 0px;
  }
}
</style>
