<template>
  <section>
    <van-cell :title="`客服电话：${contact.frontServicePhone}`" />
    <van-cell :title="`业务电话：${contact.frontWorkPhone}`" />
    <van-cell :title="`加款电话：${contact.frontMoneyPhone}`" />
    <h4>客服QQ</h4>
    <div class="tbd1px">{{ contact.frontServiceQQ }}</div>
    <h4 class="tbd1px">业务QQ</h4>
    <div class="tbd1px">{{ contact.frontWorkQQ }}</div>
    <h4 class="tbd1px">加款QQ</h4>
    <div class="tbd1px">{{ contact.frontMoneyQQ }}</div>
    <h4 class="tbd1px">投诉QQ</h4>
    <div class="tbd1px">{{ contact.frontComplaintQQ }}</div>
    <h4 class="tbd1px">QQ交流群</h4>
    <div class="tbd1px">{{ contact.qQun }}</div>
    <div class="tbd1px"></div>
  </section>
</template>

<script>
export default {
  layout: 'wap',
  async asyncData({ $axios }) {
    const res = await $axios.get('/site/onlineService/getFK')
    if (res.code === 1001 && res.body) {
      return {
        contact: res.body
      }
    }
    return {
      contact: {}
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
h4 {
  padding: 10px 15px;
}
h4 + div {
  padding: 10px 15px;
}
</style>
