<template>
  <div>

    <div class="common-container usercenter-container">
      <navThemes2></navThemes2>

      <div class="usercenter-box">


    <h3>
      <span>当前位置：我的订单</span>
    </h3>
    <div class="filter">
      <el-button class="query" type="primary" @click="doQuery">查询</el-button>
      <select-filter
        ref="s1"
        name="查询条件"
        :options="selectOptions"
      ></select-filter>
      <check-filter
        ref="c1"
        name="订单状态"
        :options="checkOptions"
      ></check-filter>
      <date-filter ref="d1"></date-filter>
    </div>
    <section>
      <el-table v-loading="isLoading" :data="tableData" style="width: 100%">
        <el-table-column
          prop="orderCode"
          label="订单号"
          width="180"
        ></el-table-column>
        <el-table-column label="商品名称" width="180">
          <template slot-scope="{ row }">
            <div style="line-height: 16px">{{ row.goodsName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsTypeName" label="类型"></el-table-column>
        <!-- <el-table-column label="数量">
          <template slot-scope="{ row }">
            {{ row.goodsNum || 0 }}
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="购买单价">
          <template slot-scope="{ row }">{{ row.goodsPrice | n3 }}</template>
        </el-table-column> -->
        <el-table-column label="购买总价">
          <template slot-scope="{ row }">{{ row.orderPrice | n3 }}</template>
        </el-table-column>
        <!-- <el-table-column prop="address" label="充值账号"></el-table-column> -->
        <el-table-column
          prop="goodsUserName"
          label="购卡对象"
        ></el-table-column>
        <el-table-column label="购买日期" width="180">
          <template v-if="row.createTime" slot-scope="{ row }">
            {{ row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="auto">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary" @click="detailShow(row)">
              {{ row.orderState | stateText }}
            </el-button>
            <el-button size="mini" @click="goComplain(row)">{{row.complaintID ? '查看投诉' : '投诉订单'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :page-size="query.pageSize"
        :total="dataTotal"
        @current-change="pageChage"
      >
      </el-pagination>
    </section>
    <orderDetailDialog ref="detail"></orderDetailDialog>

      </div>


    </div>

  </div>
</template>

<script>
import CheckFilter from '@/components/checkFilter'
import DateFilter from '@/components/dateFilter'
import SelectFilter from '@/components/selectFilter'
import orderDetailDialog from '@/components/orderDetailDialog'
import pageMixin from '@/mixins/page'
  import navThemes2 from "./nav-themes2.vue"

const checkOptions = [
  {
    value: '1',
    label: '等待处理'
  },
  {
    value: '2',
    label: '正在处理'
  },
  {
    value: '3',
    label: '交易成功'
  },
  {
    value: '4',
    label: '交易取消'
  }
]

const selectOptions = [
  {
    type: 'select',
    key: 'type',
    options: [
      {
        value: 'orderCode',
        label: '订单号'
      },
      {
        value: 'goodsName',
        label: '商品名称'
      },
      {
        value: 'goodsTypeName',
        label: '商品类型'
      },
      {
        value: 'cardNumber',
        label: '卡号和卡密'
      }
    ]
  },
  { type: 'input', key: 'typeValue', placeholder: '请输入关键字', width: 300 }
]
  export default {
    layout: 'themes2',
    components: {
      navThemes2,
    CheckFilter,
    DateFilter,
    SelectFilter,
    orderDetailDialog
  },
  mixins: [pageMixin],
  data() {
    return {
      checkOptions,
      selectOptions,
      isLoading: true,
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.isLoading = true
      const res = await this.$axios.post('/order/order/myOrder', null, {
        params: this.query
      })
      if (res.code === 1001 && res.body) {
        this.tableData = res.body.records || []
        this.dataTotal = res.body.total
      }
      this.isLoading = false
    },
    doQuery() {
      const s1val = this.$refs.s1.queryVal()
      const c1val = this.$refs.c1.queryVal()
      const d1val = this.$refs.d1.queryVal()
      const query = {}
      if (s1val.typeValue) {
        query[s1val.type] = s1val.typeValue
      }
      if (c1val) {
        query.status = c1val
      }
      this.query = Object.assign(this.query, query, d1val)
      this.getList()
    },
    async detailShow(item) {
      const res = await this.$axios.get(
        `/order/order/orderDetails?orderID=${item.orderID}`
      )
      if (res.code === 1001 && res.body) {
        this.$refs.detail.show(res.body)
      }
    },
    goComplain(order) {
      if (order.complaintID) {
        location.href = '/complain-detail?complaintID=' + order.complaintID
        return
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
  /** layui-v2.5.6 MIT License By https://www.layui.com */
  .layui-inline {
    display: inline-block;
    vertical-align: middle
  }

  h6 {
    font-weight: 400
  }

  .layui-edge,
  .layui-inline {
    position: relative
  }

  .layui-edge {
    overflow: hidden
  }

  .layui-btn,
  .layui-edge,
  .layui-inline {
    vertical-align: middle
  }

  .layui-btn,
  .layui-unselect {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none
  }

  a:active,
  a:hover {
    outline: 0
  }

  table {
    border-collapse: collapse;
    border-spacing: 0
  }

  h6 {
    font-size: 100%
  }

  button,
  input,
  option,
  select {
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    outline: 0
  }

  body {
    line-height: 24px;
    font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif
  }

  a {
    color: #333;
    text-decoration: none
  }

  a:hover {
    color: #777
  }

  .layui-border-box,
  .layui-border-box * {
    box-sizing: border-box
  }

  .layui-inline {
    *display: inline;
    *zoom: 1
  }

  .layui-edge {
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 6px;
    border-style: dashed;
    border-color: transparent
  }

  .layui-hide {
    display: none !important
  }

  .layui-btn,
  .layui-input {
    outline: 0;
    -webkit-appearance: none;
    transition: all .3s;
    -webkit-transition: all .3s;
    box-sizing: border-box
  }

  .layui-form-label,
  .layui-form-select {
    position: relative
  }

  .layui-input {
    border-color: #e6e6e6
  }

  .layui-btn {
    display: inline-block;
    height: 38px;
    line-height: 38px;
    padding: 0 18px;
    background-color: #1e9fff;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    cursor: pointer
  }

  .layui-btn:hover {
    opacity: .8;
    filter: alpha(opacity=80);
    color: #fff
  }

  .layui-btn:active {
    opacity: 1;
    filter: alpha(opacity=100)
  }

  .layui-btn-normal {
    background-color: #1E9FFF
  }

  .layui-btn-sm {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 12px
  }

  .layui-btn-group {
    display: inline-block;
    vertical-align: middle;
    font-size: 0
  }

  .layui-btn-group .layui-btn {
    margin-left: 0 !important;
    margin-right: 0 !important;
    border-left: 1px solid rgba(255, 255, 255, .5);
    border-radius: 0
  }

  .layui-btn-group .layui-btn:first-child {
    border-left: none;
    border-radius: 2px 0 0 2px
  }

  .layui-btn-group .layui-btn:last-child {
    border-radius: 0 2px 2px 0
  }

  .layui-input {
    height: 38px;
    line-height: 1.3;
    line-height: 38px\9;
    border-width: 1px;
    border-style: solid;
    background-color: #fff;
    border-radius: 2px
  }

  .layui-input::-webkit-input-placeholder {
    line-height: 1.3
  }

  .layui-input {
    display: block;
    width: 100%;
    padding-left: 10px
  }

  .layui-input:hover {
    border-color: #D2D2D2 !important
  }

  .layui-input:focus {
    border-color: #C9C9C9 !important
  }

  .layui-form select {
    display: none
  }

  .layui-form-item {
    margin-bottom: 15px;
    clear: both;
    *zoom: 1
  }

  .layui-form-item:after {
    content: '\20';
    clear: both;
    *zoom: 1;
    display: block;
    height: 0
  }

  .layui-form-label {
    float: left;
    display: block;
    padding: 9px 15px;
    width: 80px;
    font-weight: 400;
    line-height: 20px;
    text-align: right
  }

  .layui-form-item .layui-inline {
    margin-bottom: 5px;
    margin-right: 10px
  }

  .layui-form-select .layui-input {
    padding-right: 30px;
    cursor: pointer
  }

  .layui-form-select .layui-edge {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -3px;
    cursor: pointer;
    border-width: 6px;
    border-top-color: #c2c2c2;
    border-top-style: solid;
    transition: all .3s;
    -webkit-transition: all .3s
  }

  .layui-form-select dl {
    display: none;
    position: absolute;
    left: 0;
    top: 42px;
    padding: 5px 0;
    z-index: 899;
    min-width: 100%;
    border: 1px solid #d2d2d2;
    max-height: 300px;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    box-sizing: border-box
  }

  .layui-form-select dl dd {
    padding: 0 10px;
    line-height: 36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  .layui-form-select dl dd {
    cursor: pointer
  }

  .layui-form-select dl dd:hover {
    background-color: #f2f2f2;
    -webkit-transition: .5s all;
    transition: .5s all
  }

  .layui-form-select dl dd.layui-this {
    background-color: #5FB878;
    color: #fff
  }

  @media screen and (max-width:450px) {
    .layui-form-item .layui-form-label {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap
    }

    .layui-form-item .layui-inline {
      display: block;
      margin-right: 0;
      margin-bottom: 20px;
      clear: both
    }

    .layui-form-item .layui-inline:after {
      content: '\20';
      clear: both;
      display: block;
      height: 0
    }
  }

  .layui-table,
  .layui-table-view {
    margin: 10px 0
  }

  .layui-table {
    width: 100%;
    background-color: #fff;
    color: #666
  }

  .layui-table tr {
    transition: all .3s;
    -webkit-transition: all .3s
  }

  .layui-table th {
    text-align: left;
    font-weight: 400
  }

  .layui-table thead tr,
  .layui-table-header {
    background-color: #f2f2f2
  }

  .layui-table th,
  .layui-table-header,
  .layui-table-page,
  .layui-table-view {
    border-width: 1px;
    border-style: solid;
    border-color: #e6e6e6
  }

  .layui-table th {
    position: relative;
    padding: 9px 15px;
    min-height: 20px;
    line-height: 20px;
    font-size: 14px
  }

  .layui-table-box {
    position: relative;
    overflow: hidden
  }

  .layui-table-view .layui-table {
    position: relative;
    width: auto;
    margin: 0
  }

  .layui-table-view .layui-table th {
    padding: 5px 0;
    border-top: none;
    border-left: none
  }

  .layui-table-header {
    border-width: 0 0 1px;
    overflow: hidden
  }

  .layui-table-header .layui-table {
    margin-bottom: -1px
  }

  .layui-table-cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .layui-table-cell {
    height: 28px;
    line-height: 28px;
    padding: 0 15px;
    position: relative;
    box-sizing: border-box
  }

  .layui-table-body {
    position: relative;
    overflow: auto;
    margin-right: -1px;
    margin-bottom: -1px
  }

  .layui-table-body .layui-none {
    line-height: 26px;
    padding: 15px;
    text-align: center;
    color: #999
  }

  .layui-table-page {
    border-width: 1px 0 0;
    margin-bottom: -1px;
    overflow: hidden
  }

  .layui-table-page {
    position: relative;
    width: 100%;
    padding: 7px 7px 0;
    height: 41px;
    font-size: 12px;
    white-space: nowrap
  }

  .layui-table-page>div {
    height: 26px
  }

  .layui-anim {
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }

  @-webkit-keyframes layui-upbit {
    from {
      -webkit-transform: translate3d(0, 30px, 0);
      opacity: .3
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      opacity: 1
    }
  }

  @keyframes layui-upbit {
    from {
      transform: translate3d(0, 30px, 0);
      opacity: .3
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
  }

  .layui-anim-upbit {
    -webkit-animation-name: layui-upbit;
    animation-name: layui-upbit
  }

  @font-face {
    font-family: "iconfont";
    src: url('//at.alicdn.com/t/font_1451715_0505c2bxv7b7.eot?t=1590297999808');
    /* IE9 */
    src: url('//at.alicdn.com/t/font_1451715_0505c2bxv7b7.eot?t=1590297999808#iefix') format('embedded-opentype'),
      /* IE6-IE8 */
      url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
      url('//at.alicdn.com/t/font_1451715_0505c2bxv7b7.woff?t=1590297999808') format('woff'),
      url('//at.alicdn.com/t/font_1451715_0505c2bxv7b7.ttf?t=1590297999808') format('truetype'),
      /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('//at.alicdn.com/t/font_1451715_0505c2bxv7b7.svg?t=1590297999808#iconfont') format('svg');
    /* iOS 4.1- */
  }


  .layui-table-cell {
    padding: 0
  }

  .laytable-cell-1-price {
    width: 70px;
  }

  .laytable-cell-1-_create_time {
    width: 127px;
  }

  .laytable-cell-1-6 {
    width: 64px;
  }

  .layui-table th {
    padding: 0
  }

  body {
    position: relative;
    background: #f2f3f5;
    min-width: 1200px;
  }

  body::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  body::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  /*鏂版坊鍔犵殑鏍峰紡*/

  .common-items-header {
    position: relative;
    padding: 10px 0;
    border-bottom: 1px solid #f1f0f4;
  }


  .common-items-header .layui-btn-group {
    position: absolute;
    right: 0px;
    top: 5px;
  }

  /*鏂版坊鍔犵殑鏍峰紡*/




  /*鍏辩敤header澶�*/

  /*1200px瀹氬*/
  .common-container {
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }

  /*鍏辩敤鍏ㄥ睆*/

  /*鏂囧瓧鍗曡瓒呭嚭鏄剧ず...*/

  /*鍥哄畾搴曢儴璺濈10px*/


  /*搴曢儴css*/

  /*鐢ㄦ埛鐧诲綍浠ュ強娉ㄥ唽*/

  /*閲嶆柊layui閮ㄥ垎鏍峰紡*/

  .layui-input:focus {
    border: 1px solid #1E9FFF !important;
  }

  .layui-input {
    font-size: 12px;
    height: 34px;
    line-height: 34px;
  }

  .usercenter-container {
    position: relative;
    overflow: hidden;
    padding: 10px 0;
    box-sizing: border-box;
  }

  .layui-form-label {
    font-size: 12px;
    line-height: 16px;
  }

  .layui-btn-sm {
    height: 30px;
    line-height: 30px;
  }

  .layui-form-item {
    margin-bottom: 10px;

  }

  .layui-form-select dl dd.layui-this {
    background: #1E9FFF;
  }



  .layui-input {
    height: 31px;
    line-height: 31px\9;
  }

  .layui-form-select dl {
    top: auto;
    padding: 0;
  }

  .layui-table,
  .layui-table-view {
    margin-top: 0;
  }

  .layui-table-page>div {
    text-align: right;
  }

  .layui-table-cell {
    font-size: 12px;
  }

  /*閲嶆柊閫夐」鍗�*/







  /*鍏朵粬鏍峰紡*/
  .common-title {
    position: relative;
    font-size: 16px;
    line-height: 30px;
  }

  .common-title:before {
    content: '';
    display: inline-block;
    vertical-align: -3px;
    background-color: #1E9FFF;
    width: 3px;
    height: 17px;
    border-radius: 2px;
    margin-right: 15px;
  }

  .common-usercenter-box {
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    background: white;
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  /*.index-items-list ul li:nth-last-child(1){
  	margin-right: 0;
  }*/

  .usercenter-box {
    position: relative;
    width: 980px;
    float: left;
    margin-left: 10px;
    h3{
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      color: #010101;
      background: white;
      margin-bottom: 15px;
      span{
        padding-left: 26px;
            border-left: 4px solid #409eff;
      }
    }
    .filter{
          padding: 6px 15px;
          background: white;
          margin: 10px 0;
          & > button{
            float: right;
                padding: 10px 15px;
    margin: 5px 0 0;          }

    & + section{
      background-color: #fff;
      & > div + div{
        text-align: right;
            padding: 20px;    margin-top: 15px;

      }
    }
    }
  }


  /*鐢ㄦ埛璧勬枡淇敼*/

  /*.goodsbox-goodsinfo p:nth-child(2){
  	font-weight: 600;
  } */











  /*axin 2019/1/11 鏂板css*/

  /*閲嶅啓鏍峰紡绫�*/


  /*2019/1/15鐧诲綍娉ㄥ唽*/



  /*ba*/

  /*.newindex-cats ul li{position: relative;}*/




  /*madestyle3*/




  /*鏂板鍓嶅彴椋庢牸*/

  /*鐧诲綍娉ㄥ唽 end*/
</style>
