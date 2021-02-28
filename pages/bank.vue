<template>
  <section class="main-section sec">
    <div class="top-bg"></div>
    <div class="main-w content">
      <homeLeftNav :index="2" />
      <main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>银行信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <ul>
            <li v-for="item in chargeList" :key="item.rechargeModeID">
              <span class="img">
                <img :src="`/${item.rechargeKey}.jpg`" alt="" />
              </span>
              <label>{{ item.rechargeName }}</label>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
import homeLeftNav from '@/components/homeLeftNav'

export default {
  layout: 'web',
  components: {
    homeLeftNav
  },
  async asyncData({ $axios }) {
    // 支付方式
    const c = await $axios.get('/finance/rechargeMode/getListForClient', {
      params: {
        rechargeType: 1
      }
    })
    let chargeList = []
    if (c.code === 1001 && c.body) {
      chargeList = c.body
    }
    return {
      chargeList
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding-top: 15px;
  background: $--light-color-primary;
}
.content {
  z-index: 2;
  position: relative;
  background: white;
  overflow: hidden;
  padding: 0 20px;
  height: 100%;
}
main {
  margin: 25px 0 0 205px;
  padding: 20px;
  box-shadow: -2px 0 12px 0 rgba(0, 0, 0, 0.1);
  ::v-deep .el-breadcrumb {
    overflow: hidden;
    margin-bottom: 15px;
    & + div {
      border-top: 1px solid $--basic-border-color;
    }
  }
  ul {
    li {
      margin-top: 30px;
      .img {
        width: 100px;
        height: 40px;
        display: inline-block;
        vertical-align: middle;
        img {
          object-fit: contain;
        }
      }
    }
  }
}
</style>
