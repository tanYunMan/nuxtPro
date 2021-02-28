<template>
  <el-dialog
    custom-class="gci-dialog"
    title="商品导卡"
    :visible.sync="visible"
    @closed="hide"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="导卡的商品：">
        {{ goods.goodsName }} (2013)，面值：12.0元 [全国]
      </el-form-item>
      <div v-if="step === 1">
        <el-form-item label="点卡内容：" required>
          <el-input
            v-model="form.content"
            class="card-content"
            type="textarea"
          ></el-input>
          <div class="tip-text">
            虚拟卡导入格式为：卡号+空格+密码，如：AAAAA BBBBB
          </div>
        </el-form-item>
        <el-form-item label="选择有无卡号：">
          <el-switch v-model="isCardNum"></el-switch>
        </el-form-item>
        <el-form-item label="供货商名称：">
          <el-input
            v-model="form.supplier"
            style="width: calc(100% - 150px)"
          ></el-input>
        </el-form-item>
        <el-form-item label="进货价格备注：">
          <el-input v-model="form.price" style="width: 220px"></el-input
          ><span style="margin-left: 10px">元</span
          ><span style="margin-left: 10px">面值：12.00</span>
        </el-form-item>
        <el-form-item label="该卡截至有效日期：">
          <el-date-picker
            v-model="form.validDate"
            style="width: 220px"
            type="date"
            clearable
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :style="{ marginBottom: 0 }" label="是否判断重复：">
          <el-checkbox
            v-model="isCardRepeat"
            label="判断(点卡内容)重复"
          ></el-checkbox>
          <el-checkbox
            v-model="form.isRepeat"
            label="判断(库存)重复"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="是否优先销售：">
          <el-checkbox v-model="form.isFirst" label="优先销售"
            >优先销售</el-checkbox
          >
        </el-form-item>
      </div>
      <div v-if="step === 2">
        <el-form-item label="点卡内容：">
          <el-table :data="cardVOList">
            <el-table-column prop="cardNumber" label="卡号"> </el-table-column>
            <el-table-column prop="cardPws" label="密码"> </el-table-column>
            <el-table-column prop="address" label="赠品/矩阵号">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="导入数量：">{{ cardVOList.length }}</el-form-item>
        <el-form-item label="供货商名称：">
          {{ form.supplier }}
        </el-form-item>
        <el-form-item label="该卡截至有效日期：">{{
          cardVOList ? cardVOList[0].validDate : ''
        }}</el-form-item>
      </div>
    </el-form>
    <div style="width: 50%; margin: 0 auto">
      <el-button type="primary" @click="goNext">{{
        step === 2 ? '导入' : '下一步'
      }}</el-button>
      <el-button style="float: right" @click="hide">{{
        step === 2 ? '上一步' : '取消'
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { dateFormat } from '@/common/utils'

export default {
  data() {
    return {
      visible: false,
      goods: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().setHours(0, 0, 0, 0)
        }
      },
      step: 1,
      isCardNum: true,
      isCardRepeat: false,
      form: {
        content: '',
        supplier: '',
        validDate: '',
        isFirst: false,
        isRepeat: false
      },
      rules: {},
      cardVOList: []
    }
  },
  methods: {
    async goNext() {
      if (this.step === 2) {
        const reqData = {
          cardVOList: this.cardVOList,
          goodsID: this.goods.goodsID,
          isFirst: this.form.isFirst ? 1 : 0,
          isRepeat: this.form.isRepeat ? 1 : 0
        }
        const res = await this.$axios.post('/goods/goods/importCard', reqData)
        if (res.code === 1001) {
          this.$message.success('导卡成功')
          this.hide(true)
        }
      } else {
        const contentStr = (this.form.content || '').toString()
        if (contentStr.replace(/\s/g, '') === '') {
          return this.$message.error('请输入点卡内容')
        }
        const arr = contentStr.split(/[(\r\n)\r\n]+/)
        const cardVOList = []
        arr.forEach((item) => {
          const cardArr = item.split(' ')
          if (!this.isCardNum) {
            cardArr.splice(0, 0, '')
          }
          cardVOList.push({
            cardNumber: cardArr[0],
            cardPws: cardArr[1],
            supplier: this.form.supplier,
            price: this.form.price,
            validDate: dateFormat(this.form.validDate.getTime(), 'yyyy-MM-dd')
          })
        })
        this.cardVOList = cardVOList
        this.step = 2
      }
    },
    show(goods) {
      this.goods = goods
      this.visible = true
    },
    hide(close) {
      if (this.step === 1 || close === true) {
        this.step = 1
        this.form = {}
        this.goods = {}
        this.visible = false
      } else {
        this.step = 1
      }
    }
  }
}
</script>

<style lang="scss">
.gci-dialog {
  min-width: 600px;
  .el-dialog__body {
    padding-top: 0px;
    .card-content {
      textarea {
        height: 150px;
        resize: none;
      }
    }
    .tip-text {
      line-height: 25px;
      color: #868686;
      font-size: 12px;
    }
    .el-form-item {
      margin-bottom: 12px;
    }
  }
}
</style>
