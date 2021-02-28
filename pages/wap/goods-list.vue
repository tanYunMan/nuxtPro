<template>
  <div>
    <!-- <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu> -->
    <van-list
      v-model="listLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <a
        v-for="item in list"
        :key="item.goodsID"
        :href="`/wap/goods?goodsId=${item.goodsID}`"
      >
        <van-cell>
          <span class="price">
            <em>¥</em
            >{{
              item.goodsShowVO
                ? item.goodsShowVO.goodsPrice
                : item.goodsPrice | n2
            }}
          </span>
          <div class="name line2">
            {{ item.goodsShowVO ? item.goodsShowVO.goodsName : item.goodsName }}
          </div>
        </van-cell>
      </a>
    </van-list>
  </div>
</template>

<script>
import user from '@/common/user'
import wapListMixin from '@/mixins/wapList'

export default {
  layout: 'wap',
  mixins: [wapListMixin],
  data() {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
    }
  },
  mounted() {
    const { categoryId, keywords, recommend } = this.$route.query
    this.catalogID = categoryId
    this.keywords = keywords
    this.url = '/goods/goods/goodsPageClientFK'
    if (recommend) {
      this.url = '/goods/goods/catalogGoodsRecommendPageFK'
    }
    if (user.isLogin(this.$cookies)) {
      this.url = '/goods/goods/goodsPageClient'
      if (recommend) {
        this.url = '/goods/goods/catalogGoodsRecommendPage'
      }
    }
  },
  methods: {
    getParams() {
      const params = {}
      if (this.catalogID) {
        params.catalogID = this.catalogID
      }
      if (this.keywords) {
        params.goodsName = this.keywords
      }
      return params
    }
  }
}
</script>

<style lang="scss" scoped>
// .van-dropdown-menu {
//   top: 44px;
//   position: fixed;
//   width: 100%;
//   z-index: 1;
// }
.van-list {
  padding-top: 50px;
  .van-cell {
    padding: 10px 15px;
    border-bottom: 10px solid $--basic-border-color;
    .name {
      margin-right: 65px;
      font-size: 14px;
    }
    .price {
      font-weight: 500;
      color: $--basic-red;
      float: right;
      font-size: 16px;
      margin-top: 9px;
      em {
        font-style: normal;
        font-size: 12px;
        color: $--basic-red;
        margin-right: 5px;
      }
    }
  }
}
</style>
