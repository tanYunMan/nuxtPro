<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item
        @change="getList(true)"
        v-model="value1"
        :options="option1"
      />
    </van-dropdown-menu>
    <wapListDate ref="date" @change="getList(true)" />
    <van-list
      v-model="listLoading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <a
        v-for="item in list"
        :key="item.complaintID"
        :href="`/wap/complain-detail?complainId=${item.complaintID}`"
        class="tbd1px"
      >
        <van-cell>
          <div
            :class="{
              danger: item.complaintState !== 2 && item.complaintState !== 3
            }"
            class="status"
          >
            <span>{{ item.complaintState | complainStateText }}</span>
          </div>
          {{ item.themeName }}
          <br />{{ item.createTime | dateFormat }}
        </van-cell></a
      >
    </van-list>
  </div>
</template>

<script>
import wapListMixin from '@/mixins/wapList'
import wapListDate from '@/components/wapListDate'

export default {
  layout: 'wap',
  components: {
    wapListDate
  },
  mixins: [wapListMixin],
  data() {
    return {
      url: '/order/complaint/complaintPage',
      value1: '',
      option1: [
        { text: '全部状态', value: '' },
        { text: '尚未处理', value: '1' },
        { text: '已经完成', value: '2' },
        { text: '处理完成', value: '3' },
        { text: '无法处理', value: '4' }
      ]
    }
  },
  methods: {
    getParams() {
      const obj = {}
      if (this.value1) {
        obj.ComplaintState = this.value1
      }
      const { startDate, endDate } = this.$refs.date
      obj.beginTime = startDate
      obj.endTime = endDate
      return obj
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
  padding-top: 130px;
  a {
    display: block;
  }
  ::v-deep.tbd1px::before {
    z-index: 1;
    top: auto;
    bottom: 0;
  }
}
.status {
  float: right;
  span {
    display: inline-block;
    line-height: 20px;
    color: $--color-primary;
    padding: 3px 6px;
    border: 1px solid $--color-primary;
  }
  &.danger > span {
    color: $--alert-red;
    border-color: $--alert-red;
  }
}
</style>
