<template>
  <section class="main-w sec">
    <h3 :style="{ color: detail.color }">{{ detail.systemNoticeTitle }}</h3>
    <p>发布时间：{{ detail.createTime }}</p>
    <div class="passage">
      <!-- eslint-disable vue/no-v-html -->
      <pre v-html="detail.content"></pre>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'wap',
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const res = await $axios.get('/site/systemNotice/getSystemNotice', {
      params: {
        id
      }
    })
    let detail = {}
    if (res.code === 1001 && res.body) {
      detail = res.body
    }
    return { detail }
  }
}
</script>

<style lang="scss" scoped>
section {
  text-align: center;
  h3 {
    font-size: 18px;
    padding: 15px 0;
    color: $--basic-red;
  }
  p {
    font-size: 13px;
    line-height: 30px;
    color: $--gray-text-color;
    border-bottom: 1px dashed $--basic-border-color;
  }
  .passage {
    padding: 15px;
    text-align: left;
    pre {
      margin: 0;
      word-break: break-word;
      white-space: pre-wrap;
      font-family: inherit;
    }
  }
}
</style>
