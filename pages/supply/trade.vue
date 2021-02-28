<template>
  <div>
    <h3>
      <span>当前位置：供货交易明细</span>
    </h3>
    <div class="filter">
      <el-button class="query" type="primary">查询</el-button>
      <select-filter name="关键字搜索" :options="searchOptions"></select-filter>
      <check-filter name="查询类型" :options="checkOptions"></check-filter>
      <check-filter name="商品类型" :options="checkTypeOptions"></check-filter>
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
            },
            {
              label: '商品编号',
              value: '4'
            },
            {
              label: '买家编号',
              value: '5'
            },
            {
              label: '卡号',
              value: '6'
            },
            {
              label: '密码',
              value: '7'
            },
            {
              label: '处理人',
              value: '8'
            },
            {
              label: '退款人',
              value: '9'
            }
          ]
        },
        { type: 'input', placeholder: '请输入关键字', width: 200 }
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
        },
        {
          value: '6',
          label: '申请退款'
        }
      ],
      checkTypeOptions: [
        {
          value: '1',
          label: '卡密'
        },
        {
          value: '2',
          label: '选号'
        },
        {
          value: '3',
          label: '人工代充'
        },
        {
          value: '4',
          label: '帐号直冲'
        },
        {
          value: '5',
          label: '卡密直冲'
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
