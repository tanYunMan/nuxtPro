<template>
  <div>
    <h3>
      <span>当前位置：提现记录</span>
      <div class="sub-nav">
        <a href="/withdraw">申请提现</a>
        <a href="/withdraw-way">提现方式</a>
        <a class="selected">提现记录</a>
      </div>
    </h3>
    <div class="filter">
      <el-button class="query" type="primary" @click="doQuery">查询</el-button>
      <select-filter
        ref="s1"
        name="查询条件"
        :options="selectOptions"
      ></select-filter>
      <date-filter ref="d1"></date-filter>
    </div>
    <section>
      <el-table v-loading="isLoading" :data="tableData" style="width: 100%">
        <el-table-column prop="cashNumber" label="序号"></el-table-column>
        <el-table-column label="申请时间">
          <template v-if="row.askDate" slot-scope="{ row }">
            {{ row.askDate | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="money" label="提现金额"></el-table-column>
        <el-table-column prop="fee" label="手续费"></el-table-column>
        <el-table-column label="处理时间">
          <template v-if="row.dealDate" slot-scope="{ row }">
            {{ row.dealDate | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="处理状态">
          <template slot-scope="{ row }">
            <span v-if="row.cashState === 1">审核中</span>
            <span v-if="row.cashState === 2">提现中</span>
            <span v-if="row.cashState === 3">提现完成</span>
            <span v-if="row.cashState === 4">审核失败</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.cashState !== 2"
              size="small"
              type="danger"
              @click="del(row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
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
  </div>
</template>

<script>
import pageMixin from '@/mixins/page'
import DateFilter from '@/components/dateFilter'
import SelectFilter from '@/components/selectFilter'

const selectOptions = [
  {
    type: 'select',
    key: 'type',
    options: [
      {
        value: 'cashNumber',
        label: '提现单号'
      }
    ]
  },
  { type: 'input', key: 'typeValue', placeholder: '请输入关键字', width: 300 }
]

export default {
  layout: 'webIn',
  components: {
    DateFilter,
    SelectFilter
  },
  mixins: [pageMixin],
  data() {
    return {
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
      const res = await this.$axios.post('/finance/cash/cashPage', null, {
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
      const d1val = this.$refs.d1.queryVal()
      const query = {}
      if (s1val.typeValue) {
        query[s1val.type] = s1val.typeValue
      }
      this.query = Object.assign(this.query, query, d1val)
      this.getList()
    },
    del(data) {
      this.$confirm('确认删除提现记录？', '提示').then(() => {
        this.doDelete(data.cashID)
      })
    },
    async doDelete(cashID) {}
  }
}
</script>

<style lang="scss" scoped>
.sub-nav {
  float: right;
  a {
    float: none;
    display: inline-block;
    text-decoration: none;
    color: $--deep-gray-text-color;
    &:hover {
      color: $--color-primary;
    }
    &.selected {
      line-height: 34px;
      color: $--color-primary;
      border-bottom: 2px solid $--color-primary;
    }
  }
  a + a {
    margin: 0 0 0 15px;
  }
}
section {
  padding: 15px;
  background: white;
}
</style>
