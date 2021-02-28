<template>
  <div>
    <section>
      <van-cell title="商品名称：">
        <template #right-icon>
          <div style="word-break: break-all">{{ detail.goodsName }}</div>
        </template>
      </van-cell>
      <van-cell title="商品价格：">
        <template #right-icon> ¥{{ detail.goodsPrice | n2 }} </template>
      </van-cell>
      <van-cell title="注意事项：">
        <template #right-icon> {{ detail.remark }} </template>
      </van-cell>
      <div class="separate"></div>
      <van-cell title="购买数量：">
        <template #right-icon>
          <van-stepper integer :max="detail.cardNum || 0" v-model="num" />
        </template>
      </van-cell>
      <van-field
        v-model="message"
        rows="4"
        label="备注："
        type="textarea"
        placeholder="请输入留言"
      />
      <div class="separate"></div>
      <div class="total">¥{{ total | n2 }}</div>
    </section>
    <footer class="buy tbd1px">
      <van-button :loading="isLoading" @click="submit" type="primary"
        >立即购买</van-button
      >
    </footer>
    <van-dialog
      v-model="pwdShow"
      title="交易密码"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        v-model="password"
        type="password"
        placeholder="请输入交易密码"
      />
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'wap',
  data() {
    return {
      detail: {},
      num: 1,
      message: '',
      password: '',
      pwdShow: false,
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      hasTradePwd: (state) => state.hasTradePwd
    }),
    total() {
      let goodsPrice = parseFloat(this.detail.goodsPrice)
      if (isNaN(goodsPrice)) {
        goodsPrice = 0
      }
      return parseFloat((this.num * goodsPrice).toFixed(2))
    }
  },
  async mounted() {
    const { goodsId } = this.$route.query
    const res = await this.$axios.get(
      `/goods/goods/getGoods?goodsID=${goodsId}`
    )
    if (res.code === 1001 && res.body) {
      this.detail = res.body
    }
  },
  methods: {
    submit() {
      if (this.isLoading) return
      if (this.num > this.detail.cardNum) {
        return this.$notify({ type: 'danger', message: '卡密库存不足' })
      }
      if (!this.hasTradePwd) {
        this.beforeClose('confirm')
      } else if (!this.pwdShow) {
        this.pwdShow = true
        this.password = ''
      }
    },
    async beforeClose(action, done) {
      if (action === 'confirm') {
        if (this.hasTradePwd && !this.password) {
          done(false)
          return this.$notify({ type: 'danger', message: '请输入交易密码' })
        }
        this.isLoading = true
        const reqData = {
          goodsID: this.detail.goodsID,
          num: this.num,
          remark: this.message
        }
        const res = await this.$axios.post('/order/order/addOrder', null, {
          params: reqData
        })
        if (res.code === 1001) {
          this.$notify({ type: 'success', message: '购卡成功' })
          if (res.body) {
            location.href = `/wap/order-detail?orderId=${res.body.orderID}`
          } else {
            location.href = '/wap/orders'
          }
        } else {
          this.isLoading = false
        }
      } else {
        done()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.separate {
  height: 10px;
  background: $--basic-border-color;
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
.total {
  padding: 10px 16px;
  font-size: 22px;
  color: red;
  font-weight: 600;
}
::v-deep .van-cell__title {
  white-space: nowrap;
}
</style>
