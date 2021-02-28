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
      <a v-for="item in list" :key="item.id">
        <van-cell>
          <span class="money">{{ item.payMoney }}</span>
          <div>{{ item.paySn }}</div>
          <div>
            支付方式：{{ item.rechargeName }}
            <span style="float: right">状态：{{ payMap[item.payState] }}</span>
          </div>
          <div v-if="item.createTime">{{ item.createTime | dateFormat }}</div>
        </van-cell>
      </a>
    </van-list>
  </div>
</template>

<script>
import wapListMixin from '@/mixins/wapList'
import wapListDate from '@/components/wapListDate'

const option1 = [
  { text: '全部状态', value: '' },
  { text: '等待支付', value: '0' },
  { text: '支付失败', value: '1' },
  { text: '支付成功', value: '2' },
  { text: '退款', value: '3' }
]

const payMap = {}
option1.forEach((item) => {
  payMap[item.value] = item.text
})

export default {
  layout: 'wap',
  components: {
    wapListDate
  },
  mixins: [wapListMixin],
  data() {
    return {
      url: '/finance/rechargeRecord/recordPage',
      value1: '',
      option1,
      payMap
    }
  },
  methods: {
    getParams() {
      const obj = {}
      if (this.value1) {
        obj.payState = this.value1
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
  .van-cell {
    padding: 10px 15px;
    border-bottom: 10px solid $--basic-border-color;
  }
  .money {
    color: $--basic-red;
    font-weight: 600;
    float: right;
  }
}
</style>
