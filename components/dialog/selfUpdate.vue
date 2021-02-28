<template>
  <el-dialog
    custom-class="d-update"
    title="自助升级"
    width="500px"
    :visible.sync="visible"
    @closed="dialogClose()"
  >
    <div v-loading="isLoading">
      <ul>
        <li>
          <span>当前级别：</span>
          <span
            >{{
              user.userLevel ? user.userLevel.levelName : ''
            }}</span
          >
        </li>
        <li>
          <span>目标级别：</span>
          <span>{{ target.levelName }}</span>
        </li>
        <li>
          <span>升级费用：</span>
          <span>{{ target.upgradeFee }}元</span>
        </li>
      </ul>
      <el-button @click="doUpdate" type="primary">确认升级</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      visible: false,
      isLoading: false,
      target: {}
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  methods: {
    async show() {
      this.visible = true
      this.isLoading = true
      const res = await this.$axios.get('/site/userLevel/getUpgradeLevel')
      if (res.code === 1001 && res.body) {
        this.target = res.body
      }
      this.isLoading = false
    },
    dialogClose() {
      this.visible = false
      setTimeout(() => {
        this.target = {}
      }, 500)
    },
    async doUpdate() {
      const money = this.user.userMoney ? this.user.userMoney.money : 0
      if (money < this.target.upgradeFee) {
        return this.$message.error('当前余额不足，请充值后进行升级')
      }
      this.isLoading = true
      const res = await this.$axios.post('/site/userLevel/upgradeLevel', null, {
        params: { levelID: this.target.levelID }
      })
      if (res.code === 1001) {
        this.$message.success('升级成功')
        location.reload()
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
.d-update {
  .el-dialog__body {
    padding: 20px 15px 30px 15px;
  }
  li {
    & > span:first-child {
      width: 100px;
      display: inline-block;
      text-align: right;
      margin-right: 15px;
    }
  }
  li + li {
    margin-top: 10px;
  }
  .el-button {
    margin: 20px 0 0 30px;
  }
}
</style>
