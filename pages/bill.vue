<template>
  <div>
    <h3>
      <span>当前位置：我的明细</span>
    </h3>
    <el-button class="query" type="primary" @click="doQuery">查询</el-button>
    <date-filter ref="d1"></date-filter>
    <section class="bill">
      <el-table v-loading="isLoading" :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="交易日期" width="180">
          <template slot-scope="{ row }">
            {{ row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="transactionTypeName"
          label="交易类型"
          width="180"
        ></el-table-column>
        <el-table-column label="收入（元）">
          <template slot-scope="{ row }">
            <span
              v-if="
                row.transactionType === 2 ||
                  row.transactionType === 3 ||
                  row.transactionType === 4 ||
                  row.transactionType === 6
              "
              >{{ row.money }}</span
            >
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column label="支出（元）">
          <template slot-scope="{ row }">
            <span
              v-if="
                row.transactionType === 1 ||
                  row.transactionType === 5 ||
                  row.transactionType === 7
              "
              >{{ row.money }}</span
            >
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="beforeMoney"
          label="变化前（元）"
        ></el-table-column>
        <el-table-column prop="endMoney" label="变化后（元）"></el-table-column>
        <el-table-column label="账号对象">
          <template>总账号</template>
        </el-table-column>
        <el-table-column label="详细">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.orderID"
              type="primary"
              size="mini"
              @click="detail(row)"
              >详细</el-button
            >
          </template>
        </el-table-column>
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
import DateFilter from '@/components/dateFilter'
import pageMixin from '@/mixins/page'
import orderDetailDialog from '@/components/orderDetailDialog'

export default {
  layout: 'webIn',
  components: {
    DateFilter,
    orderDetailDialog
  },
  mixins: [pageMixin],
  data() {
    return {
      selectOptions: [
        { type: 'input', key: 'orderCode', placeholder: '请输入订单号码' },
        {
          type: 'select',
          key: 'transactionType',
          options: [
            {
              value: '',
              label: '查询全部'
            },
            {
              value: '1',
              label: '订单扣款'
            },
            {
              value: '2',
              label: '订单退款'
            },
            {
              value: '3',
              label: '充值到账'
            },
            {
              value: '4',
              label: '前台加款'
            },
            {
              value: '5',
              label: '前台减款'
            },
            {
              value: '6',
              label: '管理员加款'
            },
            {
              value: '7',
              label: '管理员减款'
            }
          ]
        }
      ],
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
        '/finance/userMoneyDetail/detailPage',
        null,
        { params: this.query }
      )
      if (res.code === 1001 && res.body) {
        this.tableData = res.body.records || []
        this.dataTotal = res.body.total
      }
      this.isLoading = false
    },
    doQuery() {
      const d1val = this.$refs.d1.queryVal()
      this.query = Object.assign(this.query, d1val)
      this.getList()
    },
    async detail(item) {
      const res = await this.$axios.get(
        `/order/order/orderDetails?orderCode=${item.orderID}`
      )
      if (res.code === 1001 && res.body) {
        this.$refs.detail.show(res.body)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  font-size: 12px;
  padding: 10px 15px;
  background: white;
  color: $--basic-orange;
  margin-bottom: 15px;
}
section + section {
  margin-top: 15px;
}
.bill {
  background: white;
  .el-pagination {
    text-align: right;
    padding: 20px;
  }
}
</style>
