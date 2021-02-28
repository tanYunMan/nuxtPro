<template>
  <div class="whitebg">
    <h3>
      <span>当前位置：提交成功</span>
    </h3>
    <section>
      <orderDetail :order="order"></orderDetail>
    </section>
  </div>
</template>

<script>
import orderDetail from '@/components/orderDetail'

export default {
  layout: 'webIn',
  components: {
    orderDetail
  },
  data() {
    return {
      order: {}
    }
  },
  async mounted() {
    const { orderID } = this.$route.query
    const res = await this.$axios.get(
      `/order/order/orderDetails?orderID=${orderID}`
    )
    if (res.code === 1001 && res.body) {
      this.order = res.body
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 0 15px 15px 15px;
  background: white;
}
</style>
