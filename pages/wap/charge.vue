<template>
  <div>
    <section>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            v-for="item in chargeList"
            :key="item.rechargeModeID"
            clickable
            @click="radio = item.rechargeModeID"
          >
            <template slot="title">
              <img
                class="pay-img"
                :alt="item.rechargeName"
                :src="item.rechargeImg"
              />
              <span>{{ item.rechargeName }}</span>
            </template>
            <van-radio slot="right-icon" :name="item.rechargeModeID" />
          </van-cell>
          <van-cell
            clickable
            @click="radio = 'addCard'"
          >
            <template slot="title">
              <img
                class="pay-img"
                alt="加款卡"
                src="../../assets/rechargeCard.png"
              />
              <span>加款卡</span>
            </template>
            <van-radio slot="right-icon" name="addCard" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-field
        left-icon="balance-o"
        v-model="money"
        clearable
        placeholder="请输入充值卡卡密"
        v-if="radio === 'addCard'"
      />
      <van-field
        left-icon="balance-o"
        v-model="money"
        clearable
        placeholder="请输入充值金额"
        v-else
      />
      <p>1.订单问题请联系售后客服QQ：{{ contact.frontServiceQQ }}</p>
      <p>
        2.请关闭所有弹出窗口杀手之类的功能，否则在线支付将无法继续。
      </p>
      <p>3.在开始支付后，不要关闭任何窗口，直到支付成功。</p>
    </section>
    <van-button
      @click="confirm"
      :loading="isLoading"
      class="sure"
      type="primary"
      >确认充值</van-button
    >
  </div>
</template>

<script>
import { paySubmit, xmlSyncRequest } from '@/common/utils'

export default {
  layout: 'wap',
  async asyncData({ $axios }) {
    const res = await $axios.get('/finance/rechargeMode/getListForClient', {
      params: {
        rechargeType: 2
      }
    })
    let chargeList = []
    if (res.code === 1001 && res.body) {
      chargeList = res.body
    }
    // 联系我们
    const a = await $axios.get('/site/onlineService/getFK')
    let contact = {}
    if (a.code === 1001 && a.body) {
      contact = a.body
    }
    return { chargeList, contact }
  },
  data() {
    return {
      radio: '',
      outTradeNo: '', // 支付订单
      money: '',
      isLoading: false
    }
  },
  methods: {
    confirm() {
      if (this.isLoading) return
      if (!this.radio) {
        return this.$notify({ type: 'danger', message: '请选择充值支付方式' })
      }

      //console.log(this.radio)

      if (this.radio === 'addCard') {
        //console.log(this)
        if (this.money.length != 32) {
          return this.$notify({
            type: 'danger',
            message: '请输入正确位数的卡号'
          })
        }
      const ress = xmlSyncRequest(this, 'finance/rechargeCard/use', {cardNo:this.money})
      if (ress.code === 1001) {
        this.cardNo = ''
         this.$notify({
          title: '支付成功',
          message: '您的支付已经成功，请查看账户余额'
          })
         location.href = '/wap/user'
      }else{
        this.$notify({
            type: 'danger',
            message: ress.msg
          })
        this.money = ''
      }
      } else {
        const money = parseFloat(this.money)
        if (isNaN(money)) {
          return this.$notify({ type: 'danger', message: '充值金额输入错误' })
        }
        if (money > 100000) {
          return this.$notify({
            type: 'danger',
            message: '充值金额超过最大充值金额100000'
          })
        }

        this.isLoading = true
        this.$cookies.remove('pay-redirect')
        const res = xmlSyncRequest(this, '/finance/rechargeRecord/addRecharge', {
          money,
          rechargeModeID: this.radio
        })
        if (res.code === 1001 && res.body && !res.body.code_url) {
          paySubmit(res.body)
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
          this.listen()
        } else if (res.code === 1001 && res.body && res.body.code_url) {
          const div = document.createElement('div') // 创建挂载form表单的容器
          div.innerHTML = res.body.code_url // 接受到的form表单
          document.body.appendChild(div) // 挂载到body中
          document.forms[0].submit() // 提交form表单
        } else {
          this.isLoading = false
        }
      }
    },
    // 监听支付页面回来
    listen() {
      const vibchage =
        'visibilitychange' || 'webkitvisibilitychange' || 'mozvisibilitychange'
      this.active = this.active.bind(this)
      document.removeEventListener(vibchage, this.active)
      document.addEventListener(vibchage, this.active)
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        if (this.$cookies.get('pay-success')) {
          this.$cookies.remove('pay-success')
          location.href = '/wap/user'
        }
      }, 1000)
    },
    active() {
      const bowhidden =
        'hidden' in document
          ? 'hidden'
          : 'webkithidden' in document
          ? 'webkithidden'
          : 'mozhidden' in document
          ? 'mozhidden'
          : null
      if (!document[bowhidden] && this.$cookies.get('pay-redirect')) {
        if (this.readyPay) {
          this.readyPay = 0
          this.$cookies.remove('pay-redirect')
          return (location.href = '/wap/user')
        }
        this.readyPay = 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  .van-radio-group {
    border-top: 15px solid $--basic-border-color;
    border-bottom: 15px solid $--basic-border-color;
  }
  p {
    padding: 15px;
    font-size: 13px;
    color: $--alert-red;
  }
}
.pay-img {
  height: 30px;
  width: auto;
  vertical-align: middle;
}
.sure {
  color: white;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 16px;
  font-weight: 500;
}
</style>
