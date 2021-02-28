<template>
  <section class="date">
    <span class="title">查询时段：</span>
    <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <el-button @click="setDate(0)">昨天</el-button>
    <el-button @click="setDate(1)">今天</el-button>
    <el-button @click="setDate(2)">本周</el-button>
    <el-button @click="setDate(3)">本月</el-button>
    <el-button @click="setDate(4)">近一月</el-button>
    <el-button @click="setDate(5)">近三月</el-button>
  </section>
</template>

<script>
import { getTimeArr, dateFormat } from '@/common/utils'

export default {
  data() {
    return {
      date: []
    }
  },
  methods: {
    setDate(type) {
      const { from, to } = getTimeArr(type)
      this.date = [new Date(from), new Date(to)]
    },
    queryVal() {
      if (this.date.length > 0) {
        const begin = this.date[0].getTime()
        const end = this.date[1].getTime()
        const beginTime = dateFormat(begin)
        const endTime = dateFormat(end)
        return { beginTime, endTime }
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  background: white;
  padding: 15px;
  font-size: 13px;
  & > span {
    display: inline-block;
    line-height: 36px;
    margin-right: 10px;
    padding: 0 10px;
    background: $--light-color-primary;
  }
  .el-date-editor {
    height: 36px;
    line-height: 36px;
    vertical-align: top;
    width: 300px;
    .el-range__icon {
      line-height: 30px;
    }
    & + .el-button {
      margin-left: 10px;
    }
    ::v-deep .el-range-separator {
      width: 8%;
      line-height: 30px;
      vertical-align: top;
    }
    ::v-deep input {
      height: 28px;
      vertical-align: top;
    }
  }
  .el-button {
    padding: 10px;
  }
}
</style>
