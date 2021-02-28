<template>
  <div>
    <h3>
      <span>当前位置：账户间转款</span>
      <a href="/bill">
        <el-button>转款记录查询</el-button>
      </a>
      <a href="/transfer">
        <el-button type="primary">账户间转款</el-button>
      </a>
    </h3>
    <section class="inp-wrapper">
      <el-form ref="form" label-width="120px">
        <el-form-item label="余额：">
          <div>{{ (user.userMoney ? user.userMoney.money : 0) | n3 }}元</div>
        </el-form-item>
        <el-form-item label="转入客户：">
          <el-autocomplete
            placeholder="请输入转入客户编号"
            v-model="localUserID"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item v-if="toUser" label="转入客户名称：">
          <div>{{ toUser.userName }}</div>
        </el-form-item>
        <el-form-item label="转入金额：">
          <el-input v-model="money" placeholder="请输入转入金额"></el-input>
        </el-form-item>
        <el-form-item label="转款备注：">
          <el-input
            type="textarea"
            placeholder="请输入转款备注"
            v-model="remark"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="hasTradePwd" label="支付密码：">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="transfer">确定转款</el-button>
          <a href="/wallet">
            <el-button style="margin-left: 20px">我的钱包</el-button>
          </a>
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
  data() {
    return {
      toUser: null,
      localUserID: '',
      money: '',
      remark: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      hasTradePwd: (state) => state.hasTradePwd
    })
  },
  methods: {
    doQuery() {
      return new Promise((resolve) => {
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          if (this.localUserID) {
            const res = await this.$axios.get('/user/user/getLocal', {
              params: { localUserID: this.localUserID }
            })
            if (res.code === 1001 && res.body) {
              return resolve([
                {
                  userName: res.body.userName,
                  value: res.body.userName,
                  userID: res.body.userID,
                  localUserID: this.localUserID
                }
              ])
            }
          }
          resolve([])
        }, 1000)
      })
    },
    async querySearchAsync(queryString, cb) {
      const list = await this.doQuery()
      cb(list)
    },
    handleSelect(item) {
      this.localUserID = item.localUserID
      if (parseInt(item.localUserID) === this.user.localUserID) {
        this.toUser = null
        return this.$message.error('不能给自己转款')
      }
      this.toUser = item
    },
    async transfer() {
      if (!this.toUser.userID) {
        return this.$message.error('请输入转账客户编号选择转账客户')
      }
      if (!this.money) {
        return this.$message.error('请输入转账金额')
      }
      const money = this.user.userMoney ? this.user.userMoney.money : 0
      if (this.money > money) {
        return this.$message.error('转账金额不能超过余额')
      }
      if (
        this.hasTradePwd &&
        (this.password.length < 6 || this.password.length > 20)
      ) {
        return this.$message.error('交易密码输入错误')
      }
      const res = await this.$axios.post(
        '/finance/userMoney/transferUserMoney',
        null,
        {
          params: {
            userID: this.toUser.userID,
            money: this.money,
            remark: this.remark
          }
        }
      )
      if (res.code === 1001) {
        this.$message.success('转账成功')
        setTimeout(() => {
          location.href = '/bill'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  background: white;
  padding: 15px;
}
ul + div {
  margin-top: 30px;
}
section {
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
