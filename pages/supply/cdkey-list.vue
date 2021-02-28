<template>
  <div>
    <h3>
      <span>当前位置：卡密商品库存管理</span>
    </h3>
    <el-button class="query" type="primary">查询</el-button>
    <select-filter name="条件筛选" :options="options"></select-filter>
    <section class="goods-list">
      <el-table :data="tableData">
        <el-table-column
          prop="goodsName"
          width="150"
          label="商品名称"
        ></el-table-column>
        <el-table-column prop="goodsValue" label="面值"></el-table-column>
        <el-table-column label="类型">
          <template>
            <span class="goods-type">卡密</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="库存价值"></el-table-column>
        <el-table-column prop="name" label="报警数"></el-table-column>
        <el-table-column prop="name" label="导入数"></el-table-column>
        <el-table-column prop="name" label="销售数"></el-table-column>
        <el-table-column prop="name" label="删除数"></el-table-column>
        <el-table-column prop="name" label="库存数"></el-table-column>
        <el-table-column prop="name" label="状态说明"></el-table-column>
        <el-table-column width="70" label="定价">
          <template>
            <span class="btn">定价</span>
          </template>
        </el-table-column>
        <el-table-column width="70" label="导卡">
          <template slot-scope="scope">
            <span class="btn" @click="importCards(scope.row)">导卡</span>
          </template>
        </el-table-column>
        <el-table-column width="70" label="管理卡密">
          <template slot-scope="scope">
            <span class="btn" @click="lookCards(scope.row)">管理</span>
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
    <goods-cards-import-dialog ref="cardsImport"></goods-cards-import-dialog>
    <goods-cards-dialog ref="cards"></goods-cards-dialog>
  </div>
</template>

<script>
import SelectFilter from '@/components/selectFilter'
import { options } from '@/constants/cdkey'
import pageMixin from '@/mixins/page'
import GoodsCardsImportDialog from '@/components/dialog/goodsCardsImport'
import GoodsCardsDialog from '@/components/dialog/goodsCards'

export default {
  layout: 'webIn',
  components: {
    SelectFilter,
    GoodsCardsImportDialog,
    GoodsCardsDialog
  },
  mixins: [pageMixin],
  data() {
    return {
      options,
      tableData: []
    }
  },
  mounted() {
    this.query.goodsTypeID = 1
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/goods/goods/goodsPage', this.query)
      if (res.code === 1001 && res.body) {
        this.tableData = res.body.records
        this.dataTotal = res.body.total
      }
    },
    importCards(data) {
      this.$refs.cardsImport.show(data)
    },
    lookCards(data) {
      this.$refs.cards.show(data.goodsID)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  min-height: 792px;
  background: white;
  .btn {
    padding: 0 8px;
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
    & + .btn {
      border-left: 1px solid #606266;
    }
  }
  .goods-type {
    font-weight: 600;
    color: $--color-primary;
  }
  .el-pagination {
    text-align: right;
    padding: 20px;
  }
}
</style>
