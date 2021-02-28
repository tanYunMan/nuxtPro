<template>
  <section>
    <van-cell class="van-otitle" title="商品情况" />
    <van-cell :title="`商品编号：${detail.goodsID || ''}`" />
    <van-cell :title="`商品名称：${detail.goodsName || ''}`" />
    <van-cell :title="`商品类型：${detail.goodsTypeName || ''}`" />
    <van-cell>
      <template #title>商品面值：{{ detail.goodsPrice | n2 }} </template>
    </van-cell>
    <van-cell class="van-otitle" title="订单详情" />
    <van-cell>
      <template #title>
        订单状态：{{ detail.orderState | stateText }}
      </template>
    </van-cell>
    <!-- <van-cell :title="`退款记录：${detail.goodsTypeName}`" /> -->
    <van-cell :title="`购买数量：${detail.goodsNum || ''}`" />
    <van-cell>
      <template #title>购买金额：{{ detail.orderPrice | n2 }} </template>
    </van-cell>
    <van-cell :title="`购买对象：${detail.goodsUserName || ''}`" />
    <van-cell :title="`购买者IP：${detail.goodsUserIP || ''}`" />
    <van-cell :title="`购买时间：${detail.createTime || ''}`" />
    <van-cell class="van-otitle" title="购买内容" />
    <!-- <van-cell :title="`充值网址：${detail.createTime || ''}`" />
    <van-cell :title="`充值信息：${detail.createTime || ''}`" /> -->
    <van-cell title="复制卡密" is-link @click="doCopy" />
    <div v-for="(item, idx) in detail.orderCardVOList" :key="idx">
      <div class="card">
        <span>第{{ idx + 1 }}组卡密</span>
      </div>
      <van-cell :title="`卡号：${item.cardNumber || ''}`" />
      <van-cell :title="`密码：${item.cardPws || ''}`" />
    </div>
    <van-cell class="van-otitle" title="金额明细" />
    <div
      class="money"
      v-for="item in detail.userMoneyDetails"
      :key="item.userMoneyDetailID"
    >
      <div style="font-size: 16px; font-weight: 600">
        订单扣款：<em class="red">{{ item.money | n2 }}</em>
      </div>
      <div>
        <span>交易前：{{ item.beforeMoney | n2 }}</span>
        <span style="margin-left: 30px;">交易后：{{ item.endMoney | n2 }}</span>
      </div>
      <div>交易日期：{{ item.createTime | dateFormat }}</div>
    </div>
    <footer class="complain tbd1px">
      <van-button @click="goComplain" type="primary">我要投诉</van-button>
    </footer>
  </section>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  layout: 'wap',
  data() {
    return {
      detail: {}
    }
  },
  async mounted() {
    const { orderId } = this.$route.query
    const res = await this.$axios.get('/order/order/orderDetails', {
      params: {
        orderID: orderId
      }
    })
    if (res.code === 1001 && res.body) {
      this.detail = res.body
    }
  },
  methods: {
    doCopy() {
      const arr = []
      const cardList = this.detail.orderCardVOList || []
      cardList.forEach((item) => {
        arr.push(`${item.cardNumber}/${item.cardPws}`)
      })
      copy(arr.join(';'))
      this.$notify({ type: 'success', message: '复制成功' })
    },
    goComplain() {
      location.href = `/wap/complain-submit?orderId=${this.detail.orderID}`
    }
  }
}
</script>

<style lang="scss" scoped>
.van-otitle {
  font-size: 16px;
  font-weight: 600;
  background: #ebedf0;
}
.complain {
  padding: 10px;
  background: white;
  button {
    width: 100%;
  }
}
.card {
  padding: 5px 16px;
  span {
    padding: 3px 8px;
    border-radius: 11px;
    color: #fff;
    background: #409eff;
    display: inline-block;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
  }
}
.red {
  font-style: normal;
  color: red;
}
.money {
  padding: 5px 16px;
  font-size: 14px;
  line-height: 25px;
}
</style>
