<template>
  <div>
    <h3>
      <span>当前位置：商品列表</span>
    </h3>
    <recommends></recommends>
    <section class="search">
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
    </section>
    <section class="goods">
      <el-table v-loading="isLoading" :data="tableData">
        <el-table-column
          prop="goodsID"
          width="100"
          label="编号"
        ></el-table-column>
        <el-table-column prop="goodsName" label="商品名称">
          <template slot-scope="{ row }">
            <a
              href="javascript:;"
              @click="detail(row)"
              :style="{ color: row.color }"
              >{{ row.goodsName }}</a
            >
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="发货时间"></el-table-column> -->
        <!-- <el-table-column prop="name" label="面值"></el-table-column> -->
        <el-table-column prop="goodsPrice" width="100" label="平台价">
          <template slot-scope="{ row }">
            {{ row.goodsPrice || 0 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="cardNum"
          width="100"
          label="库存"
        ></el-table-column>
        <el-table-column
          width="100"
          label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.goodsState === 1 ? '上架' : scope.row.goodsState === 2 ? '暂停销售' : '下架'}}</span>
            </template>
          </el-table-column>
        <el-table-column prop="name" width="150" label="购买">
          <template slot-scope="{ row }">
            <!-- <a v-if="row.cardNum && row.goodsState === 1" :href="`/submit?id=${row.goodsID}`" -->
            <a v-if="row.cardNum" :href="`/submit?id=${row.goodsID}`"
              ><el-button size="small" type="primary">提取卡密</el-button></a
            >
            <el-button v-else size="small" disabled>提取卡密</el-button>
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
  </div>
</template>

<script>
import Recommends from '@/components/recommends'
import pageMixin from '@/mixins/page'
import {mapState} from 'vuex'

export default {
  layout: 'webIn',
  components: {
    Recommends
  },
  mixins: [pageMixin],
  data() {
    return {
      isLoading: true,
      recommendsCategory: [],
      searchText: '',
      tableData: []
    }
  },
  created() {
    const {
      query: { keywords }
    } = this.$route
    if (keywords) {
      this.searchText = keywords
    }
    this.getList()
  },
  methods: {
    async getList() {
      this.isLoading = true
      const {
        query: { categoryId, recommend, recommendId }
      } = this.$route
      let url = ''
      let params = {}
      if (recommend) {
        url = '/goods/goods/catalogGoodsRecommendPage'
      } else if (recommendId) {
        url = '/goods/goods/getGoodsRecommendByCRIDClient'
        params.crID = recommendId
        const res = await this.$axios.get(url, { params })
        if (res.code === 1001 && res.body) {
          this.tableData = res.body
        }
        this.isLoading = false
        return
      } else {
        url = '/goods/goods/goodsPageClient'
        params = { pageNum: 1, pageSize: 20 }
        if (categoryId) {
          params.catalogID = categoryId
        }
        if (this.searchText) {
          params.goodsName = this.searchText
        }
      }
      const res = await this.$axios.post(url, null, { params })
      if (res.code === 1001 && res.body) {
        if (recommend) {
          this.tableData = res.body.records.map((item) => {
            return item.goodsShowVO
          })
        } else {
          this.tableData = res.body.records
        }
      }
      this.isLoading = false
    },
    doSearch() {
      if (!this.searchText) {
        return this.$message.error('请输入关键字')
      }
      location.href = `/goods-list?keywords=${this.searchText}`
    },
    detail(row) {
      this.$alert(
        `<h4>${row.goodsName}</h4><p>注意事项：${row.goodsNote}</p><p>商品介绍：${row.remark}</p>`,
        '商品信息',
        {
          dangerouslyUseHTMLString: true
        }
      )
    }
  },
  computed: {
    ...mapState({
      searchGoodsTxt: 'searchGoodsTxt'
    })
  },
  watch: {
    searchGoodsTxt (val) {
      this.searchText = val
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
