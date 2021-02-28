<template>
  <el-dialog
    custom-class="gp-dialog"
    title="商品定价"
    :visible.sync="visible"
    @closed="hide"
  >
    <el-form
      v-if="form.list"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item label="商品：">(2013)，面值：12.0元 [全国] </el-form-item>
      <el-form-item label="面值：">
        <span class="gp-w200">12</span>
        <el-select
          size="small"
          placeholder="请选择定价方案"
          :value="type"
          @change="onBaseTypeChange"
        >
          <el-option value="add" label="定价方案一（直接累加）"></el-option>
          <el-option value="bid" label="定价方案二（进价折扣）"></el-option>
          <el-option value="fix" label="定价方案三（固定定价）"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="(item, idx) in form.list"
        :key="item.goodsPriceID"
        :label="`${item.userLevelVO.levelName}：`"
      >
        <span class="gp-w200">
          <span>{{ item.price }}元</span>
          <span v-if="item.percent" style="marginLeft: 10px" class="gp-red">{{
            item.percent
          }}</span>
        </span>
        <el-select
          size="small"
          placeholder="请选择定价方案"
          :value="item.type"
          @change="onItemTypeChange($event, item, idx)"
        >
          <el-option value="add" label="定价方案一（直接累加）"></el-option>
          <el-option value="bid" label="定价方案二（进价折扣）"></el-option>
          <el-option value="fix" label="定价方案三（固定定价）"></el-option>
        </el-select>
        &nbsp;
        <el-input
          :value="item.extPrice"
          style="width: 80px"
          size="small"
          @input="onItemPriceChange($event, item, idx)"
        ></el-input
        >&nbsp;元&nbsp;+&nbsp;我的进货价
        <span v-if="item.warn" class="gp-red">下级购价不能小于上级购价</span>
      </el-form-item>
      <el-form-item label="全网供货价：">
        <el-input
          v-model="form.price"
          style="width: 250px"
          size="small"
        ></el-input
        >元
      </el-form-item>
      <el-form-item label="成本价：">
        <el-input
          :value="form.bidPrice"
          style="width: 250px"
          size="small"
          @input="onBidPriceChange"
        ></el-input
        >元
      </el-form-item>
      <div class="el-form-item" style="height: 41px">
        <span
          style="height: 40px; width: 150px"
          class="el-form-item__label"
        ></span>
        <el-button type="primary" @click="setGoodsPrice">确认定价</el-button>
      </div>
      <el-form-item label="自动填写：">
        <span class="gp-red">1、按直接累加递增</span
        ><el-input
          v-model="price.add"
          size="small"
          style="width: 80px"
        ></el-input
        ><span class="gp-red">元</span>&nbsp;<el-button
          style="padding: 9px"
          size="small"
          type="primary"
          @click="onBaseTypeChange('add')"
          >填写</el-button
        >&nbsp;<span class="gp-red">2、按进价折扣递增</span
        ><el-input
          v-model="price.bid"
          size="small"
          style="width: 80px"
          @click="onBaseTypeChange('bid')"
        ></el-input
        ><span class="gp-red">%</span>&nbsp;<el-button
          style="padding: 9px"
          size="small"
          type="primary"
          >填写</el-button
        >&nbsp;<span class="gp-red">3、按固定定价</span
        ><el-input
          v-model="price.fix"
          size="small"
          style="width: 80px"
        ></el-input
        ><span class="gp-red">元</span>&nbsp;<el-button
          style="padding: 9px"
          size="small"
          type="primary"
          @click="onBaseTypeChange('fix')"
          >填写</el-button
        >
      </el-form-item>
      <div class="title">批量折扣</div>
      <div>
        大于&nbsp;
        <el-input v-model="deal.up" size="small" style="width: 80px"></el-input
        >&nbsp; 个&nbsp;&nbsp;小于等于&nbsp;
        <el-input
          v-model="deal.down"
          size="small"
          style="width: 80px"
        ></el-input
        >&nbsp; 个&nbsp;&nbsp;折扣&nbsp;<el-input
          v-model="deal.value"
          size="small"
          style="width: 80px"
        ></el-input
        >&nbsp;%(售价=原价*折扣)&nbsp;&nbsp;&nbsp;&nbsp;<el-button
          size="small"
          type="primary"
          @click="addDeal"
          >确定</el-button
        >
      </div>
      <ul style="line-height: 30px;padding: 10px 0;">
        <li
          v-for="(item, idx) in form.deals"
          :key="idx"
          style="margin-bottom: 5px"
        >
          <span style="display: inline-block; width: 25%"
            >大于{{ item.up }}个</span
          >
          <span style="display: inline-block; width: 25%"
            >小于等于{{ item.down }}个</span
          >
          <span style="display: inline-block; width: 25%"
            >折扣价{{ item.value }}%</span
          >
          <el-button
            style="padding: 5px 9px;"
            size="small"
            type="danger"
            @click="deleteDeal(idx)"
            >删除</el-button
          >
        </li>
      </ul>
      <div class="desc">
        <el-form-item label="定价方案一(直接累加)：">
          <div>对应定价 = 进货价 + 累加金额</div>
          <p class="gp-red">
            比如面值是10元，进价是8元的商品，输入累加金额1元，那么定价就是9元。
          </p>
        </el-form-item>
        <el-form-item label="定价方案二(进价折扣)：">
          <div>对应定价 = 进货价 + 进价价 x 比例</div>
          <p class="gp-red">
            比如面值是10元，进价是8元的商品，比如填入10%（进价的10%=0.8元），那么定价就是8+0.8=8.8元。
          </p>
        </el-form-item>
        <el-form-item label="定价方案三(面值折扣)：">
          <div>对应定价 = 进货价 + 面值 x 比例</div>
          <p class="gp-red">
            比如面值是10元，进价是8元的商品，比如填入10%（面值的10%=1元），那么定价就是8+1=9元。
          </p>
        </el-form-item>
        <el-form-item label="定价方案四(固定定价)：">
          <div>对应定价 = 设定的价格</div>
          <p class="gp-red">
            比较传统的定价方案，但是当货源价格调整时（如SUP进价变动），改价格会是比较麻烦的一件事，不推荐使用。
          </p>
        </el-form-item>
        <el-form-item label="定价方案五(固定折扣)：">
          <div>对应定价 = 面值 x 比例</div>
          <p class="gp-red">
            比如面值是10元，比如填入10%（面值的10%=1元），那么定价就是1元。
          </p>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      ids: [],
      form: {
        list: null,
        price: 0,
        bidPrice: 0,
        deals: []
      },
      rules: {},
      type: '',
      price: {
        add: 0.3,
        bid: 1,
        fix: 1
      },
      deal: {
        up: '',
        down: '',
        value: ''
      }
    }
  },
  methods: {
    async show(goodsIds) {
      this.visible = true
      this.ids = goodsIds
      if (goodsIds.length > 1) {
      } else if (goodsIds.length === 1) {
        const res = await this.$axios.get('/goods/goods/getGoodsPrice', {
          goodsID: goodsIds[0]
        })
        if (res.code === 1001 && res.body) {
          if (res.body.length > 0) {
            this.form.bidPrice = res[0].goodsPrice || 0
            this.form.price = res[0].supplyPrice || 0
            res.body.forEach((item) => {
              item.price = item.price || 0
              item.extPrice = item.price - this.form.bidPrice
              if (item.price) {
                item.percent = `${((item.price / 12) * 100).toFixed(3)}%`
              }
            })
          }
        }
        this.form.list = res.body
      }
    },
    hide() {
      this.visible = false
      this.ids = []
      this.form = {
        list: null,
        price: 0,
        bidPrice: 0,
        deals: []
      }
      this.price = { add: 0.3, bid: 1, fix: 1 }
      this.deal = {
        up: '',
        down: '',
        value: ''
      }
    },
    onBaseTypeChange(val) {
      let price = parseFloat(this.form.bidPrice)
      let ext = 0
      const list = this.form.list
      if (val === 'add') {
        for (let i = list.length - 1; i >= 0; i--) {
          const add = parseFloat(this.price.add)
          price += add
          ext += add
          price = parseFloat(price.toFixed(3))
          list[i].price = price
          list[i].extPrice = parseFloat(ext.toFixed(3))
          list[i].type = val
          list[i].warn = false
        }
      } else if (val === 'bid') {
        for (let i = list.length - 1; i >= 0; i--) {
          const bid = parseFloat(this.price.bid) / 100
          const add = bid * parseFloat(this.form.bidPrice)
          price += add
          ext += add
          price = parseFloat(price.toFixed(3))
          list[i].price = price
          list[i].extPrice = parseFloat(ext.toFixed(3))
          list[i].type = val
          list[i].warn = false
        }
      } else if (val === 'fix') {
        const fix = parseFloat(this.price.fix)
        price = parseFloat((price + fix).toFixed(3))
        list.forEach((item) => {
          item.price = price
          item.extPrice = parseFloat(fix.toFixed(3))
          item.type = val
          item.warn = false
        })
      }
      this.form.price = price
      this.type = val
    },
    onItemTypeChange(val, item, idx) {
      item.type = val
      const price = parseFloat(this.form.bidPrice || 0)
      if (val === 'add') {
        const add = parseFloat(this.price.add)
        item.price = parseFloat((price + add).toFixed(3))
        item.extPrice = parseFloat(add.toFixed(3))
      } else if (val === 'bid') {
        const bid = parseFloat(this.price.bid) / 100
        const add = bid * price
        item.price = parseFloat((price + add).toFixed(3))
        item.extPrice = parseFloat(add.toFixed(3))
      } else if (val === 'fix') {
        const fix = parseFloat(this.price.fix)
        item.price = parseFloat((price + fix).toFixed(3))
        item.extPrice = parseFloat(fix.toFixed(3))
      }
      const next = this.form.list[idx + 1]
      item.warn = next ? item.price < next.price : false
    },
    onItemPriceChange(val, item, idx) {
      const price = Number(val || 0)
      if (!isNaN(price)) {
        const bidPrice = parseFloat(this.form.bidPrice || 0)
        item.extPrice = val
        item.price = parseFloat((bidPrice + price).toFixed(3))
        const next = this.form.list[idx + 1]
        item.warn = next ? item.price < next.price : false
      }
    },
    onBidPriceChange(val) {
      const price = Number(val || 0)
      if (!isNaN(price)) {
        this.form.bidPrice = val
        const list = this.form.list
        list.forEach((item, idx) => {
          item.price = parseFloat((item.extPrice + price).toFixed(3))
          if (idx === 0) {
            this.form.price = item.price
          }
        })
      }
    },
    addDeal() {
      if (this.deal.up && this.deal.down && this.deal.value) {
        this.form.deals.push({
          ...this.deal
        })
      }
    },
    deleteDeal(idx) {
      this.form.deals.splice(idx, 1)
    },
    async setGoodsPrice() {
      const params = []
      for (let i = 0; i < this.form.list.length; i++) {
        const item = this.form.list[i]
        if (item.warn) {
          return this.$message.error('下级购价不能小于上级购价，请重新输入')
        }
        params.push({
          goodsID: item.goodsID,
          price: item.price,
          supplyPrice: Number(this.form.price),
          goodsPrice: Number(this.form.bidPrice),
          levelID: item.levelID
        })
      }
      const res = await this.$axios.post('/goods/goods/saveGoodsPrice', params)
      if (res.code === 1001) {
        this.$message.success('商品定价完成')
        this.hide()
      }
    }
  }
}
</script>

<style lang="scss">
.gp-dialog {
  min-width: 1000px;
  .el-form-item {
    margin-bottom: 0;
    .el-form-item__label {
      background: #f1f1f1;
      margin-right: 5px;
    }
    .gp-w200 {
      width: 200px;
      display: inline-block;
    }
    .gp-red {
      color: $--alert-red;
    }
  }
  .title {
    color: $--basic-orange;
    line-height: 30px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  .desc {
    margin-top: 15px;
    border: 1px solid $--basic-border-color;
    .el-form-item__content {
      line-height: 21px;
    }
    .el-form-item__content,
    .el-form-item__label {
      font-size: 12px;
    }
  }
}
</style>
