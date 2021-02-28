<template>
  <div>
    <h3>
      <span>当前位置：手工订单列表</span>
      <a href="/supply-orders-list">
        <el-button>订单处理明细</el-button>
      </a>
      <a href="/supply-orders">
        <el-button type="primary">手工订单列表</el-button>
      </a>
    </h3>
    <section class="tip">
      <span
        >温馨提示已开通手工订单读单、处理订单的API接口，具体开通方式请咨询平台管理员。此接口适用于使用第三方软件自动化接单的用户。</span
      >
      <a href="/" target="_blank">开发文档下载</a>
    </section>
    <section>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column
          label="选择"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column prop="num" label="商品"></el-table-column>
        <el-table-column prop="name" label="数量"></el-table-column>
        <el-table-column prop="name" label="购买客户"></el-table-column>
        <el-table-column prop="name" label="充值帐号"></el-table-column>
        <el-table-column prop="name" label="充值密码"></el-table-column>
        <el-table-column prop="name" label="备注"></el-table-column>
        <el-table-column prop="name" label="提交时间"></el-table-column>
        <el-table-column prop="name" label="状态详细"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'webIn',
  data() {
    return {
      number: '',
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  methods: {
    handleSelectionChange() {}
  }
}
</script>
