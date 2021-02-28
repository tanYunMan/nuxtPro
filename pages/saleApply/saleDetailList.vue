<template>
  <div>
    <h3>
      <span>当前位置：交易明细</span>
    </h3>
    <section class="search">
      <el-form :model="query" label-width="80px" :inline="true" size="small">
        <el-form-item>
          <el-input v-model="query.userName" clearble placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.goodsName" clearble placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.orderCode" clearble placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.transactionType" placeholder="交易类型" clearable>
            <el-option label="供货销售" :value="10"></el-option>
            <el-option label="供货退款" :value="11"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="query.queryTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="goods">
      <el-table v-loading="isLoading" :data="tableData">
        <el-table-column prop="orderCode" label="订单号"></el-table-column>
        <el-table-column prop="transactionType" label="交易类型">
          <template slot-scope="{row}">
            <el-tag type="info" size="small"  effect="dark" v-if="row.transactionType === 10">供货销售</el-tag>
            <el-tag type="info" size="small"  effect="dark" v-if="row.transactionType === 11">供货退款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="createTime" label="交易时间"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :page-size="query.pageSize"
        :total="query.totalCount"
        @current-change="pageChage"
      ></el-pagination>
    </section>
  </div>
</template>

<script>
import pageMixin from '@/mixins/page'

export default {
  layout: 'webIn',
  mixins: [pageMixin],
  data() {
    return {
      isLoading: true,
      tableData: [],
      query: {
        pageSize: 20,
        pageNum: 1,
        totalCount: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.isLoading = true
      if (this.query.queryTime) {
        this.query.beginTime = this.query.queryTime[0]
        this.query.endTime = this.query.queryTime[1]
      } else {
        this.query.beginTime = null
        this.query.endTime = null
      }
      this.$axios.post('/finance/supplyMoney/page', this.query).then((res) => {
        this.tableData = res.body.records
        this.query.totalCount = res.body.total
        this.isLoading = false
      })
    },
    search() {
      this.query.pageNum = 1
      this.getList()
    },
    pageChange(val) {
      this.query.pageNum = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
section + section {
  margin-top: 15px;
}
.search {
  padding: 10px 15px;
  background: white;
}
.goods {
  background: white;
  .el-pagination {
    text-align: right;
    padding: 20px;
  }
}
</style>
