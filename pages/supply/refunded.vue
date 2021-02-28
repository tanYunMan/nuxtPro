<template>
  <div>
    <h3>
      <span>当前位置：已退款订单列表</span>
    </h3>
    <section>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column
          label="选择"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column prop="num" label="商品"></el-table-column>
        <el-table-column prop="name" label="数量"></el-table-column>
        <el-table-column prop="name" label="购买客户"></el-table-column>
        <el-table-column prop="name" label="充值帐号"></el-table-column>
        <el-table-column prop="name" label="充值密码"></el-table-column>
        <el-table-column prop="name" label="备注"></el-table-column>
        <el-table-column prop="name" label="提交时间"></el-table-column>
        <el-table-column prop="name" label="状态详细"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'webIn',
  data() {
    return {
      number: '',
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  methods: {
    handleSelectionChange(val) {}
  }
}
</script>

<style lang="scss" scoped>
section + section {
  margin-top: 15px;
}
</style>
