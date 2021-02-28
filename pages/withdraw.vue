<template>
  <div>
    <h3>
      <span>当前位置：申请提现</span>
      <div class="sub-nav">
        <a class="selected">申请提现</a>
        <a href="/withdraw-way">提现方式</a>
        <a href="/withdraw-list">提现记录</a>
      </div>
    </h3>
    <section>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="提现方式：">
          <el-input disabled v-model="typeName"></el-input>
        </el-form-item>
        <el-form-item label="提现账户：">
          <el-input disabled v-model="cashAccount"></el-input>
        </el-form-item>
        <el-form-item label="提现账户名：">
          <el-input disabled v-model="cashName"></el-input>
        </el-form-item>
        <el-form-item label="申请提现金额：">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="确认提现金额：">
          <el-input v-model="form.moneyRepeat"></el-input>
        </el-form-item>
        <el-form-item label="提现手续费：">
          <span>{{ extFee }}元</span>
          <span
            >手续费：
            <span v-for="item in fee" :key="item.cashRateID"
              >{{ item.startMoney }}~{{ item.endMoney }}: {{ item.rateNum
              }}<em v-if="item.rateType === 2">%</em>；
            </span>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交申请</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'webIn',
  middleware: ['tradePwd'],
  async asyncData({ $axios }) {
    const a = await $axios.get('/finance/cashType/list')
    const typeMap = {}
    if (a.code === 1001 && a.body) {
      a.body.forEach((item) => {
        typeMap[item.cashTypeID] = item.cashTypeName
      })
    }
    const b = await $axios.get('/finance/cashMethod/get')
    const data = {
      form: {},
      typeName: '',
      cashAccount: '',
      cashName: '',
      cashMethodState: ''
    }
    if (b.code === 1001 && b.body) {
      data.typeName = typeMap[b.body.cashTypeID]
      data.cashAccount = b.body.cashAccount
      data.cashName = b.body.cashName
      data.cashMethodState = b.body.cashMethodState
    }
    const c = await $axios.get('/finance/cashRate/listCashRate')
    let fee = []
    if (c.code === 1001 && c.body) {
      fee = c.body
    }
    return { typeMap, fee, ...data }
  },
  data() {
    return {
      form: {
        money: '',
        moneyRepeat: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({
      hasTradePwd: (state) => state.hasTradePwd
    }),
    extFee() {
      if (this.form.money) {
        const money = parseFloat(this.form.money)
        for (let i = this.fee.length - 1; i >= 0; i--) {
          const item = this.fee[i]
          if (money >= item.startMoney) {
            if (item.rateType === 2) {
              return parseFloat(((money / 100) * item.rateNum).toFixed(2))
            } else if (item.rateType === 1) {
              return item.rateNum
            }
          }
        }
      }
      return 0
    }
  },
  methods: {
    submit() {
      if (this.hasTradePwd) {
        return this.$prompt('请输入交易密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'password'
          // inputPattern: //,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.onSubmit(value)
        })
      }
      this.onSubmit()
    },
    async onSubmit(password) {
      if (this.cashMethodState === 1) {
        return this.$message.error(
          '当前提现方式正在审核，请等待审核通过后，方可提现'
        )
      }
      if (this.money !== this.moneyRepeat) {
        return this.$message.error('金额输入错误，请重新输入')
      }
      const loading = this.$loading()
      const res = await this.$axios.post('/finance/cash/add', null, {
        params: { money: this.form.money }
      })
      if (res.code === 1001) {
        this.$message.success('提交提现申请成功')
        location.href = '/withdraw-list'
      } else {
        loading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-nav {
  float: right;
  a {
    float: none;
    display: inline-block;
    text-decoration: none;
    color: $--deep-gray-text-color;
    &:hover {
      color: $--color-primary;
    }
    &.selected {
      line-height: 34px;
      color: $--color-primary;
      border-bottom: 2px solid $--color-primary;
    }
  }
  a + a {
    margin: 0 0 0 15px;
  }
}
section {
  padding: 15px;
  background: white;
  ::v-deep.el-form {
    .el-input {
      width: 500px;
      margin-right: 10px;
    }
    .el-input + em {
      font-size: 12px;
      color: #bfbfbf;
    }
    .el-textarea {
      textarea {
        width: 500px;
        resize: none;
        height: 100px;
      }
      & + i {
        font-style: normal;
      }
    }
  }
}
</style>
