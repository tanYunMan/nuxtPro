<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
    <van-list>
      <van-cell @click="detail" v-for="i in 20" :key="i">
        msg
        <br />msg
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {
      value1: 0,
      option1: [
        { text: '全部状态', value: 0 },
        { text: '未读', value: 1 },
        { text: '已读未回复', value: 2 },
        { text: '已读已回复', value: 3 }
      ]
    }
  },
  methods: {
    detail() {
      this.$router.push('/goods')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-dropdown-menu {
  top: 44px;
  position: fixed;
  width: 100%;
  z-index: 1;
}
.van-list {
  padding-top: 94px;
  .van-cell {
    padding: 10px 15px;
    border-bottom: 10px solid $--basic-border-color;
  }
}
</style>
