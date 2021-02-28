<template>
  <div>
    <h3>
      <span>当前位置：未转余额申请记录</span>
      <a href="/supply/balance-list">
        <el-button type="primary">申请记录</el-button>
      </a>
      <a href="/supply/balance">
        <el-button>未转余额申请</el-button>
      </a>
    </h3>
    <section>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column prop="num" label="提交时间"></el-table-column>
        <el-table-column prop="name" label="申请金额"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
        <el-table-column prop="name" label="处理人"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'webIn',
  data() {
    return {
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  }
}
</script>
