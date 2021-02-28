<template>
  <div>
    <h3>
      <span>当前位置：收件箱</span>
      <a href="/message/send">
        <el-button>发件箱</el-button>
      </a>
      <a href="/message/list">
        <el-button type="primary">收件箱</el-button>
      </a>
      <el-button type="danger" class="add" @click="$refs.msg.show()"
        >短信发送</el-button
      >
    </h3>
    <el-button class="query" type="primary">查询</el-button>
    <select-filter name="查询条件" :options="options"></select-filter>
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
import SelectFilter from '@/components/selectFilter'
import MessageDialog from '@/components/dialog/message'

export default {
  layout: 'webIn',
  components: {
    SelectFilter,
    MessageDialog
  },
  data() {
    return {
      dialog: {
        visible: false
      },
      options: [
        {
          type: 'select',
          width: 140,
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '已读已回复',
              value: '2'
            },
            {
              label: '已读未回复',
              value: '3'
            }
          ]
        }
      ],
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
section + section {
  margin-top: 15px;
}
</style>
