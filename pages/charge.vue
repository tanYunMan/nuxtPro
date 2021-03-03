<template>
  <div>
    <h3>
      <span>当前位置： 账户充值</span>
    </h3>
    <section>
      <el-tabs v-model="active">
        <p v-if="active === 'third'" class="third-tip">一卡通充值(平台充值卡)：是主站站长后台自己生成的一卡通卡密，用于本平台进行加款用的卡密。</p>
        <el-tab-pane label="在线充值" name="online">
          <div class="row">
            <span>支付方式：</span>
            <ul class="charge-pay">
              <li
                v-for="item in chargeList"
                :key="item.rechargeModeID"
                :class="
                  onlineRecharge === item.rechargeModeID ? 'selected' : ''
                "
                @click="onlineRecharge = item.rechargeModeID"
              >
                <img :alt="item.rechargeName" :src="item.rechargeImg" />
              </li>
              <li
                :class="
                  onlineRecharge === addCard ? 'selected' : ''
                "
                @click="onlineRecharge = addCard"
              >
                <img alt="加款卡" src="../assets/rechargeCard.png" />
              </li>
            </ul>
          </div>
           <div class="row" v-if="onlineRecharge === addCard">
            <span>充值卡卡密：</span>
            <el-input v-model="cardNo" placeholder="充值卡卡密" style="width:400px"></el-input>&nbsp;
          </div>
          <div class="row" v-else>
            <span>充值金额：</span>
            <el-input v-model="money" placeholder="充值金额"></el-input>&nbsp;元
          </div>
          <div class="row">
            <span>重要提示：</span>
            <div class="remind">
              <p>1.订单问题请联系售后客服QQ：{{ contact.frontServiceQQ }}</p>
              <p>2.请关闭所有弹出窗口杀手之类的功能，否则在线支付将无法继续。</p>
              <p>3.在开始支付后，不要关闭任何窗口，直到支付成功。</p>
            </div>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="点卡兑换" name="second">
          <div class="row">
            <span>点卡类型：</span>
          </div>
          <div class="row">
            <span>选择面值：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="row">
            <span>充值金额：</span>
            <el-input v-model="money" placeholder="充值金额"></el-input>&nbsp;元
          </div>
          <div class="row">
            <span>充值卡卡号：</span>
            <el-input
              v-model="money"
              placeholder="请输入17位数字的序列号"
            ></el-input
            >&nbsp;元
          </div>
          <div class="row">
            <span>充值卡密码：</span>
            <el-input
              v-model="money"
              placeholder="请输入18位数字的充值卡密码"
            ></el-input
            >&nbsp;元
          </div>
          <div class="row">
            <span>实际到账：</span>
          </div>
        </el-tab-pane>-->
        <!-- <el-tab-pane label="一卡通充值" name="third">
          <div class="row">
            <span>充值卡卡号：</span>
            <el-input
              v-model="money"
              placeholder="请输入17位数字的序列号"
            ></el-input
            >&nbsp;元
          </div>
          <div class="row">
            <span>充值卡密码：</span>
            <el-input
              v-model="money"
              placeholder="请输入18位数字的充值卡密码"
            ></el-input
            >&nbsp;元
          </div>
        </el-tab-pane>-->
      </el-tabs>
      <el-button @click="doRechargeOther" type="primary" v-if="onlineRecharge === addCard">立即充值</el-button>
      <el-button @click="doRecharge" type="primary" v-else>立即充值</el-button>
      <el-dialog width="240px" title="扫码支付" :visible.sync="payDialog" append-to-body :before-close="handleClosePayCode">
        <span v-if="codeUrl">
          <img :src="codeUrl" />
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { paySubmit, xmlSyncRequest } from '@/common/utils'
import QRCode from 'qrcode'
const options = {
  errorCorrectionLevel: 'H',
  margin: 1
  // type: 'image/jpeg',
  // quality: 1,
  // color: {
  //   dark: '#010599FF',
  //   light: '#FFBF60FF'
  // }
}
export default {
  layout: 'webIn',
  async asyncData({ $axios }) {
    const res = await $axios.get('/finance/rechargeMode/getListForClient', {
      params: {
        rechargeType: 1
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
      cardNo:'',
      addCard : 'addCard',
      active: 'online',
      money: '',
      codeUrl: null,
      payDialog: false, // 支付弹窗
      qrCode: '', // 二维码地址
      payInterval: null, // 支付的定时器
      payIntervalCount: 0, // 轮询次数
      outTradeNo: '', // 支付订单
      onlineRecharge: '',
      options: [
        {
          value: '1',
          label: '选项1'
        }
      ],
      value: ''
    }
  },
  methods: {
    async doRecharge() {
      if (this.isLoading) return
      if (this.active === 'online') {
        const money = parseFloat(this.money)
        if (isNaN(money)) {
          return this.$message.error('充值金额输入错误')
        }
        if (money > 100000) {
          return this.$message.error('充值金额超过最大充值金额100000')
        }
        if (!this.onlineRecharge) {
          return this.$message.error('请选择充值支付方式')
        }
        this.$cookies.remove('pay-redirect')
        this.isLoading = true
        // 使用XMLHttpRequest进行同步请求，防止form新打开窗口被浏览器拦截
        const res = xmlSyncRequest(
          this,
          '/finance/rechargeRecord/addRecharge',
          { money, rechargeModeID: this.onlineRecharge }
        )
        if (res.code === 1001 && res.body && res.body.postUrl) {
          paySubmit(res.body)
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
          // 监听支付成功
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            if (this.$cookies.get('pay-redirect')) {
              this.$cookies.remove('pay-redirect')
              location.href = '/main?pay=1'
            }
          }, 1000)
        } else if (res.code === 1001 && res.body.qr_code) {
          // 有二维码，当面付
          this.qrCode = res.body.qr_code
          //console.log(this.qrCode)
          this.codeUrl = await QRCode.toDataURL(this.qrCode, options)
          this.outTradeNo = res.body.out_trade_no
          this.payDialog = true
          // 在这里轮询
          this.payInterval = setInterval(() => {
            this.$axios
              .get('/finance/rechargeRecord/queryPayStateFk', {
                params: {
                  paySn: this.outTradeNo
                }
              })
              .then((payRes) => {
                if (payRes.body.payState == 2) {
                  this.$notify({
                    title: '支付成功',
                    message: '您的支付已经成功，请查看账户余额'
                  })
                  this.payDialog = false
                  this.qrCode = ''
                  this.outTradeNo = ''
                  this.isLoading = false
                  clearInterval(this.payInterval)
                  this.getMoney()
                }
                if (payRes.body.payState == 1) {
                  this.$message.error('支付失败 ，请重新支付')
                  this.payDialog = false
                  this.qrCode = ''
                  this.outTradeNo = ''
                  this.isLoading = false
                  clearInterval(this.payInterval)
                }
              })

            if (this.payIntervalCount > 60) {
              this.$message.error('支付订单已超时 ，请重新支付')
              this.payDialog = false
              this.qrCode = ''
              this.outTradeNo = ''
              this.isLoading = false
              clearInterval(this.payInterval)
            }
            this.payIntervalCount++
          }, 3000)
        } else if (res.code === 1001 && res.body.wechat_code) {
          // 有二维码，当面付
          this.qrCode = res.body.wechat_code
          //console.log(this.qrCode)
          this.codeUrl = await QRCode.toDataURL(this.qrCode, options)
          this.outTradeNo = res.body.out_trade_no
          this.payDialog = true
          // 在这里轮询
          this.payInterval = setInterval(() => {
            this.$axios
              .get('/finance/rechargeRecord/queryPayStateFk', {
                params: {
                  paySn: this.outTradeNo
                }
              })
              .then((payRes) => {
                if (payRes.body.payState == 2) {
                  this.$notify({
                    title: '支付成功',
                    message: '您的支付已经成功，请查看账户余额'
                  })
                  this.payDialog = false
                  this.qrCode = ''
                  this.outTradeNo = ''
                  this.isLoading = false
                  clearInterval(this.payInterval)
                  this.getMoney()
                }
                if (payRes.body.payState == 1) {
                  this.$message.error('支付失败 ，请重新支付')
                  this.payDialog = false
                  this.qrCode = ''
                  this.outTradeNo = ''
                  this.isLoading = false
                  clearInterval(this.payInterval)
                }
              })

            if (this.payIntervalCount > 60) {
              this.$message.error('支付订单已超时 ，请重新支付')
              this.payDialog = false
              this.qrCode = ''
              this.outTradeNo = ''
              this.isLoading = false
              clearInterval(this.payInterval)
            }
            this.payIntervalCount++
          }, 3000)
        } else {
          this.$message.error(res.msg || '请求支付失败，请稍后重试')
          this.isLoading = false
        }
      }
    },

    handleClosePayCode () {
      this.payDialog = false
      this.isLoading = false
      clearInterval(this.payInterval)
    },

    async doRechargeOther(){
       if (this.cardNo.length != 32) {
          return this.$message.error('请输入正确位数的卡号')
        }
      const res = await this.$axios.post(`finance/rechargeCard/use`,{cardNo:this.cardNo})
      if (res.code === 1001) {
        this.cardNo = ''
         this.$notify({
          title: '支付成功',
          message: '您的支付已经成功，请查看账户余额'
          })
         location.href = '/main?pay=1'
      }else{

        this.$message.error(res.msg);
        this.cardNo = ''
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 0 15px 30px 15px;
  background: white;
}
.el-tab-pane {
  padding: 15px;
}
.row {
  & > span:first-child {
    width: 100px;
    font-size: 14px;
    text-align: right;
    line-height: 40px;
    display: inline-block;
  }
  & + .row {
    margin-top: 15px;
  }
  .remind {
    font-size: 14px;
    display: inline-block;
    width: calc(100% - 80px);
    vertical-align: text-top;
    margin-left: 100px;
    p + p {
      margin-top: 10px;
    }
  }
  .el-input {
    width: 200px;
  }
}
.charge-pay {
  display: inline-block;
  vertical-align: middle;
  li {
    width: 75px;
    height: 50px;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    border: 1px solid $--basic-border-color;
    img {
      object-fit: contain;
    }
    &:hover {
      cursor: pointer;
      border: 1px solid $--color-primary;
    }
    &.selected {
      border: 1px solid $--color-primary;
    }
  }
  li + li {
    margin-left: 15px;
  }
}
.third-tip {
  padding: 10px 15px;
  font-size: 12px;
  color: $--basic-orange;
  border: 1px dashed $--basic-orange;
}
.el-button {
  margin: 15px 0 0 115px;
  width: 150px;
}
</style>
