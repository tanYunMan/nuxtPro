<template>
  <div>
    <h3>
      <span>当前位置：销售入账明细</span>
    </h3>
    <div class="filter">
      <el-button class="query" type="primary">查询</el-button>
      <select-filter name="关键字搜索" :options="searchOptions"></select-filter>
      <date-filter :date="date"></date-filter>
    </div>
    <section>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column
          label="选择"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column prop="num" label="销售时间"></el-table-column>
        <el-table-column prop="name" label="商品"></el-table-column>
        <el-table-column prop="name" label="商品类型"></el-table-column>
        <el-table-column prop="name" label="购买客户"></el-table-column>
        <el-table-column prop="name" label="数量"></el-table-column>
        <el-table-column prop="name" label="售价"></el-table-column>
        <el-table-column prop="name" label="总价"></el-table-column>
        <el-table-column prop="name" label="已退款"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import SelectFilter from '@/components/selectFilter'
import DateFilter from '@/components/dateFilter'

export default {
  layout: 'webIn',
  components: {
    SelectFilter,
    DateFilter
  },
  data() {
    return {
      searchOptions: [
        { type: 'input', placeholder: '请输入商品编号', width: 300 },
        { type: 'input', placeholder: '请输入客户编号', width: 300 }
      ],
      date: '',
      number: '',
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  methods: {
    handleSelectionChange(val) {}
  }
}
</script>
