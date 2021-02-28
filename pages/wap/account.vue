<template>
  <section>
    <a href="/wap/modify-pwd">
      <van-cell title="修改登录密码" is-link />
    </a>
    <a class="tbd1px" href="/wap/modify-trade">
      <van-cell title="修改交易密码" is-link />
    </a>
    <div class="separate"></div>
    <van-cell style="line-height: 30px" title="绑定QQ：">
      <template #right-icon>
        <template v-if="user.isQq">
          <span style="margin-right: 20px">已绑定</span>
          <van-button @click="unbindQQ" size="small" type="primary"
            >解绑</van-button
          >
        </template>
        <template v-else>未绑定</template>
      </template>
    </van-cell>
    <van-cell style="line-height: 30px" title="绑定微信：">
      <template #right-icon>
        <template v-if="user.isWx">
          <span style="margin-right: 20px">已绑定</span>
          <van-button @click="unbindWx" size="small" type="primary"
            >解绑</van-button
          >
        </template>
        <template v-else>未绑定</template>
      </template>
    </van-cell>
    <div class="separate"></div>
    <van-cell title="客户编号：">
      <template #right-icon>
        {{ user.localUserID }}
      </template>
    </van-cell>
    <van-cell title="登录名：">
      <template #right-icon>
        {{ user.login }}
      </template>
    </van-cell>
    <van-cell title="用户名：">
      <template #right-icon>
        {{ user.userName }}
      </template>
    </van-cell>
    <!-- <van-cell title="真实姓名：">
      <template #right-icon>
        {{ detail.goodsName }}
      </template>
    </van-cell> -->
    <van-cell title="注册时间：">
      <template #right-icon>
        {{ user.regTime }}
      </template>
    </van-cell>
    <!-- <van-cell title="公司/个人名：">
      <template #right-icon>
        {{ detail.goodsName }}
      </template>
    </van-cell> -->
    <!-- <van-cell title="电子邮箱：">
      <template #right-icon>
        {{ detail.goodsName }}
      </template>
    </van-cell> -->
    <!-- <van-cell title="手机号：">
      <template #right-icon>
        {{ detail.goodsName }}
      </template>
    </van-cell> -->
    <van-cell title="联系QQ：">
      <template #right-icon>
        {{ user.qq }}
      </template>
    </van-cell>
    <van-cell title="联系地址：">
      <template #right-icon>
        {{ user.address }}
      </template>
    </van-cell>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'wap',
  middleware: ['authorization'],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  methods: {
    async unbindQQ() {
      const res = await this.$axios.get('/user/oauth/unbind')
      if (res.code === 1001) {
        this.$notify({
          type: 'success',
          message: '解除QQ绑定成功'
        })
        location.reload()
      }
    },
    unbindWx() {}
  }
}
</script>

<style lang="scss" scoped>
.separate {
  height: 10px;
  background: $--basic-border-color;
}
.tbd1px {
  display: block;
  &::before {
    z-index: 2;
  }
}
</style>
