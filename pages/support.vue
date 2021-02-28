<template>
  <div>
    <h3>
      <span>当前位置：客服</span>
    </h3>
    <section>
      <ul>
        <li>
          <span>客服电话：</span>
          <span>{{ contact.frontServicePhone }}</span>
        </li>
        <li>
          <span>业务电话：</span>
          <span>{{ contact.frontWorkPhone }}</span>
        </li>
        <li>
          <span>加款电话：</span>
          <span>{{ contact.frontMoneyPhone }}</span>
        </li>
        <li>
          <span>客服QQ：</span>
          <span>{{ contact.frontServiceQQ }}</span>
        </li>
        <li>
          <span>业务QQ：</span>
          <span>{{ contact.frontWorkQQ }}</span>
        </li>
        <li>
          <span>加款QQ：</span>
          <span>{{ contact.frontMoneyQQ }}</span>
        </li>
        <li>
          <span>投诉QQ：</span>
          <span>{{ contact.frontComplaintQQ }}</span>
        </li>
        <li>
          <span>QQ群：</span>
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
    </section>
  </div>
</template>

<script>
export default {
  layout: 'webIn',
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
  padding: 15px;
  background: white;
  ul {
    li {
      font-size: 14px;
      line-height: 35px;
      & > span:first-child {
        width: 150px;
        text-align: right;
        padding-right: 15px;
        display: inline-block;
        color: $--color-primary;
      }
    }
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
