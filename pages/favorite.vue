<template>
  <div>
    <h3>
      <span>当前位置：收藏夹</span>
    </h3>
    <section>
      <el-table :data="tableData">
        <el-table-column prop="date" label="选择"></el-table-column>
        <el-table-column prop="name" label="编号"></el-table-column>
        <el-table-column prop="address" label="商品名称"></el-table-column>
        <el-table-column prop="address" label="面值（元）"></el-table-column>
        <el-table-column prop="address" label="购价（元）"></el-table-column>
        <el-table-column prop="address" label="购买类型"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'webIn',
  data() {
    return {
      tableData: [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 0 15px 15px 15px;
  background: white;
}
</style>
