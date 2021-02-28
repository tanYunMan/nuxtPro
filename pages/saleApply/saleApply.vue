<template>
  <div>
    <h3>
      <span>当前位置： 未转余额申请</span>
    </h3>
    <section class="form-body">
      <el-row :gutter="20">
        <el-form
          :model="saleApply"
          ref="saleApply"
          :rules="rules"
          label-width="120px"
          :inline="false"
          size="small"
        >
          <el-col :span="12" :offset="0">
            <el-col :span="24" :offset="0">
              <el-form-item label="输入金额" prop="money">
                <el-input v-model="saleApply.money" placeholder="请输入金额" clearble></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item>
                <span>
                  可转余额
                  <span style="color: red">{{userMoney.saleMoney}}</span> 元
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="24" :offset="0">
              <el-form-item>
                <el-button type="primary" @click="add">提交</el-button>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'webIn',
  async asyncData({ $axios }) {},
  data() {
    var checkMoney = (rule, value, callback) => {
      setTimeout(() => {
        if (value > this.userMoney.saleMoney) {
          callback(new Error('最大不可超过剩余可转余额'))
        } else {
          callback()
        }
      }, 10)
    }
    return {
      saleApply: {},
      rules: {
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { validator: checkMoney, trigger: 'blur' }
        ]
      },
      userMoney: {}
    }
  },
  created() {
    this.getNowMoney()
  },
  methods: {
    add() {
      this.$refs['saleApply'].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/finance/saleMoneyApply/add', this.saleApply)
            .then((res) => {
              this.$message.success(res.msg)
              this.$router.push('/saleApply/saleList')
            })
        } else {
          return false
        }
      })
    },
    getNowMoney() {
      // 获取当前余额
      this.$axios.get('/finance/userMoney/getNowUserMoney').then((res) => {
        this.userMoney = res.body
      })
    }
  }
}
</script>

<style scoped>
.form-body {
  padding: 50px;
}
</style>

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
</style>
