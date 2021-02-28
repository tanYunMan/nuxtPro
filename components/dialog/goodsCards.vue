<template>
  <el-dialog
    custom-class="gc-dialog"
    title="查看商品库存"
    :visible.sync="visible"
    @closed="hide"
  >
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column
        label="选择"
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column prop="cardNumber" label="卡号"></el-table-column>
      <el-table-column prop="cardPws" label="密码"></el-table-column>
      <el-table-column prop="" label="导入时间"></el-table-column>
      <el-table-column label="到期时间">
        <template slot-scope="{ row }">
          {{ row.createTime | validDate }}
        </template>
      </el-table-column>
      <el-table-column prop="supplier" label="供货商"></el-table-column>
      <el-table-column prop="price" label="备注价格"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      :page-size="query.pageSize"
      :total="dataTotal"
      @current-change="pageChage"
    >
    </el-pagination>
    <el-button size="small" type="primary">显示密码</el-button>
    <el-button size="small" type="primary">导出卡密</el-button>
    <el-button size="small" type="danger" @click="deleteCards"
      >删除卡密</el-button
    >
  </el-dialog>
</template>

<script>
import pageMixin from '@/mixins/page'

export default {
  mixins: [pageMixin],
  data() {
    return {
      visible: false,
      tableData: [],
      query: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    show(goodsId) {
      this.visible = true
      this.query.goodsID = goodsId
      setTimeout(() => {
        this.getList()
      })
    },
    async getList() {
      const res = await this.$axios.get('/goods/card/page', this.query)
      if (res.code === 1001 && res.body) {
        this.dataTotal = res.body.total
        const tableData = res.body.records || []
        this.tableData = tableData
      }
    },
    hide() {
      this.query.goodsID = 0
      this.tableData = []
      this.visible = false
    },
    deleteCards() {
      const ids = this.selectIds('cardID')
      if (ids.length > 0) {
        console.log(ids)
      } else {
        this.$message.error('请勾选要删除的卡密')
      }
    }
  }
}
</script>

<style lang="scss">
.gc-dialog {
  min-width: 800px;
  .el-pagination {
    text-align: right;
  }
}
</style>
