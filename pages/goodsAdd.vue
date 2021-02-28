<template>
  <div>
    <h3>
      <span>当前位置： 商品添加</span>
    </h3>
    <section class="form-body">
      <el-row :gutter="20">
        <el-form
          :model="goods"
          ref="goods"
          :rules="rules"
          label-width="120px"
          :inline="false"
          size="small"
        >
          <el-col :span="12" :offset="0">
            <el-col :span="24" :offset="0">
              <el-form-item label="商品名称" prop="goodsName">
                <div style="display: flex;justify-content: space-between;">
                  <el-input
                    style="width: 80%"
                    v-model="goods.goodsName"
                    placeholder="请输入商品名称"
                    clearble
                  ></el-input>
                  <el-color-picker v-model="goods.color"></el-color-picker>
                  <el-checkbox v-model="goods.blod">粗体</el-checkbox>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="商品类型" prop="goodsTypeID">
                <el-radio-group v-model="goods.goodsTypeID">
                  <el-radio :label="1">卡密</el-radio>
                  <el-radio :label="2">充值</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item v-if="goods.goodsTypeID===2" label="商品模板" prop="goodsTempID">
                <el-select style="width: 100%" v-model="goods.goodsTempID" clearable filterable>
                  <el-option
                    v-for="item in templateList"
                    :key="item.goodsTempID"
                    :label="item.tempName"
                    :value="item.goodsTempID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="质保天数">
                <el-input-number
                  style="width: 100%"
                  controls-position="right"
                  v-model="goods.qualityDay"
                  placeholder="请输入质保天数"
                  clearble
                />
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="商品成本价" prop="goodsPrice">
                <el-input v-model="goods.goodsPrice" placeholder="请输入商品名称" clearble></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="购买数量限制">
                <el-row>
                  <el-col :span="11" :offset="0">
                    <el-input-number
                      style="width: 100%"
                      controls-position="right"
                      :min="1"
                      v-model="goods.startCount"
                      clearble
                    />
                  </el-col>
                  <el-col :span="2" :offset="0">
                    <div style="text-align: center">——</div>
                  </el-col>
                  <el-col :span="11" :offset="0">
                    <el-input-number
                      style="width: 100%"
                      controls-position="right"
                      v-model="goods.endCount"
                      clearble
                    />
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="注意事项">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入商品介绍"
                  v-model="goods.goodsNote"
                  clearble
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="商品介绍">
                <el-input
                  type="textarea"
                  v-model="goods.remark"
                  maxlength="300"
                  show-word-limit
                  placeholder="买家下单时需要确认阅读此信息才可购买"
                  :rows="6"
                  clearble
                ></el-input>
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
import { xmlSyncRequest } from '@/common/utils'
export default {
  layout: 'webIn',
  async asyncData({ $axios }) {},
  data() {
    return {
      goods: {},
      templateList: [],
      rules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goodsTypeID: [
          { required: true, message: '请选择商品类型', trigger: 'blur' }
        ],
        goodsPrice: [
          { required: true, message: '请输入商品成本价', trigger: 'blur' }
        ],
        goodsTempID: [
          { required: true, message: '请选择商品模板', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTemplate()
  },
  methods: {
    add() {
      this.$refs['goods'].validate((valid) => {
        if (valid) {
          if (this.goods.blod) {
            this.goods.isBlod = 1
          } else {
            this.goods.isBlod = 0
          }
          this.$axios
            .post('/goods/goods/saveSupplierGoods', null, {
              params: this.goods
            })
            .then((res) => {
              this.$message.success(res.msg)
              this.$router.push('/goodsList')
            })
        } else {
          return false
        }
      })
    },
    getTemplate() {
      this.$axios.get('/goods/goodsTemp/goodsTempList').then((res) => {
        this.templateList = res.body
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
.el-button {
  margin: 15px 0 0;
  width: 150px;
}
</style>
