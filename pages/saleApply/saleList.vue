<template>
  <div>
    <h3>
      <span>当前位置：未转余额申请列表</span>
    </h3>
    <!-- <section class="search">
      <el-input
        v-model="searchText"
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="doSearch"
        ></el-button>
      </el-input>
    </section>-->
    <section class="goods">
      <el-table v-loading="isLoading" :data="tableData">
        <el-table-column prop="userID" label="用户编号"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="applyTime" label="申请时间"></el-table-column>
        <el-table-column prop="fee" label="手续费"></el-table-column>
        <el-table-column prop="statu" label="状态">
          <template slot-scope="{row}">
            <el-tag type="info" v-if="row.statu === 1">待审核</el-tag>
            <el-tag type="success" v-if="row.statu === 2">成功</el-tag>
            <el-tag type="danger" v-if="row.statu === 3">失败</el-tag>
          </template>
        </el-table-column>
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
      this.$axios
        .post('/finance/saleMoneyApply/page', this.query)
        .then((res) => {
          this.tableData = res.body.records
          this.query.totalCount = res.body.total
          this.isLoading = false
        })
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
  .el-input {
    width: 400px;
  }
}
.goods {
  background: white;
  .el-pagination {
    text-align: right;
    padding: 20px;
  }
}
</style>
