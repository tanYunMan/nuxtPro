<template>
  <el-dialog
    title="订单详情"
    width="1000px"
    custom-class="order-detail"
    :visible.sync="detailVisible"
    @closed="hide"
  >
    <orderDetail :order="orderTemp"></orderDetail>
  </el-dialog>
</template>

<script>
import orderDetail from './orderDetail'

export default {
  components: {
    orderDetail
  },
  data() {
    return {
      detailVisible: false,
      orderTemp: {}
    }
  },
  methods: {
    show(data) {
      this.orderTemp = data
      this.detailVisible = true
    },
    hide() {
      this.detailVisible = false
      setTimeout(() => {
        this.orderTemp = {}
      }, 500)
    }
  }
}
</script>
