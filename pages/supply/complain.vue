<template>
  <div>
    <h3>
      <span>当前位置：订单投诉处理</span>
      <a href="/supply-complain-list">
        <el-button>订单投诉处理</el-button>
      </a>
      <a href="/supply-complain">
        <el-button type="primary">投诉处理明细</el-button>
      </a>
    </h3>
    <section>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column
          label="选择"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column prop="num" label="投诉时间"></el-table-column>
        <el-table-column prop="name" label="投诉客户"></el-table-column>
        <el-table-column prop="name" label="投诉主题"></el-table-column>
        <el-table-column prop="name" label="订单号"></el-table-column>
        <el-table-column prop="name" label="处理状态"></el-table-column>
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
