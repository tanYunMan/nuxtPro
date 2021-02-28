<template>
  <div class="detail-wrapper">
    <h4>商品情况</h4>
    <el-row>
      <el-col :span="24">
        <span>商品名称：</span>
        <span>{{ order.goodsName }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <span>商品类型：</span>
        <span>{{ order.goodsTypeName }}</span>
      </el-col>
      <el-col :span="12">
        <span>商品面值：</span>
        <span>{{ order.goodsPrice | n3 }}</span></el-col
      >
    </el-row>
    <h4>订单详细</h4>
    <el-row>
      <el-col :span="12">
        <span>订单号：</span>
        <span>{{ order.orderCode }}</span>
      </el-col>
      <el-col :span="12">
        <span>订单状态：</span>
        <em class="red">{{ order.orderState | stateText }}</em>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <span>购买数量：</span>
        <span>{{ order.goodsNum || 0 }}</span>
      </el-col>
      <el-col :span="12">
        <span>购买金额：</span>
        <span>{{ order.goodsPrice | n3 }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <span>购买对象：</span>
        <span>{{ order.goodsUserName }}</span>
      </el-col>
      <el-col :span="12">
        <span>购买者IP：</span>
        <span>{{ order.goodsUserIP }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"
        ><span>购买时间：</span
        ><template v-if="order.createTime">{{
          order.createTime | dateFormat
        }}</template></el-col
      >
      <el-col :span="12"
        ><span>处理时间：</span
        ><template v-if="order.dealTime">{{
          order.dealTime | dateFormat
        }}</template></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24">
        <span>订单处理耗时：</span>
        <template v-if="order.dealTime > order.createTime"
          >{{ (order.dealTime - order.createTime) / 1000 }}s</template
        >
        <template v-else>0s</template>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span>购买备注：</span>
        <span>{{ order.remark }}</span>
      </el-col>
    </el-row>
    <h4>购买内容</h4>
    <el-row>
      <el-col :span="12"
        ><span>复制内容：</span
        ><em @click="doCopy" class="green">复制卡密</em></el-col
      >
      <el-col :span="12"
        ><span>充值信息：</span><em class="blue">购后取卡成功</em></el-col
      >
    </el-row>
    <el-table v-if="order" :data="order.orderCardVOList">
      <el-table-column label="类型">
        <template>{{ order.goodsTypeName }}</template>
      </el-table-column>
      <el-table-column prop="cardNumber" label="卡号"></el-table-column>
      <el-table-column prop="cardPws" label="密码"></el-table-column>
      <!-- <el-table-column prop="" label="到期时间"></el-table-column> -->
      <!-- <el-table-column prop="" label="赠品/矩阵"></el-table-column> -->
    </el-table>
    <h4>订单管理</h4>
    <el-row>
      <el-col :span="12"
        ><span>投诉：</span
        ><el-button size="mini" type="primary" @click="goComplain(order)"
          >投诉订单</el-button
        ></el-col
      >
      <el-col :span="12"><span>退款：</span>无退款记录</el-col>
    </el-row>
    <h4>
      金额明细【查看详情】
      <em class="red" style="float: right; font-size: 14px;"
        >订单有问题请先点击下方投诉按钮进行投诉，长时间不回复请联系客服QQ</em
      >
    </h4>
    <el-table :data="order.userMoneyDetails">
      <el-table-column
        prop="transactionTypeName"
        label="交易类型"
      ></el-table-column>
      <el-table-column label="变动类型">
        <template slot-scope="{ row }">
          {{ row.money >= 0 ? '增加' : '减少' }}
        </template>
      </el-table-column>
      <el-table-column prop="money" label="交易金额"></el-table-column>
      <el-table-column
        prop="beforeMoney"
        label="变化前（元）"
      ></el-table-column>
      <el-table-column prop="endMoney" label="变化后（元）"></el-table-column>
      <el-table-column label="交易日期" width="180">
        <template slot-scope="{ row }">
          {{ row.createTime | dateFormat }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  methods: {
    goComplain(order) {
      this.$confirm(
        '“卡密平台”仅为系统服务商，不参与商户经营，您与商户产生纠纷，请自行协商解决，但“卡密平台”不允许商户出售违法违规商品，一旦您发现商户出售该等商品，可向执法机关举报，也可向“卡密平台”投诉，投诉方式：tousu.xxxx.com，“卡密平台”将保留相关证据并呈交给执法机关！',
        '提示',
        {
          confirmButtonText: '我知道了',
          showCancelButton: false,
          type: 'warning'
        }
      ).then(() => {
        location.href = `/complain-submit?orderID=${order.orderID}&orderCode=${order.orderCode}`
      })
    },
    doCopy() {
      const arr = []
      const cardList = this.order.orderCardVOList || []
      cardList.forEach((item) => {
        arr.push(`${item.cardNumber}/${item.cardPws}`)
      })
      copy(arr.join(';'))
      this.$message.success('复制成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-wrapper {
  font-size: 13px;
}
h4 {
  font-size: 16px;
  line-height: 40px;
  color: $--deep-orange;
}
div + h4 {
  margin-top: 15px;
}
.el-row {
  line-height: 35px;
  .el-col > span:first-child {
    display: inline-block;
    vertical-align: top;
    width: 120px;
    color: #333;
    background: #f1f1f1;
    text-align: right;
    margin-right: 10px;
  }
}
.red {
  font-weight: 600;
  color: $--alert-red;
}
.green {
  cursor: pointer;
  color: $--basic-green;
  font-weight: 600;
}
.blue {
  color: $--color-primary;
  font-weight: 600;
}
</style>
