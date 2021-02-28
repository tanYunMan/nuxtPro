<template>
  <div>
    <h3>
      <span>当前位置：我的余额</span>
    </h3>
    <section>
      <div class="box">
        <span>您的账户余额：</span>
        <em>￥{{ (user.userMoney ? user.userMoney.money : 0) | n3 }}</em>
        <a href="/charge">
          <el-button type="warning">我要充值</el-button>
        </a>
        <a href="/transfer">
          <el-button type="warning" plain>我要转账</el-button>
        </a>
        <a href="/withdraw">
          <el-button type="success" plain>我要提现</el-button>
        </a>
      </div>
      <ul>
        <li>
          <span>账户总额</span>
          <div>{{ (user.userMoney ? user.userMoney.money : 0) | n3 }}/￥</div>
        </li>
        <li>
          <span>可用余额</span>
          <div>
            {{ (user.userMoney ? user.userMoney.saleMoney : 0) | n3 }}/￥
          </div>
        </li>
        <li>
          <span>冻结金额</span>
          <div>
            {{ (user.userMoney ? user.userMoney.frozenMoney : 0) | n3 }}/￥
          </div>
        </li>
        <li>
          <span>未转余额</span>
          <div>
            0.000/￥
            <!-- <a href="/supply/balance">转款</a> -->
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'webIn',
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 15px;
  background: white;
  .box {
    padding: 15px;
    border: 1px solid $--basic-border-color;
    a {
      margin-left: 20px;
    }
  }
  ul {
    margin-top: 15px;
    padding-bottom: 100px;
    font-size: 14px;
    // border-bottom: 1px solid $--basic-border-color;
    li {
      width: 165px;
      height: 80px;
      padding: 15px 0 0 15px;
      display: inline-block;
      border: 1px solid $--basic-border-color;
      &:hover {
        border: 1px solid $--color-primary;
      }
      div {
        margin-top: 15px;
        a {
          float: right;
          color: $--color-primary;
          margin-right: 15px;
          &:hover {
            color: $--alert-red;
          }
        }
      }
    }
    li + li {
      margin-left: 20px;
    }
  }
  h5 {
    margin: 23px 0 15px 0;
  }
}
</style>
