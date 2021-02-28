<template>
  <div>
    <h3>
      <span>当前位置：投诉信息列表</span>
      <!-- <el-button size="mini" type="primary" @click="submit">提交投诉</el-button> -->
    </h3>
    <section class="tip">
      特别提示
      “卡密平台”仅为系统服务商，不参与商户经营，您与商户产生纠纷，请自行协商解决，但“卡密平台”不允许商户出售违法违规商品，一旦您发现商户出售该等商品，可向执法机关举报，也可向“卡密平台”投诉，投诉方式：tousu.xxxx.com，“卡密平台”将保留相关证据并呈交给执法机关！
    </section>
    <el-button class="query" type="primary" @click="doQuery">查询</el-button>
    <select-filter
      name="查询条件"
      ref="s1"
      :options="selectOptions"
    ></select-filter>
    <section class="list">
      <el-table :data="tableData" v-loading="isLoading" style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="投诉时间">
          <template slot-scope="{ row }">
            {{ row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="themeName" label="投诉主题"></el-table-column>
        <el-table-column label="订单号">
          <template slot-scope="{ row }">
            <span class="order" @click="showDetail(row.orderID)">{{
              row.order ? row.order.orderCode : ''
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理状态">
          <template slot-scope="{ row }">
            <a :href="`/complain-detail?complaintID=${row.complaintID}`">
              <el-button
                size="mini"
                :type="
                  row.complaintState === 2 || row.complaintState === 3
                    ? 'primary'
                    : 'danger'
                "
              >
                {{ row.complaintState | complainStateText }}
              </el-button></a
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
    <el-dialog
      custom-class="complain-dialog"
      title="请选择投诉类型"
      width="500px"
      :visible.sync="complainVisible"
      @closed="dialogClose"
    >
      <el-row>
        <el-col>
          <span>虚拟订单类：</span>错卡、充值不到帐等问题，请选择此类型</el-col
        >
      </el-row>
      <el-row>
        <el-col>
          <span>建议投诉类：</span
          >对我们的服务及建议投诉等，请选择此类型</el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6">
          <a href="/complain-submit?type=order">
            <el-button type="primary">虚拟订单类</el-button>
          </a>
        </el-col>
        <el-col :span="6">
          <a href="/complain-submit?type=suggest">
            <el-button type="primary">建议投诉类</el-button>
          </a>
        </el-col>
      </el-row>
    </el-dialog>
    <orderDetailDialog ref="detail"></orderDetailDialog>
  </div>
</template>

<script>
import SelectFilter from '@/components/selectFilter'
import orderDetailDialog from '@/components/orderDetailDialog'
import pageMixin from '@/mixins/page'

export default {
  layout: 'webIn',
  components: {
    SelectFilter,
    orderDetailDialog
  },
  mixins: [pageMixin],
  data() {
    return {
      selectOptions: [
        { type: 'input', key: 'ThemeName', placeholder: '请输入投诉主题' },
        {
          type: 'select',
          key: 'ComplaintState',
          options: [
            {
              value: '',
              label: '查询全部'
            },
            {
              value: '1',
              label: '尚未处理'
            },
            {
              value: '2',
              label: '已经完成'
            },
            {
              value: '3',
              label: '处理完成'
            },
            {
              value: '4',
              label: '无法处理'
            }
          ]
        }
      ],
      tableData: [],
      isLoading: true,
      complainVisible: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.isLoading = true
      const res = await this.$axios.post(
        '/order/complaint/complaintPage',
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
      const s1val = this.$refs.s1.queryVal()
      this.query = Object.assign(this.query, s1val)
      this.getList()
    },
    submit() {
      this.complainVisible = true
    },
    dialogClose() {
      this.complainVisible = false
    },
    async showDetail(orderID) {
      const res = await this.$axios.get(
        `/order/order/orderDetails?orderID=${orderID}`
      )
      if (res.code === 1001 && res.body) {
        this.$refs.detail.show(res.body)
      }
    }
  }
}
</script>

<style lang="scss">
.complain-dialog {
  .el-row {
    padding: 15px;
    .el-col {
      & > span:first-child {
        color: $--color-primary;
      }
    }
    .el-col-6 {
      min-width: 150px;
    }
  }
}
</style>

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
.order {
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: $--color-primary;
  }
}
.list {
  background: #fff;
  .el-pagination {
    text-align: right;
    padding: 20px;
  }
}
</style>
