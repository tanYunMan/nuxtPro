<template>
  <section class="main-section sec">
    <div class="top-bg"></div>
    <div class="content main-w">
      <homeLeftNav :index="1" />
      <main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>联系方式</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <ul>
            <li>
              <label>客服电话：</label>
              <span class="num">{{ contact.frontServicePhone }}</span>
            </li>
            <li>
              <label>业务电话：</label>
              <span class="num">{{ contact.frontWorkPhone }}</span>
            </li>
            <li>
              <label>加款电话：</label>
              <span class="num">{{ contact.frontMoneyPhone }}</span>
            </li>
            <li>
              <label>客服QQ：</label>
              <span>{{ contact.frontServiceQQ }}</span>
            </li>
            <li>
              <label>业务QQ：</label>
              <span>{{ contact.frontWorkQQ }}</span>
            </li>
            <li>
              <label>加款QQ：</label>
              <span>{{ contact.frontMoneyQQ }}</span>
            </li>
            <li>
              <label>投诉QQ：</label>
              <span>{{ contact.frontComplaintQQ }}</span>
            </li>
            <li>
              <label>QQ群：</label>
              <span>{{ contact.qQun }}</span>
            </li>
            <li>
              <span>微信号：</span>
              <span>{{ contact.weChat }}</span>
            </li>
            <li>
              <span>微信二维码：</span>
              <div class="wechat">
                <img :src="contact.weChatImg" />
              </div>
            </li>
            <li>
              <span>工作时间：</span>
              <span>{{ contact.workTIme }}</span>
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
    const res = await $axios.get('/site/onlineService/getFK')
    if (res.code === 1001 && res.body) {
      return {
        contact: res.body
      }
    }
    return {
      contact: {}
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
    margin-top: 20px;
    li {
      line-height: 40px;
      label + span {
        margin-left: 5px;
      }
    }
  }
  .num {
    font-weight: 600;
    color: $--basic-red;
    font-family: Constantia, Georgia;
  }
  .wechat {
    width: 200px;
    height: 200px;
    display: inline-block;
    vertical-align: top;
    img {
      object-fit: contain;
    }
  }
}
</style>
