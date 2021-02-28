<template>
  <div class="whitebg">
    <h3>
      <span>当前位置：我的订单</span>
    </h3>
    <div class="filter">
      <el-button class="query" type="primary" @click="doQuery">查询</el-button>
      <select-filter
        ref="s1"
        name="查询条件"
        :options="selectOptions"
      ></select-filter>
      <check-filter
        ref="c1"
        name="支付状态"
        :options="checkOptions"
      ></check-filter>
      <check-filter
        ref="c2"
        name="支付方式"
        :options="payOptions"
      ></check-filter>
      <date-filter ref="d1"></date-filter>
    </div>
    <section>
      <el-table v-loading="isLoading" :data="tableData" style="width: 100%">
        <el-table-column label="提交时间" width="180">
          <template v-if="row.createTime" slot-scope="{ row }">
            {{ row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="rechargeName" label="支付方式"></el-table-column>
        <el-table-column
          prop="paySn"
          label="商户单号"
          width="210"
        ></el-table-column>
        <el-table-column prop="payMoney" label="支付金额"></el-table-column>
        <el-table-column label="支付状态">
          <template slot-scope="{ row }">
            {{ payMap[row.payState] }}
          </template>
        </el-table-column>
        <el-table-column label="返回或处理备注"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :page-size="query.pageSize"
        :total="dataTotal"
        @current-change="pageChage"
      >
      </el-pagination>
    </section>
    <orderDetailDialog ref="detail"></orderDetailDialog>
  </div>
</template>

<script>
import CheckFilter from '@/components/checkFilter'
import DateFilter from '@/components/dateFilter'
import SelectFilter from '@/components/selectFilter'
import orderDetailDialog from '@/components/orderDetailDialog'
import pageMixin from '@/mixins/page'

const checkOptions = [
  {
    value: '0',
    label: '等待支付'
  },
  {
    value: '1',
    label: '支付失败'
  },
  {
    value: '2',
    label: '支付成功'
  },
  {
    value: '3',
    label: '退款'
  }
]
const payMap = {}
checkOptions.forEach((item) => {
  payMap[item.value] = item.label
})

const selectOptions = [
  {
    type: 'select',
    key: 'type',
    options: [
      {
        value: 'paySn',
        label: '商户单号'
      }
    ]
  },
  { type: 'input', key: 'typeValue', placeholder: '请输入关键字', width: 300 }
]

export default {
  layout: 'webIn',
  components: {
    CheckFilter,
    DateFilter,
    SelectFilter,
    orderDetailDialog
  },
  mixins: [pageMixin],
  async asyncData({ $axios }) {
    let payOptions = []
    const res = await $axios.get('/finance/rechargeMode/getListForClient', {
      params: {
        rechargeType: 1
      }
    })
    if (res.code === 1001 && res.body) {
      payOptions = res.body.map((item) => {
        return { value: item.rechargeModeID, label: item.rechargeName }
      })
    }
    return {
      payOptions
    }
  },
  data() {
    return {
      payMap,
      checkOptions,
      selectOptions,
      isLoading: true,
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.isLoading = true
      const res = await this.$axios.post(
        '/finance/rechargeRecord/recordPage',
        null,
        {
          params: this.query
        }
      )
      if (res.code === 1001 && res.body) {
        this.tableData = res.body.records || []
        this.dataTotal = res.body.total
      }
      this.isLoading = false
    },
    doQuery() {
      const s1val = this.$refs.s1.queryVal()
      const c1val = this.$refs.c1.queryVal()
      const c2val = this.$refs.c1.queryVal()
      const d1val = this.$refs.d1.queryVal()
      const query = {}
      if (s1val.typeValue) {
        query[s1val.type] = s1val.typeValue
      }
      if (c1val) {
        query.payState = c1val
      }
      if (c2val) {
        query.rechargeModeID = c1val
      }
      this.query = Object.assign(this.query, query, d1val)
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  background: #fff;
}
.el-pagination {
  text-align: right;
  padding: 20px;
}
</style>
