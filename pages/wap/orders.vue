<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item
        @change="getList(true)"
        v-model="value1"
        :options="option1"
      />
      <van-dropdown-item
        @change="getList(true)"
        v-model="value2"
        :options="option2"
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
        :key="item.orderID"
        :href="`/wap/order-detail?orderId=${item.orderID}`"
      >
        <van-cell>
          <div class="right">
            <div class="price">¥{{ item.orderPrice | n2 }}</div>
            <div class="status">
              <span>{{ item.orderState | stateText }}</span>
            </div>
          </div>
          <div class="left">
            <div class="gray">{{ item.goodsName }}</div>
            <div class="gray">{{ item.orderCode }}</div>
            <div class="time">{{ item.createTime }}</div>
          </div>
        </van-cell>
      </a>
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
      url: '/order/order/myOrder',
      value1: '',
      value2: '',
      option1: [
        { text: '全部类型', value: '' },
        { text: '卡密类', value: '卡密' },
        { text: '充值类', value: '充值' }
      ],
      option2: [
        { text: '全部状态', value: '' },
        { text: '等待处理', value: '1' },
        { text: '正在处理', value: '2' },
        { text: '交易成功', value: '3' },
        { text: '交易失败', value: '4' }
      ]
    }
  },
  methods: {
    getParams() {
      const obj = {}
      if (this.value1) {
        obj.goodsTypeName = this.value1
      }
      if (this.value2) {
        obj.orderState = this.value2
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
  z-index: 11;
}
.van-list {
  padding-top: 130px;
  .van-cell {
    font-size: 12px;
    padding: 10px 15px;
    border-bottom: 10px solid $--basic-border-color;
    .left {
      width: calc(100% - 80px);
    }
    .right {
      width: 80px;
      float: right;
    }
    .gray {
      color: #8f8f94;
    }
    .time {
      color: #ccc;
    }
    .price {
      color: $--basic-red;
      font-weight: 600;
      text-align: right;
    }
    .status {
      text-align: right;
      span {
        display: inline-block;
        line-height: 20px;
        color: $--color-primary;
        padding: 3px 6px;
        border: 1px solid $--color-primary;
      }
    }
  }
}
</style>
