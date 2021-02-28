<template>
  <div>
    <h3>
      <span>当前位置： 订单投诉管理</span>
    </h3>
    <section>
      <div class="container menu8-4-container">
        <div class="filter-wrap">
          <el-form :model="queryParams" label-width="80px" :inline="true" size="small">
            <el-form-item>
              <el-input v-model="queryParams.ThemeName" placeholder="投诉主题"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="queryParams.ComplaintState" placeholder="投诉状态" clearable @clear="setValueNull(1)">
                <el-option v-for="item in complaintStateList" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table border row-key="id" ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{
            background: '#f5f5f5',
            color: '#606266',
            'text-align': 'center'
          }" size="mini" :cell-style="{ 'text-align': 'center' }">
          <el-table-column :show-overflow-tooltip="true" type="selection"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="themeName" label="投诉主题"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="userName" label="投诉客户"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="goodsType" label="商品类型">
            <template slot-scope="scope">
              <span v-if="scope.row.goodsType === 1">卡密</span>
              <span v-else>充值</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="goodsType" label="订单号">
            <template slot-scope="scope">
              <span>
                <a type="primary" @click="orderInfo(scope.row.orderID)" style="color:#409eff">{{ scope.row.order && scope.row.order.orderCode }}</a>
              </span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="type" label="销售类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type === 1">平台销售</span>
              <span v-else>对接销售</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="createTime" label="投诉时间"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="label10" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.complaintState === 1" size="mini" @click="lookComplaint(scope.row)">未处理</el-button>
              <el-button type="text" v-else-if="scope.row.complaintState === 2" size="mini" @click="lookComplaint(scope.row)">处理中</el-button>
              <el-button type="text" v-else size="mini" @click="lookComplaint(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>

        <!-- 投诉详情 -->
        <el-dialog title="投诉详情信息" :visible.sync="dialog1" width="60%" class="dialog1 detail-warp" :close-on-click-modal="false">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="类型：">
              <div>{{ complaintInfo.complaintStatecontent }}</div>
            </el-form-item>
            <el-form-item label="投诉客户：">
              <div>{{ complaintInfo.userName }}</div>
            </el-form-item>
            <el-form-item label="投诉时间：">
              <div>{{ complaintInfo.createTime }}</div>
            </el-form-item>
            <el-form-item label="投诉主题：">
              <div>{{ complaintInfo.themeName }}</div>
            </el-form-item>
            <el-form-item label="订单号：">
              <div>
                {{ complaintInfo.order && complaintInfo.order.orderCode }}
              </div>
            </el-form-item>
            <el-form-item label="内容：">
              <el-table border row-key="id" ref="multipleTable" :data="tableDatalist" style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{
                  background: '#f5f5f5',
                  color: '#606266',
                  'text-align': 'center'
                }" size="mini" :cell-style="{ 'text-align': 'center' }">
                <!--  <el-table-column :show-overflow-tooltip="true" type="selection" > </el-table-column> -->
                <el-table-column :show-overflow-tooltip="true" prop="complaintType" label="对象">
                  <template slot-scope="scope">
                    <span v-if="scope.row.complaintType === 1">购买方</span>
                    <span v-else-if="scope.row.complaintType === 2">销售方</span>
                    <span v-else-if="scope.row.complaintType === 3">平台方</span>
                    <span v-else-if="scope.row.complaintType === 4">经营方</span>
                    <span v-else>未知</span>
                  </template>
                </el-table-column>

                <el-table-column :show-overflow-tooltip="true" prop="content" label="内容"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="replyTime" label="时间"></el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="回复内容：" class="mt10">
              <el-input type="textarea" :rows="5" v-model="form.content" placeholder="请输入回复内容"></el-input>
            </el-form-item>
            <!--<el-form-item label="快捷回复：">
          <el-select v-model="form.type" placeholder="请选择">
          </el-select>
            </el-form-item>-->
            <el-form-item label="类型：">
              <el-radio-group v-model="form.complaintState">
                <!-- <el-radio label="1">未处理</el-radio> -->
                <el-radio label="2">处理中</el-radio>
                <el-radio label="3">处理完</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog1 = false">取 消</el-button>
            <el-button type="primary" @click="release">发 布</el-button>
          </span>
        </el-dialog>

        <!-- 查看详情-->
        <el-dialog title="订单详情记录" :visible.sync="dialog2" class="dialog2 wl-dialog-style" @closed="closeOrderInfo">
          <div class="tab-wrap" style="margin-bottom:20px;">
            <a to="sub1" :class="{ active: orderType == 1 }" @click="orderType = 1">订单基本信息</a>
            <a to="sub1" :class="{ active: orderType == 2 }" @click="orderType = 2" v-if="dataInfo.length > 0 && dataInfo[0].orderState < 5">订单处理</a>
            <a to="sub1" :class="{ active: orderType == 3 }" @click="orderType = 3">金额明细</a>
            <a to="sub1" :class="{ active: orderType == 4 }" @click="orderType = 4" v-if="dataInfo.length > 0 && dataInfo[0].orderState == 5">退款明细</a>
            <!-- <a to="sub1" :class="{'active':orderType == 5}" @click="orderType = 5">销售明细</a>-->
            <a to="sub1" :class="{ active: orderType == 6 }" @click="orderType = 6">商务资金明细</a>
          </div>
          <div class="order-type order-type1" v-show="orderType == 1" v-for="value in dataInfo">
            <div class="item">
              <el-alert title="订单信息" type="success" :closable="false"></el-alert>
              <ul>
                <li>
                  <span class="label">订单编号：</span>
                  <span class="val">{{ value.orderCode }}</span>
                </li>
                <li>
                  <span class="label">提交时间：</span>
                  <span class="val">{{ value.createTime }}</span>
                </li>
                <li v-if="value.dealTime">
                  <span class="label">处理时间：</span>
                  <span class="val">{{ value.dealTime }}</span>
                </li>
                <li v-if="value.takeUpTime">
                  <span class="label">订单处理耗时：</span>
                  <span class="val">{{ value.takeUpTime }}</span>
                </li>
                <li>
                  <span class="label">订单状态：</span>
                  <span class="val" style="color:#409EFF">{{
                    value.orderState === 1
                      ? '未处理'
                      : value.orderState === 2
                      ? '处理中'
                      : value.orderState === 3
                      ? '处理完毕'
                      : value.orderState === 4
                      ? '投诉中'
                      : value.orderState === 5
                      ? '已退款'
                      : value.orderState === 6
                      ? '已关闭'
                      : '异常订单'
                  }}</span>
                </li>
                <!-- <li>
              <span class="label">退款记录：</span>
              <span class="val">无退款记录</span>
                </li>-->
              </ul>
            </div>
            <div class="item" v-if="value.supplierName || value.supplierID">
              <el-alert title="供货方" type="success" :closable="false"></el-alert>
              <ul>
                <li>
                  <span class="label" v-if="value.supplierName">订单供货方：</span>
                  <span class="val">{{ value.supplierName }}</span>
                </li>
                <li>
                  <span class="label" v-if="value.supplierID">供货商编号：</span>
                  <span class="val">{{ value.supplierID }}</span>
                </li>
              </ul>
            </div>
            <div class="item">
              <el-alert title="商品信息" type="success" :closable="false"></el-alert>
              <ul v-for="item in value.orderCardVOList">
                <li>
                  <span class="label">商品名称：</span>
                  <span class="val">{{ item.goodsName }}</span>
                </li>
                <li>
                  <span class="label">售价：</span>
                  <span class="val">{{ item.salePrive }}元</span>
                </li>
              </ul>
            </div>
            <div class="item">
              <el-alert title="客户信息" type="success" :closable="false"></el-alert>
              <ul>
                <li>
                  <span class="label">购买客户：</span>
                  <span class="val">{{ value.goodsUserName }}</span>
                </li>
                <li>
                  <span class="label" v-if="value.goodsUserAddr">客户详细：</span>
                  <span class="val">{{ value.goodsUserAddr }}</span>
                </li>
                <li>
                  <span class="label" v-if="value.userMoneyDetail && value.userMoneyDetail.remark">备注：</span>
                  <span class="val">{{
                    value.userMoneyDetail && value.userMoneyDetail.remark
                  }}</span>
                </li>
              </ul>
            </div>
            <!-- <div class="item">
          <el-alert title="充值信息" type="success" :closable="false"></el-alert>
            </div>-->
            <!-- <div class="item">
          <el-alert title="处理信息" type="success" :closable="false"></el-alert>
          <ul>
            <li>
              <span class="label">处理人：</span>
              <span class="val">自动发货</span>
            </li>
            <li>
              <span class="label">充值信息：</span>
              <span class="val">。。。。。</span>
            </li>
          </ul>
            </div>-->
            <div class="item">
              <el-alert title="商品详细及结果" type="success" :closable="false"></el-alert>
              <ul v-for="item in value.orderCardVOList">
                <li>
                  <span class="label">卡号：</span>
                  <span class="val">{{ item.cardNumber }}</span>
                </li>
                <li v-if="item.cardPws">
                  <span class="label">密码：</span>
                  <span class="val">{{ item.cardPws }}</span>
                </li>
                <!-- <li>
              <span class="label">赠品/矩阵：</span>
              <span class="val">永久有效</span>
            </li>
            <li>
              <span class="label">导卡时间：</span>
              <span class="val">	2019-11-20 08:35</span>
                </li>-->
              </ul>
            </div>
          </div>
          <div class="order-type order-type2" v-show="orderType == 2">
            <el-form ref="form1" :model="form1" label-width="140px">
              <el-form-item label="退款类型：" prop="refundType" :rules="[
                  { required: true, message: '请选择退款类型', trigger: 'blur' }
                ]">
                <el-radio-group v-model="form1.refundType">
                  <el-radio :label="1">全退</el-radio>
                  <el-radio :label="2">按张退</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="张数：" prop="num" :rules="[
                  { required: true, message: '请输入退款张数', trigger: 'blur' }
                ]" v-if="form1.refundType == 2">
                <el-input-number class="el-class-number" size="mini" v-model="form.num" controls-position="right" :min="1" :precision="0"></el-input-number>
                <span>张</span>
              </el-form-item>

              <!-- <el-form-item label="处理进度：">
            开始：<el-input v-model="form.tf" style="width:70px;margin-right:20px;"></el-input>
            目标：<el-input v-model="form.tf" style="width:70px;margin-right:20px;"></el-input>
            当前：<el-input v-model="form.tf" style="width:70px"></el-input>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-checkbox v-model="form.tt">置为失败</el-checkbox>
            <span class="tips">仅变更订单状态，不涉及退款</span>
          </el-form-item>
          <el-form-item label="退款方式：">
            <el-radio-group v-model="form.t">
              <el-radio :label="1">供货商承担退款（中间经销商利润、手续费不退回，均由供货商承担.）</el-radio>
              <el-radio :label="2" style="margin-top:10px;">逐层退款（中间经销商利润、手续费逐一退回，会造成中间商赚取的差价被退回。）</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退款类型：">
            <el-radio-group v-model="form.tui">
              <el-radio :label="1">全退</el-radio>
              <el-radio :label="2">部分退</el-radio>
              <el-radio :label="3">按张退</el-radio>
              <el-radio :label="4" disabled>按天退</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退款方式：" v-if="form.tui == 2">
            <el-radio-group v-model="form.tui1">
              <el-radio :label="1">按金额</el-radio>
              <el-radio :label="2">按百分比</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退款-金额：" v-if="form.tui == 2 && form.tui1 == 1">
            <el-input v-model="form.jjj" style="width:200px;"></el-input><span class="tips">元</span>
          </el-form-item>
          <el-form-item label="退款-比例：" v-if="form.tui == 2 && form.tui1 == 2">
            <el-input v-model="form.jjj" style="width:200px;"></el-input><span class="tips">%</span>
          </el-form-item>
          <el-form-item label="退款-卡密：" v-if="form.tui == 3">
            <el-table border row-key="id" ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{background:'#f5f5f5',color:'#606266'}" >
               <el-table-column :show-overflow-tooltip="true" type="selection" > </el-table-column>
               <el-table-column :show-overflow-tooltip="true" prop="label1" label="卡号"  ></el-table-column>
               <el-table-column :show-overflow-tooltip="true" prop="label2" label="密码"></el-table-column>
               <el-table-column :show-overflow-tooltip="true" prop="label3" label="赠品/矩阵" ></el-table-column>
               <el-table-column :show-overflow-tooltip="true" prop="label10" label="导卡时间"></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="40"> </el-pagination>
              </el-form-item>-->
              <el-form-item label>
                <el-button type="primary" @click="confirmRefund('form1')" :loading="loading">确认处理</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="order-type order-type3" v-show="orderType == 3">
            <el-table border row-key="id" ref="multipleTable" :data="tableMoneyData" style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{ background: '#f5f5f5', color: '#606266' }">
              <el-table-column :show-overflow-tooltip="true" prop="orderID" label="订单号"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="label2" label="交易类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.transactionType">{{
                    transactionType(scope.row.transactionType)
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="paySn" label="商户号"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="money" label="交易金额"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="beforeMoney" label="交易前(元)"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="endMoney" label="交易后(元)"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="createTime" label="交易日期"></el-table-column>
            </el-table>
          </div>
          <div class="order-type order-type4" v-show="orderType == 4">
            <el-table border row-key="id" ref="multipleTable" :data="tableRefundData" style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{ background: '#f5f5f5', color: '#606266' }">
              <el-table-column :show-overflow-tooltip="true" prop="money" label="退款金额"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="label2" label="退款类型">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.operType === 1
                      ? '本地退款'
                      : scope.row.operType === 2
                      ? '供货商退款'
                      : '对接退款'
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="label2" label="操作类型">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.refundType === 1 ? '全退' : '按张退'
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="order-type order-type5" v-show="orderType == 5">
            <el-table border row-key="id" ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{ background: '#f5f5f5', color: '#606266' }">
              <el-table-column :show-overflow-tooltip="true" prop="label1" label="销售额"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="label2" label="销售提成"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="label3" label="手续费"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="label1" label="入账金额"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="label2" label="退款额"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="label3" label="进货额"></el-table-column>
            </el-table>
          </div>
          <div class="order-type order-type6" v-show="orderType == 6">
            <el-table border row-key="id" ref="multipleTable" :data="tableSiteMoneyData" style="width: 100%" :header-cell-style="{ background: '#f5f5f5', color: '#606266' }">
              <el-table-column :show-overflow-tooltip="true" prop="orderID" label="订单号"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="label2" label="交易类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.transactionType">{{
                    siteMoneyType(scope.row.transactionType)
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="money" label="交易金额"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="beforeMoney" label="变化前(元)"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="endMoney" label="变化后(元)"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="createTime" label="交易日期"></el-table-column>
            </el-table>
          </div>
          <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="dialog1 = false">发 布</el-button>
          </span>-->
        </el-dialog>
      </div>
    </section>
  </div>
</template>

<script>
import { xmlSyncRequest } from '@/common/utils'
export default {
  layout: 'webIn',
  async asyncData({ $axios }) { },
  data() {
    return {
      orderType: 1,
      tableMoneyData: [], // 资金详情
      tableRefundData: [], // 退款详情
      tableSiteMoneyData: [], // 商务资金明细
      loading: false,
      dataInfo: [],
      color: '#333',
      form1: {},
      form: {
        complaintState: ''
      },
      dialog1: false,
      dialog2: false,
      currentPage: 1,
      checkList: [],
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      complaintStateList: [
        { id: 1, value: '未处理' },
        { id: 2, value: '已受理' },
        { id: 3, value: '处理完毕' }
      ],
      tableData: [],
      tableDatalist: [],
      multipleSelection: [],
      complaintInfo: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 查看订单详情
    orderInfo(id) {
      this.$axios
        .get('/order/order/orderDetails', { params: { orderID: id } })
        .then((res) => {
          if (res.code === 1001) {
            // this.dataInfo = [res.body]
            this.$set(this.dataInfo, 0, res.body)
            this.tableMoneyData = res.body.userMoneyDetails
            this.tableRefundData = res.body.orderRefund
              ? [res.body.orderRefund]
              : []
            this.tableSiteMoneyData = res.body.siteMoneyDetails
            this.dialog2 = true
          }
        })
        .catch((err) => { })
    },
    // 关闭弹窗
    closeOrderInfo() {
      this.orderType = 1
      this.form1 = {}
      this.tableMoneyData = []
      this.tableRefundData = []
      this.tableSiteMoneyData = []
    },
    // 确认退款
    confirmRefund(formName) {
      this.loading = true
      const orderID = this.dataInfo[0].orderID
      if (!orderID) {
        this.$message({
          showClose: true,
          message: '订单异常，请联系客服',
          type: 'error'
        })
        return null
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload
          if (this.form.refundType == 1) {
            payload = { orderID, refundType: this.form.refundType }
          } else {
            payload = { orderID, ...this.form }
          }
          this.$axios
            .post('/order/order/orderRefund', { ...payload })
            .then((res) => {
              if (res.code === 1001) {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'success'
                })
                this.form = {}
                this.orderInfo(orderID)
                this.orderType = 1
                this.getList()
              }
              this.loading = false
            })
            .catch((err) => {
              this.loading = false
            })
        } else {
          this.loading = false
          return false
        }
      })
    },
    // 交易类型
    transactionType(type) {
      switch (type) {
        case 1:
          return '订单扣款'
          break
        case 2:
          return '订单退款'
          break
        case 3:
          return '充值到账'
          break
        case 4:
          return '前台加款'
          break
        case 5:
          return '前台减款'
          break
        case 6:
          return '管理员加款'
          break
        case 7:
          return '管理员减款'
          break
        default:
          return '未知'
      }
    },
    // 交易类型
    siteMoneyType(type) {
      switch (type) {
        case 1:
          return '客户充值'
          break
        case 2:
          return '对接收入'
          break
        case 3:
          return '对接收入退款'
          break
        case 4:
          return '对接支出'
          break
        case 5:
          return '对接支出退款'
          break
        case 6:
          return '站长提现'
          break
        case 7:
          return '站长充值'
          break
        case 8:
          return '投诉冻结'
          break
        case 9:
          return '投诉解冻'
          break
        default:
          return '未知'
      }
    },

    // 获取订单投诉列表
    getList() {
      this.loading = true
      if (!this.queryParams.ThemeName) {
        delete this.queryParams.ThemeName
      }
      this.$axios
        .post('/order/complaint/complaintSupplierPage', this.queryParams)
        .then((res) => {
          if (res.code === 1001) {
            res.body.records.map((item) => {
              if (item.complaintState === 1) {
                item.complaintStatecontent = '未处理'
              } else if (item.complaintState === 2) {
                item.complaintStatecontent = '已处理'
              } else {
                item.complaintStatecontent = '处理完毕'
              }
            })
            this.tableData = res.body.records
            this.total = res.body.total
          }
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
        })
    },

    // 查看投诉内容
    lookComplaint(data) {
      this.$axios
        .post('/order/complaintContent/page', { complaintID: data.complaintID })
        .then((res) => {
          if (res.code === 1001) {
            this.tableDatalist = res.body.records
            this.complaintInfo = data
            this.dialog1 = true
            this.form.complaintState = data.complaintState
          }
        })
        .catch((err) => { })
    },

    // 发布投诉内容
    release() {
      if (!this.form.content) {
        this.$message({
          message: '请输入投诉内容',
          type: 'error'
        })
        return
      }
      if (!this.form.complaintState) {
        this.$message({
          message: '请输入授理类型',
          type: 'error'
        })
        return
      }
      this.$axios
        .post('/order/complaintContent/saveSeller', {
          complaintID: this.complaintInfo.complaintID,
          content: this.form.content,
          complaintState: this.form.complaintState
        })
        .then((res) => {
          if (res.code === 1001) {
            this.$message({
              message: '回复成功',
              type: 'success'
            })
            this.tableDatalist = []
            this.complaintInfo = []
          }
          this.dialog1 = false
        })
        .catch((err) => {
          this.dialog1 = false
        })
    },

    // 清空筛查条件
    setValueNull(val) {
      if (val === 1) {
        delete this.queryParams.ComplaintState
      }
    },

    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.queryParams.pageNum = val
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  padding: 20px;
  .tab-wrap {
    border-bottom: 1px solid #ddd;
    height: 44px;
    a {
      display: inline-block;
      padding: 12px 10px 0 !important;
      height: 100%;
      margin: 0 5px;
      font-size: 15px;
      cursor: pointer;
      color: inherit;
      text-decoration: none;
      &.active {
        border-bottom: 2px solid #409eff;
      }
      &.router-link-active {
        border-bottom: 2px solid #409eff;
      }
    }
  }
  .filter-wrap {
    margin-top: 20px;
    .el-input,
    .el-select {
      width: 130px;
    }
  }
  .handle-wrap {
    // margin-top:20px;
    margin-bottom: 20px;
  }
}
</style>

<style lang="scss">
.menu8-4-container {
  .dialog1 {
    .el-dialog__body {
      overflow: auto;
      max-height: 700px;
    }
    .el-input {
      // width:400px;
    }
  }
  .dialog2 {
    .el-dialog__body {
      overflow: auto;
      max-height: 700px;
    }

    .el-input {
      width: 400px;
    }
    .el-pagination {
      .el-input {
        width: 50px;
      }
    }
    .order-type1 {
      .item {
        margin-top: 20px;
      }
      li {
        display: flex;
        padding: 8px 0;
        // align-items: center;
        .label {
          font-weight: bold;
          margin-right: 10px;
          width: 120px;
          text-align: right;
        }
        .val {
          flex: 1;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
<style scoped lang="scss">
.container {
  padding: 20px;
  .tab-wrap {
    a {
      &.active {
        border-bottom: 2px solid #409eff;
      }
    }
  }
  .filter-wrap {
    margin-top: 20px;
    .el-input,
    .el-select {
      width: 150px;
    }
  }
  .handle-wrap {
    // margin-top:20px;
    margin-bottom: 20px;
  }
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
