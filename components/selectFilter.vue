<template>
  <section class="select">
    <span class="title">{{ name }}：</span>
    <span v-for="(item, idx) in options" :key="item.key || idx">
      <el-input
        v-if="item.type === 'input'"
        v-model="dataList[idx].val"
        :style="`width: ${item.width || 180}px`"
        :placeholder="item.placeholder || '请输入'"
      ></el-input>
      <el-select
        v-if="item.type === 'select'"
        v-model="dataList[idx].val"
        :style="`width: ${item.width || 120}px`"
        :placeholder="item.placeholder || '请选择'"
        popper-class="s-filter-popper"
      >
        <el-option
          v-for="subitem in item.options"
          :key="subitem.value"
          :label="subitem.label"
          :value="subitem.value"
        ></el-option>
      </el-select>
    </span>
  </section>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dataList: this.setVal(this.$props.options)
    }
  },
  watch: {
    options(newVal) {
      this.setVal(newVal)
    }
  },
  methods: {
    setVal(list) {
      const dataList = []
      list.forEach((item) => {
        if (item.type === 'select') {
          dataList.push({
            key: item.key || '',
            val: item.options[0].value
          })
        } else {
          dataList.push({
            key: item.key || '',
            val: ''
          })
        }
      })
      return dataList
    },
    queryVal() {
      const data = {}
      const dataList = this.dataList || []
      dataList.forEach((item) => {
        data[item.key] = item.val
      })
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  background: white;
  padding: 15px;
  font-size: 13px;
  & > span:first-child {
    display: inline-block;
    line-height: 36px;
    padding: 0 10px;
    background: $--light-color-primary;
  }
  & > span {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .el-input {
    ::v-deep input {
      height: 36px;
      line-height: 36px;
    }
  }
  .el-select {
    ::v-deep .el-input__inner {
      height: 36px;
      line-height: 36px;
    }
    ::v-deep .el-input__icon {
      line-height: 37px;
    }
  }
}
</style>
