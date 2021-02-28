<template>
  <div>
    <h3>
      <span>当前位置：订单处理明细</span>
      <a href="/supply-orders-list">
        <el-button type="primary">订单处理明细</el-button>
      </a>
      <a href="/supply-orders">
        <el-button>手工订单列表</el-button>
      </a>
    </h3>
    <div class="filter">
      <el-button class="query" type="primary">查询</el-button>
      <select-filter name="关键字搜索" :options="searchOptions"></select-filter>
      <check-filter name="查询类型" :options="checkOptions"></check-filter>
      <date-filter :date="date"></date-filter>
    </div>
    <section>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column
          label="选择"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column prop="num" label="编号"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="name" label="类型/模版"></el-table-column>
        <el-table-column prop="name" label="目录"></el-table-column>
        <el-table-column prop="name" label="面值"></el-table-column>
        <el-table-column prop="name" label="成本价"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
        <el-table-column prop="name" label="移动"></el-table-column>
        <el-table-column prop="name" label="手续费"></el-table-column>
        <el-table-column prop="name" label="库存操作"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import SelectFilter from '@/components/selectFilter'
import CheckFilter from '@/components/checkFilter'
import DateFilter from '@/components/dateFilter'

export default {
  layout: 'webIn',
  components: {
    SelectFilter,
    CheckFilter,
    DateFilter
  },
  data() {
    return {
      searchOptions: [
        {
          type: 'select',
          options: [
            {
              label: '购买订单号',
              value: '1'
            },
            {
              label: '充值帐号',
              value: '2'
            },
            {
              label: '商品名称',
              value: '3'
            }
          ]
        },
        { type: 'input', placeholder: '请输入关键字', width: 200 },
        { type: 'input', placeholder: '请输入进货商编号', width: 200 },
        { type: 'input', placeholder: '请输入商品编号', width: 200 }
      ],
      checkOptions: [
        {
          value: '1',
          label: '等待处理'
        },
        {
          value: '2',
          label: '处理中'
        },
        {
          value: '3',
          label: '交易成功'
        },
        {
          value: '4',
          label: '交易失败'
        },
        {
          value: '5',
          label: '成功已退款'
        }
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

<style lang="scss" scoped></style>
