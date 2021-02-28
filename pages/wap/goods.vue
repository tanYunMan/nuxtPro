<template>
  <div>
    <section>
      <!-- <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe> -->
      <h4>
        {{ detail.goodsName }}
      </h4>
      <span class="price"> <em>¥</em>{{ detail.goodsPrice | n2 }} </span>
      <span @click="doFav" class="fav">
        <van-icon :name="isLike ? 'like' : 'like-o'" />
        <span>收藏</span>
      </span>
      <div class="tip tbd1px">
        <van-tag plain type="primary">自动发货</van-tag>
      </div>
      <van-cell title="商品信息" size="large" :label="detail.remark" />
      <van-cell title="注意事项" size="large" :label="detail.goodsNote" />
    </section>
    <footer class="buy tbd1px">
      <van-button @click="buy" type="primary">立即购买</van-button>
    </footer>
  </div>
</template>

<script>
import user from '@/common/user'

export default {
  layout: 'wap',
  data() {
    return {
      images: [],
      detail: {},
      isLike: false,
      active: 0
    }
  },
  async mounted() {
    const { goodsId } = this.$route.query
    let url = `/goods/goods/getGoodsFK?goodsID=${goodsId}`
    if (user.isLogin(this.$cookies)) {
      url = `/goods/goods/getGoods?goodsID=${goodsId}`
    }
    if (url) {
      const res = await this.$axios.get(url)
      if (res.code === 1001 && res.body) {
        this.detail = res.body
      }
    }
  },
  methods: {
    doFav() {
      this.isLike = !this.isLike
    },
    buy() {
      // 库存不足
      if (this.detail.cardNum < 1) {
        return this.$notify({ type: 'danger', message: '库存不足' })
      }
      const { goodsId } = this.$route.query
      if (user.isLogin(this.$cookies)) {
        location.href = `/wap/submit?goodsId=${goodsId}`
      } else {
        location.href = '/wap/login'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-swipe {
  img {
    width: 100%;
    height: 250px;
  }
}
h4 {
  font-size: 14px;
  padding: 10px 15px;
  color: $--deep-gray-text-color;
}
.price,
.fav {
  font-weight: 500;
  padding: 0 15px 15px;
}
.price {
  color: $--basic-red;
  font-size: 18px;
  display: inline-block;
  em {
    font-style: normal;
    font-size: 14px;
    color: $--basic-red;
    margin-right: 5px;
  }
}
.fav {
  float: right;
  color: $--deep-gray-text-color;
  i {
    font-weight: 600;
    margin-right: 5px;
    line-height: 22px;
    vertical-align: text-top;
  }
  .van-icon-like {
    color: $--basic-red;
  }
}
.tip {
  padding: 15px;
  border-bottom: 10px solid $--basic-border-color;
}
.van-tab__pane {
  padding: 15px;
  padding-bottom: 75px;
}
.buy {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: white;
  button {
    width: 100%;
  }
}
</style>
