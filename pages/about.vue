<template>
  <section class="main-section sec">
    <div class="top-bg"></div>
    <div class="content main-w">
      <homeLeftNav :index="0" />
      <main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>关于我们</el-breadcrumb-item>
        </el-breadcrumb>
        <div></div>
      </main>
    </div>
  </section>
</template>

<script>
import homeLeftNav from '@/components/homeLeftNav'

export default {
  layout: 'web',
  components: {
    homeLeftNav
  }
}
</script>

<style lang="scss" scoped>
section {
  padding-top: 15px;
  background: $--light-color-primary;
}
.content {
  z-index: 2;
  position: relative;
  background: white;
  overflow: hidden;
  padding: 0 20px;
  height: 100%;
}
main {
  margin: 25px 0 0 205px;
  padding: 20px;
  box-shadow: -2px 0 12px 0 rgba(0, 0, 0, 0.1);
  ::v-deep .el-breadcrumb {
    overflow: hidden;
    margin-bottom: 15px;
    & + div {
      border-top: 1px solid $--basic-border-color;
    }
  }
}
</style>
