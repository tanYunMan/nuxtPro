<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item
        @change="getList(true)"
        v-model="value1"
        :options="option1"
      />
      <!-- <van-dropdown-item v-model="value2" :options="option2" /> -->
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
          <span class="money">
            <template
              v-if="
                item.transactionType === 2 ||
                  item.transactionType === 3 ||
                  item.transactionType === 4 ||
                  item.transactionType === 6
              "
              >+</template
            >
            <template
              v-else-if="
                item.transactionType === 1 ||
                  item.transactionType === 5 ||
                  item.transactionType === 7
              "
              >-</template
            >
            {{ item.money }}</span
          >
          <div>{{ item.transactionTypeName }}</div>
          <div>
            变化前{{ item.beforeMoney }}&nbsp;&nbsp;变化后{{ item.endMoney }}
          </div>
          <div>{{ item.createTime }}</div>
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
      url: '/finance/userMoneyDetail/detailPage',
      value1: '',
      value2: 'a',
      option1: [
        { text: '全部类型', value: '' },
        { text: '订单扣款', value: '1' },
        { text: '订单退款', value: '2' },
        { text: '充值到账', value: '3' },
        { text: '前台加款', value: '4' },
        { text: '前台减款', value: '5' },
        { text: '管理员加款', value: '6' },
        { text: '管理员减款', value: '7' }
      ],
      option2: [
        { text: '全部类型', value: 'a' },
        { text: '收入', value: 'b' },
        { text: '支出', value: 'c' }
      ]
    }
  },
  methods: {
    getParams() {
      const obj = {}
      if (this.value1) {
        obj.transactionType = this.value1
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
