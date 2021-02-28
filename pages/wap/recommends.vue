<template>
  <section>
    <van-list>
      <a
        v-for="item in list"
        :key="item.goodsID"
        :href="`/wap/goods?goodsId=${item.goodsID}`"
      >
        <van-cell>
          <span class="price">
            <em>¥</em>{{ item.goodsShowVO.goodsPrice }}
          </span>
          <div class="name line2">{{ item.goodsShowVO.goodsName }}</div>
        </van-cell>
      </a>
    </van-list>
  </section>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getRecommendGoods()
  },
  methods: {
    async getRecommendGoods() {
      const res = await this.$axios.post(
        '/goods/goods/catalogGoodsRecommendPageFK'
      )
      if (res.code === 1001 && res.body) {
        this.list = res.body.records
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
