<template>
  <section class="recommend">
    <span> <i class="el-icon-magic-stick"></i>推荐 </span>
    <a
      v-for="cate in recommendsCategory"
      :key="cate.catalogRecommendID"
      :href="`/goods-list?recommendId=${cate.catalogRecommendID}`"
      ><el-tag :style="{ color: cate.color }" type="danger">{{
        cate.catalogRecommendName
      }}</el-tag></a
    >
  </section>
</template>

<script>
export default {
  data() {
    return { recommendsCategory: [] }
  },
  async mounted() {
    const res = await this.$axios.get('/goods/catalog/getCRList')
    if (res.code === 1001 && res.body) {
      this.recommendsCategory = res.body
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  padding: 10px 15px;
  height: 52px;
  background: white;
  & > span:first-child {
    font-size: 14px;
    margin-right: 10px;
    color: $--color-primary;
    line-height: 32px;
    display: inline-block;
    vertical-align: top;
    i {
      font-size: 16px;
      vertical-align: middle;
      margin-right: 3px;
    }
  }
  a {
    vertical-align: top;
  }
  a + a {
    margin-left: 15px;
  }
}
</style>
