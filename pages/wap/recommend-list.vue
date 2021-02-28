<template>
  <div>
    <van-list>
      <a
        v-for="item in list"
        :key="item.goodsID"
        :href="`/wap/goods?goodsId=${item.goodsID}`"
      >
        <van-cell>
          <span class="price"> <em>¥</em>{{ item.goodsPrice | n2 }} </span>
          <div class="name line2">
            {{ item.goodsName }}
          </div>
        </van-cell>
      </a>
    </van-list>
  </div>
</template>

<script>
import user from '@/common/user'

export default {
  layout: 'wap',
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    const { recommendId } = this.$route.query
    let url = '/goods/goods/getGoodsRecommendByCRIDClientFK'
    if (user.isLogin(this.$cookies)) {
      url = '/goods/goods/getGoodsRecommendByCRIDClient'
    }
    const res = await this.$axios.get(url, {
      params: {
        crID: recommendId
      }
    })
    if (res.code === 1001 && res.body) {
      this.list = res.body
    }
  }
}
</script>

<style lang="scss" scoped>
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
