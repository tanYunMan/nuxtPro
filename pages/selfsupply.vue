<template>
  <div>
    <h3>
      <span>当前位置：{{ label }}</span>
      <div class="sub-nav">
        <a
          v-for="(tab, idx) in tabs"
          :key="idx"
          :class="tab.selected ? 'selected' : ''"
          :href="`/selfsupply?type=${tab.ext || ''}`"
          >{{ tab.label }}</a
        >
      </div>
    </h3>
    <div class="filter">
      <el-button class="query" type="primary">查询</el-button>
      <select-filter name="查询条件" :options="selectOptions"></select-filter>
      <date-filter :date="date"></date-filter>
    </div>
    <section>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="date"
          label="购买日期"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="address" label="类型"></el-table-column>
        <el-table-column prop="address" label="数量"></el-table-column>
        <el-table-column prop="address" label="购买单价"></el-table-column>
        <el-table-column prop="address" label="购买总价"></el-table-column>
        <el-table-column prop="address" label="充值账号"></el-table-column>
        <el-table-column prop="address" label="购卡对象"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import DateFilter from '@/components/dateFilter'
import SelectFilter from '@/components/selectFilter'
import selectOptions from '@/constants/selectOptions'

const tabs = [
  {
    ext: 'pay',
    label: '系统支付记录'
  },
  {
    ext: 'trans',
    label: '转账支付记录'
  },
  {
    ext: 'point',
    label: '点卡兑换记录'
  },
  {
    ext: 'platform',
    label: '平台加款卡'
  }
]

const navData = (propsType) => {
  let label = ''
  tabs.forEach((item) => {
    item.selected = false
    if (item.ext === propsType) {
      item.selected = true
      label = item.label
    }
  })
  return {
    tabs,
    label
  }
}

export default {
  layout: 'webIn',
  components: {
    DateFilter,
    SelectFilter
  },
  data() {
    const navType = this.$route.query.type
    return {
      ...navData(navType),
      selectOptions: selectOptions(navType),
      date: '',
      tableData: [
        { date: '2019-08-08' },
        { date: '2019-08-08' },
        { date: '2019-08-08' },
        { date: '2019-08-08' },
        { date: '2019-08-08' }
      ]
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { tabs, label } = navData(to.params.type)
    this.tabs = tabs
    this.label = label
    this.selectOptions = selectOptions(to.params.type)
    next()
  }
}
</script>

<style lang="scss" scoped>
.sub-nav {
  float: right;
  a {
    float: none;
    display: inline-block;
    text-decoration: none;
    color: $--deep-gray-text-color;
    &:hover {
      color: $--color-primary;
    }
    &.selected {
      line-height: 34px;
      color: $--color-primary;
      border-bottom: 2px solid $--color-primary;
    }
  }
  a + a {
    margin: 0 0 0 15px;
  }
}
.tip {
  font-size: 12px;
  padding: 10px 15px;
  background: white;
  color: $--basic-orange;
}
</style>
