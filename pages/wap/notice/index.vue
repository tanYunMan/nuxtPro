<template>
  <div>
    <van-list
      v-model="listLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <a
        v-for="item in list"
        :key="item.systemNoticeID"
        :href="`/wap/notice/${item.systemNoticeID}`"
      >
        <van-cell :style="`color: ${item.color}`">
          <div class="title">{{ item.systemNoticeTitle }}</div>
          <span class="time">{{ item.createTime }}</span>
        </van-cell>
      </a>
    </van-list>
  </div>
</template>

<script>
import wapListMixin from '@/mixins/wapList'

export default {
  layout: 'wap',
  mixins: [wapListMixin],
  data() {
    return {}
  },
  mounted() {
    this.url = '/site/systemNotice/pageFK'
  }
}
</script>

<style lang="scss" scoped>
.van-list {
  padding-top: 50px;
  .van-cell {
    padding: 10px 15px;
    border-bottom: 10px solid $--basic-border-color;
    .title {
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .time {
      font-size: 12px;
      color: $--gray-text-color;
    }
  }
}
</style>
