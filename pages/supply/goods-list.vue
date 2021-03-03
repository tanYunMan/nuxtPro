<template>
  <div>
    <h3>
      <span>当前位置：供货商品管理</span>
      <a href="/supply-publish">
        <el-button type="primary">发布供货商品</el-button>
      </a>
    </h3>
    <div class="filter">
      <el-button class="query" type="primary" @click="doQuery">查询</el-button>
      <select-filter
        ref="s1"
        name="关键字搜索"
        :options="searchOptions"
      ></select-filter>
      <select-filter
        ref="s2"
        name="条件筛选"
        :options="options"
      ></select-filter>
    </div>
    <section class="handle">
      <el-button @click="stateChange(1)">销售</el-button>
      <el-button @click="stateChange(0)">暂停</el-button>
      <el-button @click="stateChange(2)">禁售</el-button>
      <el-button @click="setCagetory">设定目录</el-button>
      <el-button @click="positionMove">移动商品</el-button>
      <!-- <el-button>模版类型</el-button> -->
      <el-button @click="batchPrice">批量定价</el-button>
      <!-- <el-button>商品颜色</el-button> -->
      <el-button @click="recommends">推荐商品</el-button>
      <!-- <el-button>注意事项</el-button> -->
      <!-- <el-button>超时退款</el-button> -->
      <el-button type="danger" @click="deleteGoods">删除</el-button>
    </section>
    <section class="goods-list">
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column
          label="选择"
          type="selection"
          width="40"
        ></el-table-column>
        <el-table-column
          width="50"
          prop="goodsID"
          label="编号"
        ></el-table-column>
        <el-table-column width="150" label="商品名称">
          <template slot-scope="scope">
            <span
              :style="{
                color: scope.row.color || '',
                fontWeight: scope.row.isBlod ? 600 : 400
              }"
              >{{ scope.row.goodsName }}({{
                scope.row.goodsState ? '正常' : '等待审核'
              }})</span
            >
          </template>
        </el-table-column>
        <el-table-column
          :formatter="goodsType"
          label="类型/模版"
        ></el-table-column>
        <el-table-column>
          <template slot="header">
            <el-checkbox @change="categoryDisplay"></el-checkbox>
            <span class="category-check">目录</span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsValue" label="面值"></el-table-column>
        <el-table-column prop="name" label="成本价"></el-table-column>
        <el-table-column :formatter="goodsState" label="状态"></el-table-column>
        <el-table-column width="100" label="移动">
          <div class="sort">
            <i class="el-icon-upload2"></i>
            <i class="el-icon-top"></i>
            <i class="el-icon-bottom"></i>
            <i class="el-icon-download"></i>
          </div>
        </el-table-column>
        <el-table-column prop="name" label="手续费"></el-table-column>
        <el-table-column width="120" label="库存操作">
          <template slot-scope="scope">
            <span class="btn" @click="importCards(scope.row)">导卡</span>
            <span class="btn" @click="lookCards(scope.row)">查看</span>
          </template>
        </el-table-column>
        <el-table-column width="240" label="操作">
          <template slot-scope="scope">
            <span class="btn" @click="batchPrice(scope.row)">定价</span>
            <span class="btn" @click="handleEdit(scope.row)">编辑</span>
            <span class="btn" @click="showLog(scope.row)">日志</span>
            <span class="btn" @click="deleteGoods(scope.row)">删除</span>
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
    <goods-category-dialog ref="category"></goods-category-dialog>
    <goods-logs-dialog ref="logs"></goods-logs-dialog>
    <goods-cards-import-dialog ref="cardsImport"></goods-cards-import-dialog>
    <goods-cards-dialog ref="cards"></goods-cards-dialog>
    <goods-price-dialog ref="price"></goods-price-dialog>
  </div>
</template>

<script>
import SelectFilter from '@/components/selectFilter'
import { options, searchOptions } from '@/constants/goods'
import GoodsCategoryDialog from '@/components/dialog/goodsCategory'
import GoodsLogsDialog from '@/components/dialog/goodsLogs'
import GoodsCardsImportDialog from '@/components/dialog/goodsCardsImport'
import GoodsCardsDialog from '@/components/dialog/goodsCards'
import GoodsPriceDialog from '@/components/dialog/goodsPrice'
import pageMixin from '@/mixins/page'

export default {
  layout: 'webIn',
  components: {
    SelectFilter,
    GoodsCategoryDialog,
    GoodsLogsDialog,
    GoodsCardsImportDialog,
    GoodsCardsDialog,
    GoodsPriceDialog
  },
  mixins: [pageMixin],
  data() {
    return {
      searchOptions,
      options,
      tableData: [],
      idKey: 'goodsID'
    }
  },
  mounted() {
    this.getType()
    this.getList()
  },
  methods: {
    async getType() {
      this.typeMap = {}
      const res = await this.$axios.get('/goods/goods/getGoodsTypeList')
      if (res.code === 1001 && res.body) {
        const typeList = res.body
        typeList.forEach((item) => {
          this.options[0].options.push({
            label: item.text,
            value: item.key
          })
          this.typeMap[item.key] = item.text
        })
      }
    },
    doQuery() {
      const s1val = this.$refs.s1.queryVal()
      const s2val = this.$refs.s2.queryVal()
      this.query = Object.assign(this.query, s1val, s2val)
      this.getList()
    },
    async getList() {
      const res = await this.$axios.post('/goods/goods/goodsPage', null, {
        params: this.query
      })
      if (res.code === 1001 && res.body) {
        this.tableData = res.body.records || []
        this.dataTotal = res.body.total
      }
    },
    goodsType(item) {
      return item.goodsTypeID ? this.typeMap[item.goodsTypeID] : '其他'
    },
    goodsState(item) {
      if (item.goodsState === 0) {
        return '暂停'
      } else if (item.goodsState === 1) {
        return '销售'
      } else {
        return '禁售'
      }
    },
    async stateChange(state) {
      const ids = this.selectIds()
      if (ids.length > 0) {
        const res = await this.$axios.post(
          '/goods/goods/updateGoodsStateBatch',
          null,
          {
            params: {
              ids: ids.join(','),
              goodsState: state
            }
          }
        )
        if (res.code === 1001) {
          this.getList()
        }
      } else {
        this.$message.error('请勾选商品')
      }
    },
    setCagetory() {
      const ids = this.selectIds()
      if (ids.length > 0) {
        this.$refs.category.show(ids)
      } else {
        this.$message.error('请勾选商品')
      }
    },
    categoryDisplay(val) {
      const ids = []
      this.tableData.forEach((item) => {
        ids.push(item.catalogID)
      })
      //console.log(ids)
    },
    positionMove() {
      const ids = this.selectIds()
      if (ids.length > 0) {
      } else {
        this.$message.error('请勾选商品')
      }
    },
    batchPrice(data) {
      let ids = []
      if (data && data.goodsID) {
        ids = [data.goodsID]
      } else {
        ids = this.selectIds()
      }
      if (ids.length > 0) {
        this.$refs.price.show(ids)
      } else {
        this.$message.error('请勾选商品')
      }
    },
    recommends() {
      const ids = this.selectIds()
      if (ids.length > 0) {
        this.$confirm('确认推荐商品？', '提示').then(() => {
          this.$axios
            .post('/goods/goods/addRecommendGoodsBatch', null, {
              params: {
                ids: ids.join(',')
              }
            })
            .then((res) => {
              this.$message.success('设置推荐成功')
            })
        })
      } else {
        this.$message.error('请勾选商品')
      }
    },
    deleteGoods(data) {
      let ids = []
      if (data) {
        // 行点击删除
        if (data.goodsID) {
          ids = [data.goodsID]
        }
      } else {
        ids = this.selectIds()
      }
      if (ids.length > 0) {
        this.$confirm('确认删除商品？', '提示').then(() => {
          this.$axios.get('/goods/goods/deleteGoods', {
            id: ids.join(',')
          })
          this.getList()
        })
      } else {
        this.$message.error('请勾选商品')
      }
    },
    handleEdit(data) {
      location.href = ''
      this.$router.push(`/supply-publish/${data.goodsID}`)
    },
    showLog(data) {},
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
.handle {
  padding: 15px 0;
  text-align: center;
  background: white;
  .el-button {
    padding: 6px 10px;
  }
  & + section {
    margin-top: 15px;
  }
}
.sort {
  i {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
  }
}
.goods-list {
  min-height: 680px;
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
  .el-pagination {
    text-align: right;
    padding: 20px;
  }
  .category-check {
    line-height: 21px;
    display: inline-block;
    vertical-align: top;
    margin-left: 5px;
  }
}
</style>
