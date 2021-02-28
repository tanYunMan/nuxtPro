<template>
  <div>
    <div class="top-btns clear">
      <a href="/charge">账户充值</a>
      <a href="/withdraw">我要提现</a>
    </div>
    <ul class="left-nav">
      <li>编号: {{ user.localUserID }}</li>
      <li>
        级别:
        {{ user.userLevel ? user.userLevel.levelName : '' }}
        <i
          v-if="updateEnable"
          @click="$parent.$refs.self.show()"
          class="el-icon-upload"
        ></i>
      </li>
      <li>
        余额: {{ (user.userMoney ? user.userMoney.money : 0) | n3 }}（元）
      </li>
      <li>地区: {{ user.userArea || '未知' }}</li>
      <li>上级: {{ user.parentName || '无上级' }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
      updateEnable: (state) => state.updateEnable
    })
  }
}
</script>

<style lang="scss" scoped>
.top-btns {
  background: white;
  padding-bottom: 5px;
  a {
    color: white;
    text-align: center;
    line-height: 45px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    width: 50%;
    float: left;
    &:first-child {
      background-color: $--deep-color-primary;
    }
    &:last-child {
      background-color: $--color-primary;
    }
    &:hover {
      background-color: $--main-top-border;
    }
  }
}
.left-nav {
  padding: 10px 0 10px 15px;
  background: $--color-primary;
  color: white;
  li {
    padding: 5px 0;
    font-size: 12px;
    font-weight: 500;
    i {
      font-size: 14px;
      margin-left: 5px;
      cursor: pointer;
      &:hover {
        color: $--basic-orange;
      }
    }
  }
}
</style>
