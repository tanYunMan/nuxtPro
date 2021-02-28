<template>
  <div>
    <div class="top clear">
      <div class="right">
        <h4>
          <i class="el-icon-magic-stick"></i>推荐目录
        </h4>
        <div class="hot">
          <a
            v-for="item in recommendsCategory"
            :key="item.catalogRecommendID"
            :href="`/goods-list?recommendId=${item.catalogRecommendID}`"
          >
            <el-tag :style="{ color: item.color }" type="danger">
              {{
              item.catalogRecommendName
              }}
            </el-tag>
          </a>
        </div>
      </div>
      <div class="info">
        <p>
          ID: {{ user.localUserID }}
          <span>登录账号：总账号，登录方式：页面登录</span>
        </p>
        <select v-if="user.localUserID">
          <option>
            登录IP：{{ user.lastLoginIp }}&nbsp;&nbsp;&nbsp;&nbsp;时间：{{
            user.lastLoginTime | dateFormat
            }}
          </option>
        </select>
        <ul class="nav">
          <li>
            <a href="/category-list">[&nbsp;我要购卡&nbsp;]</a>
          </li>
          <li>
            <a href="/favorite">[&nbsp;我的收藏&nbsp;]</a>
          </li>
          <li>
            <a href="/charge">[&nbsp;账户充值&nbsp;]</a>
          </li>
          <li>
            <a href="/orders">[&nbsp;进货记录&nbsp;]</a>
          </li>
          <li>
            <a href="/bill">[&nbsp;资金明细&nbsp;]</a>
          </li>
          <!-- <li>
            <a href="/">[&nbsp;员工管理&nbsp;]</a>
          </li>-->
        </ul>
        <p class="money">
          <span>
            可用余额：¥{{
            user.userMoney ? user.userMoney.money : '' | n3
            }}
          </span>
          <a href="/charge">
            <el-button size="small">我要充值</el-button>
          </a>
        </p>
      </div>
    </div>

    <div class="mid-container" v-if="isSupplyNow">
      <h4>
        <i class="el-icon-data-line"></i>数据汇总
      </h4>
      <div class="card-content">
        <!-- <el-radio-group size="mini" v-model="dataDay" style="margin-top: 10px;">
          <el-radio-button :label="1">今天</el-radio-button>
          <el-radio-button :label="2">昨天</el-radio-button>
          <el-radio-button :label="3">近一周</el-radio-button>
        </el-radio-group> -->
        <div class="card-list">
          <el-card shadow="never" v-for="(val, key, index) in supply" :key="key">
            <div class="card-container">
              <div class="header" :class="'border-color' + (index + 1)%6"></div>
              <div class="content">{{key}}</div>
              <div class="data">{{val}}</div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="right">
        <div style="display: none">
          <h4>
            <i class="el-icon-chat-dot-round"></i>最新消息
          </h4>
          <div class="msg">
            <a v-for="i in 5" :key="i">
              <li></li>
            </a>
          </div>
        </div>
        <div>
          <h4>
            <i class="el-icon-tickets"></i>最新公告
          </h4>
          <div class="msg">
            <a
              v-for="item in noticeList"
              :key="item.systemNoticeID"
              :href="`/notice/${item.systemNoticeID}`"
            >
              <li :style="`color: ${item.color}`">{{ item.systemNoticeTitle }}</li>
            </a>
          </div>
        </div>
      </div>
      <div class="rec">
        <h4>
          <i class="el-icon-collection-tag"></i>最新推荐商品
        </h4>
        <ul class="recommends">
          <a v-for="goods in recommends" :key="goods.goodsID" :href="`/submit?id=${goods.goodsID}`">
            <li :style="{ color: goods.color }">
              <span class="price">¥{{ goods.goodsShowVO.goodsPrice || 0 }}</span>
              <div class="title">{{ goods.goodsShowVO.goodsName }}</div>
            </li>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    layout: 'webIn',
    async asyncData({ $axios, store }) {
      const res = await $axios.get('/site/userLevel/isUpgrade')
      if (res.code === 1001) {
        store.commit('updateEnableUpdate', res.body)
      }
    },
    data() {
      return {
        dataDay: 1,
        recommendsCategory: [],
        recommends: [],
        supply: {}, // 统计信息，是个对象
        noticeList: [],
        isSupplyNow: false,//数据总计是否显示
      }
    },
    computed: {
      ...mapState({
        user: (state) => state.user,
        isSupply: (state) => state.isSupply
      })
    },
    mounted() {

      this.getRecommends()
      this.getRecommendsGoods()
      this.getNotice()
      this.getLoginTip()
      this.getSupplyTotal()
      this.getUserExtend()
 
    },
    methods: {
      async getRecommends() {
        const res = await this.$axios.get('/goods/catalog/getCRList')
        if (res.code === 1001 && res.body) {
          this.recommendsCategory = res.body
        }
      },
      getSupplyTotal() {
        // 查询统计
        this.$axios.get('/platform/site/getSupplyTotal').then(res => {
          this.supply = res.body
        })
      },
      async getRecommendsGoods() {
        const res = await this.$axios.post(
          '/goods/goods/catalogGoodsRecommendPage'
        )
        if (res.code === 1001 && res.body) {
          this.recommends = res.body.records
        }
      },
      async getNotice() {
        const res = await this.$axios.post('/site/systemNotice/pageFK', null, {
          params: {
            pageNum: 1,
            pageSize: 5
          }
        })
        if (res.code === 1001 && res.body) {
          this.noticeList = res.body.records
        }
      },
      async getLoginTip() {
        if (this.$route.query.pay) return
        const res = await this.$axios.get('/site/loginTips/get')
        if (res.code === 1001 && res.body && res.body.content) {
          this.$alert(res.body.content, res.body.title)
        }
      },
      async getUserExtend() {
        const res = await this.$axios.get('/user/userExtend/get')
        if (res.code === 1001 && res.body) {
          const data = res.body;
          this.isSupplyNow = data.isSupply === 1
        } else {
          this.isSupplyNow = false
        }
      },
    }
  }
</script>
<style scoped>
  .mid-container {
    height: 220px;
    margin-top: 15px;
    background: white;
  }

  .card-content {
    padding: 0 20px;
  }

  .card-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: 140px;
  }

  .card-list >>> .el-card {
    flex-grow: 1;
    margin: 0 10px;
  }

  .card-container .content {
    margin-top: 10px;
    font-size: 14px;
    color: #a1a1a1;
  }

  .card-container .data {
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
  }

  .card-container .header {
    width: 30px;
    border-width: 2px;
    border-style: solid;
  }

  .border-color1 {
    border-color: rgb(255, 127, 62);
  }

  .border-color2 {
    border-color: rgb(237, 52, 0);
  }

  .border-color3 {
    border-color: rgb(215, 64, 227);
  }

  .border-color4 {
    border-color: rgb(181, 181, 181);
  }

  .border-color5 {
    border-color: rgb(32, 138, 214);
  }

  .border-color6 {
    border-color: rgb(68, 171, 102);
  }
</style>
<style lang="scss" scoped>
  .top {
    .info {
      margin-right: 365px;
      height: 220px;
      background: white;
    }

    .right {
      height: 220px;
      background: white;
    }
  }

  .bottom {
    margin-top: 15px;

    .rec {
      margin-right: 365px;
      height: 410px;
      background: white;
    }

    .right > div {
      background: white;
      // & + div {
      //   margin-top: 15px;
      // }
    }
  }

  .right {
    margin-left: 15px;
    float: right;
    width: 350px;
  }

  .info {
    padding: 0 20px;

    p {
      font-size: 12px;
      padding: 15px 0;
      border-bottom: 1px solid #e8e8e8;
    }

    select {
      height: 24px;
      line-height: 24px;
      color: #b9b9b9;
      border: 1px solid #eeecea;
      outline: none;
      padding: 0 10px;
      margin-top: 15px;
    }

    .nav {
      font-size: 0;
      padding: 8px 10px;
      margin-top: 15px;
      border: 1px solid #eeecea;

      li {
        display: inline-block;
        vertical-align: top;
        font-size: 13px;

        a {
          color: #8f8f8f;
        }
      }

      li + li {
        margin-left: 25px;
      }
    }

    .money {
      .el-button {
        margin-left: 20px;
      }
    }
  }

  h4 {
    padding: 10px;
    line-height: 20px;
    font-size: 14px;
    color: $--color-primary;
    border-bottom: 1px solid $--basic-border-color;

    i {
      font-size: 20px;
      margin-right: 5px;
      vertical-align: middle;
    }
  }

  .hot {
    padding: 15px;

    a {
      .el-tag {
        vertical-align: top;
        margin: 0 10px 10px 0;
      }

      &:last-child {
        .el-tag {
          margin-right: 0;
        }
      }
    }
  }

  .recommends {
    padding: 15px;

    li {
      font-size: 12px;
      font-weight: 600;
      line-height: 25px;
      color: $--basic-red;

      .price {
        float: right;
      }

      .title {
        margin-right: 80px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    a:hover {
      text-decoration: none;

      li {
        color: $--alert-red;
      }
    }
  }

  .msg {
    padding: 15px;
    min-height: 367px;

    li {
      font-size: 12px;
      font-weight: 600;
      line-height: 25px;
      color: $--deep-gray-text-color;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    a:hover {
      li {
        color: $--color-primary;
      }
    }
  }
</style>
