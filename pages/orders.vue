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
        name="订单状态"
        :options="checkOptions"
      ></check-filter>
      <date-filter ref="d1"></date-filter>
    </div>
    <section>
      <el-table v-loading="isLoading" :data="tableData" style="width: 100%">
        <el-table-column
          prop="orderCode"
          label="订单号"
          width="180"
        ></el-table-column>
        <el-table-column label="商品名称" width="180">
          <template slot-scope="{ row }">
            <div style="line-height: 16px">{{ row.goodsName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsTypeName" label="类型"></el-table-column>
        <!-- <el-table-column label="数量">
          <template slot-scope="{ row }">
            {{ row.goodsNum || 0 }}
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="购买单价">
          <template slot-scope="{ row }">{{ row.goodsPrice | n3 }}</template>
        </el-table-column> -->
        <el-table-column label="购买总价">
          <template slot-scope="{ row }">{{ row.orderPrice | n3 }}</template>
        </el-table-column>
        <!-- <el-table-column prop="address" label="充值账号"></el-table-column> -->
        <el-table-column
          prop="goodsUserName"
          label="购卡对象"
        ></el-table-column>
        <el-table-column label="购买日期" width="180">
          <template v-if="row.createTime" slot-scope="{ row }">
            {{ row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="250">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary" @click="detailShow(row)">
              {{ row.orderState | stateText }}
            </el-button>
            <el-button size="mini" @click="goComplain(row)">{{row.complaintID ? '查看投诉' : '投诉订单'}}</el-button>
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
import CheckFilter from '@/components/checkFilter'
import DateFilter from '@/components/dateFilter'
import SelectFilter from '@/components/selectFilter'
import orderDetailDialog from '@/components/orderDetailDialog'
import pageMixin from '@/mixins/page'

const checkOptions = [
  {
    value: '1',
    label: '等待处理'
  },
  {
    value: '2',
    label: '正在处理'
  },
  {
    value: '3',
    label: '交易成功'
  },
  {
    value: '4',
    label: '交易取消'
  }
]

const selectOptions = [
  {
    type: 'select',
    key: 'type',
    options: [
      {
        value: 'orderCode',
        label: '订单号'
      },
      {
        value: 'goodsName',
        label: '商品名称'
      },
      {
        value: 'goodsTypeName',
        label: '商品类型'
      },
      {
        value: 'cardNumber',
        label: '卡号和卡密'
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
  data() {
    return {
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
      const res = await this.$axios.post('/order/order/myOrder', null, {
        params: this.query
      })
      if (res.code === 1001 && res.body) {
        this.tableData = res.body.records || []
        this.dataTotal = res.body.total
      }
      this.isLoading = false
    },
    doQuery() {
      const s1val = this.$refs.s1.queryVal()
      const c1val = this.$refs.c1.queryVal()
      const d1val = this.$refs.d1.queryVal()
      const query = {}
      if (s1val.typeValue) {
        query[s1val.type] = s1val.typeValue
      }
      if (c1val) {
        query.status = c1val
      }
      this.query = Object.assign(this.query, query, d1val)
      this.getList()
    },
    async detailShow(item) {
      const res = await this.$axios.get(
        `/order/order/orderDetails?orderID=${item.orderID}`
      )
      if (res.code === 1001 && res.body) {
        this.$refs.detail.show(res.body)
      }
    },
    goComplain(order) {
      if (order.complaintID) {
        location.href = '/complain-detail?complaintID=' + order.complaintID
        return
      }
      this.$confirm(
        '“卡密平台”仅为系统服务商，不参与商户经营，您与商户产生纠纷，请自行协商解决，但“卡密平台”不允许商户出售违法违规商品，一旦您发现商户出售该等商品，可向执法机关举报，也可向“卡密平台”投诉，投诉方式：tousu.xxxx.com，“卡密平台”将保留相关证据并呈交给执法机关！',
        '提示',
        {
          confirmButtonText: '我知道了',
          showCancelButton: false,
          type: 'warning'
        }
      ).then(() => {
        location.href = `/complain-submit?orderID=${order.orderID}&orderCode=${order.orderCode}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  background: #fff;
}
.tip {
  font-size: 12px;
  padding: 10px 15px;
  background: white;
  color: $--basic-orange;
}
.el-pagination {
  text-align: right;
  padding: 20px;
}
</style>
