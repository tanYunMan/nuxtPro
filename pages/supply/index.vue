<template>
  <div class="sp-main">
    <div class="top clear">
      <div class="info">
        <h4>主站基本信息</h4>
        <ul>
          <li>
            <span>网站状态：</span>
            <span>已运行200天</span>
          </li>
          <li>
            <span>授权域名：</span>
            <span>xx.xx.com</span>
          </li>
          <li>
            <span>套餐类型：</span>
            <span class="version">旗舰版</span>
          </li>
          <li>
            <span>到期时间：</span>
            <span>2018-10-10至2020-10-10</span>
          </li>
          <li>
            <span>实名状态：</span>
            <span class="realname">未实名</span>
          </li>
          <li>
            <span>版本号：</span>
            <span>V8版本</span>
          </li>
        </ul>
      </div>
      <div class="notice">
        <h4>
          开发商公告
          <a href="/supply">查看更多</a>
        </h4>
        <ul>
          <li v-for="idx in notice" :key="idx">
            <a>
              【供货商醒醒吧】关于主站没有一级域名可能存在的风险
              <span>[2019-08-25]</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="middle">
      <h4>数据汇总</h4>
      <ul class="datas">
        <li>
          <div>订单笔数</div>
          <div>0笔</div>
        </li>
        <li>
          <div>销售金额</div>
          <div>¥0.000</div>
        </li>
        <li>
          <div>实际销售入账</div>
          <div>¥0.000</div>
        </li>
        <li>
          <div>投诉数量</div>
          <div>0条</div>
        </li>
        <li>
          <div>退款订单数量</div>
          <div>0单</div>
        </li>
        <li>
          <div>退款金额</div>
          <div>¥0.000</div>
        </li>
      </ul>
      <ul class="tab">
        <li class="selected">今天</li>
        <li>昨天</li>
        <li>本周</li>
      </ul>
    </div>
    <div class="bottom">
      <ul>
        <li class="selected">销售金额</li>
        <li>订单笔数</li>
        <li>退款金额</li>
        <li>投诉数量</li>
      </ul>
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'webIn',
  data() {
    return {
      notice: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  },
  mounted() {
    Promise.all([
      import('echarts/lib/echarts'),
      import('echarts/lib/chart/line')
    ]).then((ms) => {
      const echarts = ms[0].default
      const myChart = echarts.init(this.$refs.chart)
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.sp-main {
  padding-right: 15px;
  h4 {
    font-size: 14px;
    padding: 0 15px;
    line-height: 36px;
    color: #208ad5;
    border-bottom: 1px solid #e7e7e7;
    background: #f9fafb;
    a {
      float: right;
      font-size: 12px;
      color: #aaa;
    }
  }
  .top {
    height: 250px;
    & > div {
      background: white;
    }
    .info {
      float: right;
      width: 350px;
      height: 250px;
      ul {
        padding-top: 20px;
        font-size: 13px;
        font-weight: 500;
        li {
          & > span:first-child {
            width: 150px;
            display: inline-block;
            text-align: right;
          }
          & > span:last-child {
            color: $--alert-red;
            &.version {
              color: white;
              padding: 5px;
              background: $--alert-red;
            }
            &.realname {
              padding: 2px 4px;
              border-radius: 5px;
              color: $--gray-text-color;
              border: 1px solid $--gray-text-color;
            }
          }
        }
        li + li {
          margin-top: 8px;
        }
      }
    }
    .notice {
      margin-right: 365px;
      ul {
        height: 213px;
        padding: 0 15px;
        overflow-x: hidden;
        overflow-y: auto;
        li {
          line-height: 30px;
          font-size: 12px;
          span {
            float: right;
          }
          a {
            display: block;
          }
        }
      }
    }
  }
  .middle {
    margin-top: 15px;
    height: 250px;
    background: white;
    .datas {
      padding: 20px;
      & > li {
        padding: 10px;
        border: 1px solid #edebea;
        width: 120px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        & + li {
          margin-left: 20px;
        }
      }
    }
    .tab {
      padding-left: 6px;
      li {
        font-size: 12px;
        margin: 6px 14px;
        display: inline-block;
        width: 64px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #238bd5;
        background-color: #f4f4f4;
        cursor: pointer;
        &.selected {
          background-color: #238bd5;
          color: #fff;
        }
      }
    }
  }
  .bottom {
    margin-top: 15px;
    height: 400px;
    background: white;
    padding: 20px;
    ul {
      font-size: 0;
      li {
        font-size: 14px;
        display: inline-block;
        padding: 0 10px;
        height: 32px;
        line-height: 32px;
        color: #238bd5;
        cursor: pointer;
        border: 1px solid #edebea;
        &.selected {
          background-color: #238bd5;
          color: #fff;
        }
      }
    }
    .chart {
      height: 360px;
    }
  }
}
</style>
