<template>
  <div>
    <div class="search">
      <van-field v-model="keywords" placeholder="请输入关键词">
        <van-button
          slot="button"
          icon="search"
          size="small"
          type="primary"
          @click="search"
          >搜索</van-button
        >
      </van-field>
    </div>
    <h4 class="tbd1px bottom">热门目录</h4>
    <div class="hot">
      <a
        v-for="item in recommendsCategory"
        :key="item.catalogRecommendID"
        :href="`/wap/goods-list?recommendId=${item.catalogRecommendID}`"
      >
        <van-button
          :style="{ color: item.color, borderColor: item.color }"
          plain
          type="danger"
          >{{ item.catalogRecommendName }}</van-button
        >
      </a>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {
      keywords: '',
      recommendsCategory: []
    }
  },
  mounted() {
    this.getRecommendCategory()
  },
  methods: {
    async getRecommendCategory() {
      const res = await this.$axios.get('/goods/catalog/getCRListFK')
      if (res.code === 1001 && res.body) {
        this.recommendsCategory = res.body
      }
    },
    search() {
      location.href = `/wap/goods-list?keywords=${this.keywords}`
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding: 59px 15px 15px;
  background: $--light-color-primary;
}
h4,
.hot {
  padding: 15px;
  a {
    display: inline-block;
    margin: 0 15px 10px 0;
    &:last-child {
      margin-right: 0;
    }
  }
  .van-button {
    height: 30px;
    line-height: 30px;
  }
}
</style>
