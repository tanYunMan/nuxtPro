<template>
  <div>
    <h3>
      <span>当前位置：未转余额申请</span>
      <a href="/supply/balance-list">
        <el-button>申请记录</el-button>
      </a>
      <a href="/supply/balance">
        <el-button type="primary">未转余额申请</el-button>
      </a>
    </h3>
    <section>
      <div class="inp">
        <div class="row">
          <span>输入金额：</span>
          <el-input></el-input>
          <span>
            可转余额
            <em>0.00</em>元
          </span>
        </div>
        <div class="row">
          <span>交易密码：</span>
          <el-input></el-input>
        </div>
      </div>
      <el-button type="primary">确认提交</el-button>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'webIn'
}
</script>

<style lang="scss" scoped>
section {
  padding: 15px;
  background: white;
  .inp {
    padding: 15px 0 30px 15px;
    border-bottom: 1px solid $--basic-border-color;
  }
  .row {
    .el-input {
      width: 300px;
    }
    em {
      color: $--basic-red;
    }
  }
  .row + .row,
  .inp + .el-button {
    margin-top: 15px;
  }
  .el-button {
    margin-left: 15px;
  }
}
</style>
