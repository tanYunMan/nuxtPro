<template>
  <div>
    <section>
      <div class="info">
        <span class="avatar">
          <img src="https://img.yzcdn.cn/vant/logo.png" />
        </span>
        <div class="level">
          <div>
            级别：{{ user.userLevel ? user.userLevel.levelName : '' }}
            <a v-if="updateEnable" href="/wap/update">
              <van-icon name="down" />
            </a>
          </div>
          <div>编号：{{ user.localUserID }}</div>
        </div>
      </div>
      <div class="balance bborder">
        余额(元)：
        <span class="price">{{
          user.userMoney ? user.userMoney.money : 0
        }}</span>
        <van-button @click="to('charge')" type="primary">充值</van-button>
      </div>
      <ul class="menus bborder">
        <li @click="to('orders')"><van-icon name="orders-o" />我的订单</li>
        <li @click="to('complain')"><van-icon name="send-gift-o" />我的投诉</li>
        <li @click="to('bill')"><van-icon name="after-sale" />余额明细</li>
        <li @click="to('message')"><van-icon name="comment-o" />站内信</li>
        <li @click="to('favorite')"><van-icon name="star-o" />我的收藏</li>
        <li @click="to('sub-site')"><van-icon name="cashier-o" />搭建子站</li>
        <li @click="to('wechat')"><van-icon name="exchange" />微信绑定</li>
        <li @click="to('share')"><van-icon name="share" />推广链接</li>
      </ul>
      <van-list>
        <a href="/wap/charge-list">
          <van-cell title="充值记录" is-link />
        </a>
        <a class="tbd1px" href="/wap/account">
          <van-cell title="我的账户" is-link />
        </a>
        <a class="tbd1px" href="/wap/safe">
          <van-cell title="安全设置" is-link />
        </a>
        <a class="tbd1px" href="/wap/log">
          <van-cell title="登录日志" is-link />
        </a>
        <a class="tbd1px"></a>
      </van-list>
    </section>
    <van-button @click="exit" class="exit" type="primary">账户退出</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import user from '@/common/user'

export default {
  layout: 'wap',
  middleware: ['authorization'],
  async asyncData({ $axios, store }) {
    const res = await $axios.get('/site/userLevel/isUpgrade')
    if (res.code === 1001) {
      store.commit('updateEnableUpdate', res.body)
    }
    store.commit('updateBackUrl', '/')
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      updateEnable: (state) => state.updateEnable
    })
  },
  methods: {
    exit() {
      user.removeToken(this.$cookies)
      location.href = '/'
    },
    to(path) {
      location.href = `/wap/${path}`
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  padding: 25px 15px;
  background: $--color-primary;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    float: left;
    overflow: hidden;
  }
  .level {
    height: 60px;
    font-size: 14px;
    margin-left: 75px;
    line-height: 25px;
    padding-top: 5px;
    font-weight: 500;
    & > div {
      color: $--light-color-primary;
    }
    .van-icon-down {
      font-weight: 600;
      width: 18px;
      line-height: 18px;
      margin-left: 5px;
      text-align: center;
      border: 1px solid;
      border-radius: 10px;
      font-size: 12px;
      vertical-align: text-top;
      transform: rotate(180deg) scale(0.6);
      color: $--light-color-primary;
    }
  }
}
.bborder {
  border-bottom: 15px solid $--basic-border-color;
}
.balance {
  padding: 15px;
  background: white;
  line-height: 36px;
  .price {
    font-size: 20px;
    font-weight: 500;
    color: $--basic-red;
  }
  .van-button {
    height: 36px;
    line-height: 34px;
    float: right;
  }
}
.menus {
  overflow: hidden;
  padding-bottom: 15px;
  font-size: 14px;
  li {
    width: 25%;
    float: left;
    text-align: center;
    padding-top: 15px;
    font-weight: 500;
    color: $--deep-gray-text-color;
    i {
      display: block;
      font-size: 28px;
      margin-bottom: 5px;
      color: $--color-primary;
    }
  }
}
.van-list {
  padding-bottom: 50px;
  font-weight: 500;
  .van-icon {
    float: right;
    margin-top: 3px;
  }
  .tbd1px {
    display: block;
    &::before {
      z-index: 2;
    }
  }
}
.exit {
  color: white;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 16px;
  font-weight: 500;
  z-index: 3;
}
</style>
