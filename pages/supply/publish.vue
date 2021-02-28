<template>
  <div class="pb-main">
    <h3>
      <span>当前位置：添加商品</span>
    </h3>
    <div class="remind">
      注：以下带
      <strong>*</strong>的内容为必填项
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="商品名称" required>
        <el-input v-model="form.goodsName" style="width: 450px"></el-input>
        <em />
        <el-color-picker v-model="form.color"></el-color-picker>
        <el-checkbox v-model="form.isBlod" label="粗体"></el-checkbox>
        <el-checkbox v-model="form.isHot" label="最热商品"></el-checkbox>
      </el-form-item>
      <el-form-item label="商品面值" required>
        <el-input v-model="form.goodsValue" style="width: 200px"></el-input>
        <em />元
      </el-form-item>
      <el-form-item label="商品类型">
        <el-radio-group v-model="form.goodsTypeID" @change="typeChange">
          <el-radio
            v-for="type in typeList"
            :key="type.key"
            :label="type.key"
            >{{ type.text }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <div v-if="form.goodsTypeID === 2">
        <el-form-item label="系统模版">
          <el-select
            v-model="form.goodsTempID"
            class="sm"
            popper-class="sm-pop"
            placeholder="请选择充值模版"
          >
            <el-option
              v-for="temp in tempList"
              :key="temp.goodsTempID"
              :label="temp.tempName"
              :value="temp.goodsTempID"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="质保天数">
        <el-switch v-model="form.isQuality"></el-switch>
        <em />
        <el-input v-model="form.qualityDay" style="width: 150px;"></el-input>
        <em />天
        <em />
        <span class="tip"
          >输入范围：1-999，此时间段内接受买家申请按天退款和补单</span
        >
      </el-form-item>
      <el-form-item label="商品简介">
        <el-input
          v-model="form.goodsNote"
          type="textarea"
          style="width: 450px"
        ></el-input>
      </el-form-item>
      <el-form-item label="注意事项">
        <el-input
          v-model="form.remark"
          type="textarea"
          style="width: 450px"
        ></el-input>
        <div class="tip">客户购买时候会在第一屏提示，可不填写！</div>
      </el-form-item>
      <el-form-item label="购买数量限制">
        <el-input v-model="form.startCount" style="width: 150px;"></el-input>～
        <el-input v-model="form.endCount" style="width: 150px;"></el-input>
        <em />
        <span class="tip">请填写大于等于1的整数</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认添加</el-button>
        <em />
        <a href="/supply">
          <el-button>返回</el-button>
        </a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'webIn',
  data() {
    return {
      form: {
        goodsName: '',
        color: '',
        isBlod: false,
        isHot: false,
        goodsValue: '',
        isQuality: false,
        qualityDay: '',
        goodsNote: '',
        remark: '',
        startCount: '',
        endCount: '',
        goodsTypeID: 1
      },
      typeList: [],
      tempList: [],
      rules: {
        goodsName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    const { goodsId } = this.$route.query
    const res = await this.$axios.get('/goods/goods/getGoodsTypeList')
    if (res.code === 1001 && res.body) {
      this.typeList = res.body
      if (!goodsId) {
        this.$alert(
          '系统服务商提醒：您所在的网站已为您开通发布供货权限，发布商品是您的权利，但是作为该网站的系统服务商，卡密平台不允许该网站发布、销售违法有害商品，例如：涉及黄、赌、毒、游戏外挂等一切国家法律法规禁止的商品。若您违规发布或出售上述商品，卡密平台有权采取包括但不限于要求商户整改、冻结违法所得资金，暂时封站，永久封站等措施，由此产生的一切法律责任由您及该网站实际运营者承担，与卡密平台无关！特此通知！',
          '提示',
          {
            confirmButtonText: '确定'
          }
        )
      } else {
        const res = await this.$axios.get(
          `goods/goods/getAdminGoods?goodsId=${goodsId}`
        )
        if (res.code === 1001 && res.body) {
          const data = {}
          for (const k in this.form) {
            if ((k === 'isBlod' || k === 'isHot') && res.body[k]) {
              res.body[k] = true
            } else if (k === 'qualityDay' && res.body[k]) {
              data.isQuality = true
            }
            data[k] = res.body[k]
          }
          this.form = data
        }
      }
    }
  },
  methods: {
    async typeChange(val) {
      if (val === 2 && this.tempList.length === 0) {
        const res = await this.$axios.get('/goods/goodsTemp/list')
        if (res.code === 1001 && res.body) {
          this.tempList = res.body
        }
      }
    },
    async onSubmit() {
      const data = { ...this.form }
      if (!data.isQuality || !data.qualityDay) {
        delete data.qualityDay
      }
      delete data.isQuality
      data.isBlod = data.isBlod ? 1 : 0
      data.isHot = data.isHot ? 1 : 0
      const res = await this.$axios.post('/goods/goods/saveGoods', null, {
        params: data
      })
      if (res.code === 1001) {
        this.$message.success('新建成功')
        setTimeout(() => {
          location.href = 'supply/goods-list'
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pb-main {
  .remind {
    background: white;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: 500;
    color: $--basic-orange;
    margin-top: 15px;
    strong {
      margin: 0 5px;
      color: $--deep-orange;
    }
  }
  .el-form {
    margin-top: 15px;
    padding: 20px;
    background: white;
    em {
      margin-right: 20px;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .el-color-picker {
      margin: -3px 20px 0 0;
      vertical-align: middle;
    }
    .el-input {
      ::v-deep input {
        height: 32px;
        line-height: 32px;
        padding: 0 8px;
      }
    }
    .tip {
      line-height: 25px;
      color: #868686;
      font-size: 12px;
    }
  }
}
</style>
