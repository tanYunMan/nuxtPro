<template>
  <section class="check">
    <span class="title">{{ name }}：</span>
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="item in options"
        :key="item.value"
        :label="item.value"
        >{{ item.label }}</el-checkbox
      >
    </el-checkbox-group>
  </section>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checkList: []
    }
  },
  methods: {
    queryVal() {
      return this.checkList.join(',')
    }
  }
}
</script>

<style lang="scss" scoped>
.check {
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
  .el-checkbox-group {
    display: inline-block;
  }
}
</style>
