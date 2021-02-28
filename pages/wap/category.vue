<template>
  <section>
    <ul v-for="cate in list" :key="cate.catalogID">
      <h2 :style="{ color: cate.color }">{{ cate.catalogName }}</h2>
      <li
        class="tbd1px"
        v-for="subCate in cate.children"
        :key="subCate.catalogID"
        :style="{ color: subCate.color }"
      >
        <a :href="`/wap/goods-list?categoryId=${subCate.catalogID}`">{{
          subCate.catalogName
        }}</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {
      active: 0,
      list: []
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    async getCategory() {
      const res = await this.$axios.get('/goods/catalog/treeClient')
      if (res.code === 1001 && res.body) {
        this.list = res.body
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  overflow: hidden;
  border-bottom: 10px solid #f2f2f2;
  h2 {
    padding: 0 15px;
    margin: 10px 0;
    font-size: 14px;
    line-height: 20px;
    max-height: 40px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  li {
    float: left;
    width: 50%;
    font-size: 12px;
    padding: 0 15px;
    line-height: 35px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      top: 0;
      bottom: 0;
      border-right: 1px solid #ebedf0;
      -webkit-transform: scaleX(0.5);
      transform: scaleX(0.5);
    }
    a {
      display: block;
    }
  }
}
</style>
