<template>
  <section>
    <ul class="nav bt">
      <a href="/wap/category">
        <li>
          <span class="img">
            <img src="~@/assets/a.png" />
          </span>
          <span>商品目录</span>
        </li>
      </a>
      <a href="/wap/goods-list?recommend=1">
        <li>
          <span class="img">
            <img src="~@/assets/b.png" />
          </span>
          <span>推荐商品</span>
        </li>
      </a>
      <li @click="loginTo('/wap/sub-site')">
        <span>
          <img src="~@/assets/c.png" />
        </span>
        <span>搭建分站</span>
      </li>
      <li @click="loginTo('/wap/charge')">
        <span>
          <img src="~@/assets/d.png" />
        </span>
        <span>账户充值</span>
      </li>
    </ul>
    <div class="hot bt">
      <span class="tt">
        <span>热门目录</span>
      </span>
      <div>
        <a
          v-for="item in recommendsCategory"
          :key="item.catalogRecommendID"
          :href="`/wap/recommend-list?recommendId=${item.catalogRecommendID}`"
        >
          <van-tag :style="{ color: item.color }" plain type="danger">{{
            item.catalogRecommendName
          }}</van-tag>
        </a>
      </div>
    </div>
    <van-tabs class="bt" :active="active" @change="onTabChange">
      <van-tab title="推荐商品"></van-tab>
      <van-tab title="最新上架"></van-tab>
    </van-tabs>
    <van-list class="list">
      <a
        v-for="item in list"
        :key="item.goodsID"
        :href="`/wap/goods?goodsId=${item.goodsID}`"
      >
        <van-cell>
          <span class="price">
            <em>¥</em
            >{{
              (item.goodsShowVO
                ? item.goodsShowVO.goodsPrice
                : item.goodsPrice) | n2
            }}
          </span>
          <div class="name line2">
            {{ item.goodsShowVO ? item.goodsShowVO.goodsName : item.goodsName }}
          </div>
        </van-cell>
      </a>
    </van-list>
  </section>
</template>

<script>
import user from '@/common/user'

export default {
  data() {
    return {
      active: 0,
      menus: false,
      list: [],
      recommendsCategory: []
    }
  },
  mounted() {
    this.getRecommendCategory()
    this.getRecommendGoods()
  },
  methods: {
    async getRecommendCategory() {
      const res = await this.$axios.get('/goods/catalog/getCRListFK')
      if (res.code === 1001 && res.body) {
        this.recommendsCategory = res.body
      }
    },
    async getRecommendGoods() {
      let url = '/goods/goods/catalogGoodsRecommendPageFK'
      if (user.isLogin(this.$cookies)) {
        url = '/goods/goods/catalogGoodsRecommendPage'
      }
      const res = await this.$axios.post(url)
      if (res.code === 1001 && res.body) {
        this.list = res.body.records
      }
    },
    async getNewestGoods() {
      let url = '/goods/goods/getNewGoodsFK'
      if (user.isLogin(this.$cookies)) {
        url = '/goods/goods/getNewGoods'
      }
      const res = await this.$axios.post(url)
      if (res.code === 1001 && res.body) {
        this.list = res.body
      }
    },
    onTabChange(val) {
      this.active = val
      this.list = []
      this.$nextTick(() => {
        if (this.active === 0) {
          this.getRecommendGoods()
        } else {
          this.getNewestGoods()
        }
      })
    },
    showMenus(show) {
      this.menus = show
    },
    loginTo(path) {
      if (user.isLogin(this.$cookies)) {
        location.href = path
      } else {
        location.href = '/wap/login'
      }
    }
  }
}
</script>

<style lang="scss">
header h1 {
  display: none;
}
</style>

<style lang="scss" scoped>
.bt {
  border-top: 10px solid $--basic-border-color;
}
section {
  .nav {
    padding: 15px;
    text-align: center;
    font-size: 0;
    li {
      width: 25%;
      display: inline-block;
      vertical-align: top;
      span:first-child {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin: 10px auto;
        display: inline-block;
        text-align: center;
        background: $--color-primary;
        box-shadow: 1px 4px 10px #666;
        img {
          width: 50%;
          height: 50%;
          margin-top: 25%;
        }
      }
      span:last-child {
        font-size: 14px;
        display: block;
        font-weight: 500;
        color: $--gray-text-color;
      }
    }
  }
  .hot {
    padding: 15px 5px 15px 15px;
    display: flex;
    .tt {
      flex-basis: 85px;
      margin-right: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      & > span {
        color: white;
        padding: 5px 10px;
        background-color: $--basic-red;
      }
    }
    .tt + div {
      flex: 1;
      line-height: 29px;
      min-height: 32px;
      a {
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .list {
    .van-cell {
      padding: 10px 15px;
      border-bottom: 10px solid $--basic-border-color;
      .name {
        margin-right: 65px;
        font-size: 14px;
      }
      .price {
        font-weight: 500;
        color: $--basic-red;
        float: right;
        font-size: 16px;
        margin-top: 9px;
        em {
          font-style: normal;
          font-size: 12px;
          color: $--basic-red;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
