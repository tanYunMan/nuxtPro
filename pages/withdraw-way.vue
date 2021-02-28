<template>
  <div>
    <h3>
      <span>当前位置：提现方式</span>
      <div class="sub-nav">
        <a href="/withdraw">申请提现</a>
        <a class="selected">提现方式</a>
        <a href="/withdraw-list">提现记录</a>
      </div>
    </h3>
    <section v-loading="loading">
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        style="width: 500px"
      >
        <el-form-item v-if="form.userID" label="当前状态">
          <em v-if="form.cashMethodState === 1">审核中</em>
          <em v-else-if="form.cashMethodState === 2">审核通过</em>
          <em v-else-if="form.cashMethodState === 3">审核中</em>
        </el-form-item>
        <el-form-item label="提现方式">
          <el-select
            style="width: 380px"
            v-model="form.cashTypeID"
            placeholder="请选择提现方式"
          >
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.cashTypeName"
              :value="item.cashTypeID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现账户号">
          <el-input v-model="form.cashAccount"></el-input>
        </el-form-item>
        <el-form-item label="提现账户名">
          <el-input v-model="form.cashName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update">修改提现方式</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'webIn',
  async asyncData({ $axios }) {
    const res = await $axios.get('/finance/cashType/list')
    let list = []
    if (res.code === 1001 && res.body) {
      list = res.body
    }
    const ares = await $axios.get('/finance/cashMethod/get')
    let form = { cashTypeID: '', cashAccount: '', cashName: '' }
    if (ares.code === 1001 && ares.body) {
      form = ares.body
    }
    return {
      list,
      form
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    update() {
      if (!this.form.cashTypeID) {
        return this.$message.error('请选择提现方式')
      }
      if (!this.form.cashAccount) {
        return this.$message.error('请输入提现账户号')
      }
      if (!this.form.cashName) {
        return this.$message.error('请选择提现账户名')
      }
      this.$confirm(
        '提交申请后，将进入审核状态，审核通过前将无法进行提现，是否继续？'
      ).then(() => {
        this.doUpdate()
      })
    },
    async doUpdate() {
      this.loading = true
      const res = await this.$axios.post('/finance/cashMethod/add', null, {
        params: {
          cashTypeID: this.form.cashTypeID,
          cashAccount: this.form.cashAccount,
          cashName: this.form.cashName
        }
      })
      if (res.code === 1001) {
        location.reload()
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-nav {
  float: right;
  a {
    float: none;
    display: inline-block;
    text-decoration: none;
    color: $--deep-gray-text-color;
    &:hover {
      color: $--color-primary;
    }
    &.selected {
      line-height: 34px;
      color: $--color-primary;
      border-bottom: 2px solid $--color-primary;
    }
  }
  a + a {
    margin: 0 0 0 15px;
  }
}
section {
  padding: 15px;
  background: white;
}
</style>
