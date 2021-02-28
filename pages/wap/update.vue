<template>
  <div>
    <section>
      <van-cell title="当前级别：">
        <template #right-icon>
          {{ user.userLevel ? user.userLevel.levelName : '' }}
        </template>
      </van-cell>
      <van-cell title="目标级别：">
        <template #right-icon> {{ target.levelName }} </template>
      </van-cell>
      <div class="separate"></div>
      <van-cell title="升级费用：">
        <template #right-icon> {{ target.upgradeFee }}元 </template>
      </van-cell>
    </section>
    <footer class="update tbd1px">
      <van-button @click="doUpdate" type="primary">立即升级</van-button>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'wap',
  middleware: ['authorization'],
  data() {
    return {
      isLoading: false,
      target: {}
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  async mounted() {
    const res = await this.$axios.get('/site/userLevel/getUpgradeLevel')
    if (res.code === 1001 && res.body) {
      this.target = res.body
    }
  },
  methods: {
    async doUpdate() {
      const money = this.user.userMoney ? this.user.userMoney.money : 0
      if (money < this.target.upgradeFee) {
        return this.$notify({
          type: 'danger',
          message: '当前余额不足，请充值后进行升级'
        })
      }
      this.isLoading = true
      const res = await this.$axios.post('/site/userLevel/upgradeLevel', null, {
        params: { levelID: this.target.levelID }
      })
      if (res.code === 1001) {
        this.$notify({ type: 'success', message: '升级成功' })
        history.back()
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.separate {
  height: 10px;
  background: $--basic-border-color;
}
.update {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: white;
  button {
    width: 100%;
  }
}
</style>
