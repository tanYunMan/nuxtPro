<template>
  <van-list>
    <van-cell @click="detail" v-for="i in 20" :key="i">
      <span class="price"> <em>¥</em>66.6 </span>
      <div class="name line2">
        【黑桃】绝地永久账号-添加手机秒改一切（有问题10分钟内投诉过时不处理）看商品简介（卖出不退换骗号自付）
      </div>
    </van-cell>
  </van-list>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {}
  },
  methods: {
    detail() {
      this.$router.push('/wap/goods')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-list {
  padding-top: 44px;
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
