<template>
  <section>
    <van-list>
      <van-cell v-for="i in 20" :key="i">
        <div class="location">四川省成都市：120.120.120.121</div>
        <div class="time">登录时间：2019-10-25 13:54:11</div>
      </van-cell>
    </van-list>
  </section>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  border-bottom: 10px solid #ebebeb;
}
.location {
  color: $--deep-gray-text-color;
  font-size: 13px;
  font-weight: 500;
}
.time {
  color: $--gray-text-color;
  font-size: 12px;
}
</style>
