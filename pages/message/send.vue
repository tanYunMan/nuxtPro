<template>
  <div>
    <h3>
      <span>当前位置：发件箱</span>
      <a href="/message/send">
        <el-button type="primary">发件箱</el-button>
      </a>
      <a href="/message/list">
        <el-button>收件箱</el-button>
      </a>
      <el-button type="danger" class="add" @click="$refs.msg.show()"
        >短信发送</el-button
      >
    </h3>
    <section>
      <el-table :data="tableData">
        <el-table-column
          label="选择"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column prop="num" label="发送人"></el-table-column>
        <el-table-column prop="name" label="短信标题"></el-table-column>
        <el-table-column prop="name" label="收到时间"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
      </el-table>
    </section>
    <message-dialog ref="msg"></message-dialog>
  </div>
</template>

<script>
import MessageDialog from '@/components/dialog/message'

export default {
  layout: 'webIn',
  components: {
    MessageDialog
  },
  data() {
    return {
      dialog: {
        visible: false
      },
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  .add {
    float: right;
    margin-right: 15px;
  }
}
</style>
