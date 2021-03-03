<template>
  <div>
    <h3>
      <span>当前位置：确认购买</span>
    </h3>
    <div class="submit">
      <el-card v-loading="isLoading" class="box-card">
        <div slot="header" class="clearfix">
          <span>提取卡密</span>
        </div>
        <el-form label-width="130px">
          <el-form-item label="商品名称">
            <div>{{ detail.goodsName }}</div>
          </el-form-item>
          <el-form-item label="注意事项">
            <div>{{ detail.goodsNote }}</div>
          </el-form-item>
          <el-form-item label="商品类型">
            <div>提取卡密</div>
          </el-form-item>
          <el-form-item label="充值数量">
            <el-select v-model="num" placeholder="请选择数量">
              <el-option v-for="i in detail.cardNum" :key="i" :label="i" :value="i">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="购后动作">
            <el-radio-group v-model="action">
              <el-radio :label="1">离开显示在屏幕上</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="购买总价">
            <el-button @click="showPrice = !showPrice" type="text">{{
              showPrice ? '点击隐藏' : '点击查看'
            }}</el-button>
            <span style="margin-left: 10px" v-if="showPrice">¥<em style="margin: 0 10px">{{ total }}</em>元</span>
          </el-form-item>
          <el-form-item label="购买备注">
            <el-input style="width: 600px" type="textarea" :rows="2" placeholder="请输入内容" v-model="remark">
            </el-input>
          </el-form-item>
        </el-form>
        <div style="padding-left: 130px">
          <el-button @click="confirmVisible = true" type="primary">购买</el-button>
          <el-button @click="goBack" style="margin-left: 30px">返回</el-button>
        </div>
      </el-card>
      <el-dialog :visible="confirmVisible" width="600px" title="确认下单" @close="confirmVisible = false">
        <el-form label-width="100px">
          <div style="line-height: 30px; font-weight: 600; margin-left: 32px;" class="tip">
            友情提示：请注意核对用户的充值信息正确性，由于提交信息错误导致充错，用户自行负责！
          </div>
          <el-form-item label="商品名称">
            <div>{{ detail.goodsName }}</div>
          </el-form-item>
          <el-form-item label="注意事项">
            <div>{{ detail.goodsNote }}</div>
          </el-form-item>
          <el-form-item label="商品类型">
            <div>提取卡密</div>
          </el-form-item>
          <el-form-item label="充值数量">
            <div>{{ num }}个</div>
          </el-form-item>
          <el-form-item label="购买备注">
            <div>{{ remark }}</div>
          </el-form-item>
          <el-form-item v-if="hasTradePwd" label="交易密码">
            <el-input style="width: 380px" placeholder="请输入交易密码" v-model="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button style="color: red" type="text" @click="forget"
            >忘记密码？</el-button
          > -->
          <el-button @click="confirmVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'webIn',
  middleware: ['tradePwd'],
  data() {
    return {
      isLoading: true,
      detail: {},
      num: 0,
      action: 1,
      showPrice: false,
      password: '',
      remark: '',
      confirmVisible: false
    }
  },
  computed: {
    ...mapState({
      hasTradePwd: (state) => state.hasTradePwd
    }),
    total() {
      let price = this.detail.goodsPrice * this.num
      price = parseFloat(price.toFixed(3))
      if (isNaN(price)) {
        return 0
      }
      return price
    }
  },
  async mounted() {
    const { id } = this.$route.query
    const dres = await this.$axios.get(`goods/goods/getGoods?goodsID=${id}`)
    if (dres.code === 1001 && dres.body) {
      this.detail = dres.body
      if (this.detail.cardNum > 0) {
        this.num = 1
      }
    }
    this.isLoading = false
  },
  methods: {
    async submit() {
      if (!this.num) {
        return this.$message.error('请选择购买数量')
      }
      if (this.num > this.detail.cardNum) {
        return this.$message.error('卡密库存不足')
      }
      if (this.hasTradePwd && !this.password) {
        return this.$message.error('请输入交易密码')
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const reqData = {
        goodsID: this.detail.goodsID,
        num: this.num
      }
      const res = await this.$axios.post('/order/order/addOrder', null, {
        params: reqData
      })
      if (res.code === 1001 && res.body) {
        this.$message.success('购卡成功')
        setTimeout(() => {
          location.href = `/success?orderID=${res.body.orderID}`
        }, 1500)
      } else {
        if(res.code == 1011){
          this.$confirm('是否进行充值 ? ? ?', '余额不足', {
            confirmButtonText: '充值',
            cancelButtonText: '取消'
          })
            .then(() => {
              //  //console.log('充值')
              location.href = `/charge`
            })
            .catch((action) => {
              //  //console.log('取消')
              loading.close()
            })

        }else if(res.code == 1002){
          return this.$message.error(res.msg)
        }

        // setTimeout(() => {
        //   location.href = `/charge`
        // }, 100)
      }
    },
    goBack() {
      history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  ::v-deep.el-form-item__label {
    text-align: left;
    padding-left: 20px;
  }
  ::v-deep.el-textarea {
    textarea {
      line-height: 30px;
    }
  }
}
.submit {
  .tip {
    padding: 0 !important;
  }
  ::v-deep.el-form-item {
    margin-bottom: 8px;
  }
}
</style>
