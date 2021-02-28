<template>
  <div>
    <h3>
      <span>当前位置：快捷回复自定义</span>
    </h3>
    <section>
      <div class="inp">
        <div class="row">
          <span>手工订单处理成功回复自定义：</span>
          <el-input type="textarea"></el-input>
          <span>每条信息之间请敲回车键</span>
        </div>
        <div class="row">
          <span>手工订单处理失败回复自定义：</span>
          <el-input type="textarea"></el-input>
          <span>每条信息之间请敲回车键</span>
        </div>
        <div class="row">
          <span>订单投诉处理结果自定义：</span>
          <el-input type="textarea"></el-input>
          <span>每条信息之间请敲回车键</span>
        </div>
      </div>
      <el-button type="primary">确认保存</el-button>
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
    .el-textarea {
      width: 500px;
      ::v-deep textarea {
        resize: none;
        height: 90px;
      }
    }
    em {
      color: $--basic-red;
    }
    & > span:first-child {
      font-size: 14px;
      color: $--color-primary;
      vertical-align: top;
      display: inline-block;
      width: 120px;
      margin-right: 10px;
    }
    & > span:last-child {
      font-size: 12px;
      color: $--deep-gray-text-color;
      vertical-align: bottom;
      margin-left: 10px;
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
