<template>
  <div>
    <h3>
      <span>当前位置：推广</span>
    </h3>
    <h4>
      代理推广链接
      <span>(访问该链接，即可实现注册为下级代理)</span>
    </h4>
    <section>
      <div class="row">
        <span>注册推广链接：</span>
        <a :href="url" target="_blank">{{ url }}</a>
      </div>
      <div class="row">
        <span>二维码链接：</span>
        <div v-if="codeUrl" style="display: inline-block">
          <img :src="codeUrl" />
        </div>
      </div>
      <div class="row">
        <span>分享链接</span>
        <div style="display: inline-block;" ref="share"></div>
      </div>
      <el-button v-if="supportCopy" ref="copyBtn" :data-clipboard-text="url"
        >复制链接</el-button
      >
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ClipboardJS from 'clipboard'
import QRCode from 'qrcode'

const options = {
  errorCorrectionLevel: 'H',
  margin: 1
  // type: 'image/jpeg',
  // quality: 1,
  // color: {
  //   dark: '#010599FF',
  //   light: '#FFBF60FF'
  // }
}

export default {
  layout: 'webIn',
  data() {
    return {
      supportCopy: false,
      url: '',
      codeUrl: ''
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  async mounted() {
    this.url = `${location.origin}/register?parentNo=${this.user.localUserID}`
    this.codeUrl = await QRCode.toDataURL(this.url, options)
    this.supportCopy = ClipboardJS.isSupported()
    this.$nextTick(() => {
      const clipboard = new ClipboardJS(this.$refs.copyBtn.$el)
      clipboard.on('success', (e) => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
        e.clearSelection()
      })

      clipboard.on('error', () => {
        this.$message.error('复制失败，请手动复制链接！')
      })
    })
    this.$refs.share.innerHTML =
      '<div class="bshare-custom icon-medium"><a title="分享到QQ空间" class="bshare-qzone"></a><a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到网易微博" class="bshare-neteasemb"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a><span class="BSHARE_COUNT bshare-share-count">0</span></div>'
    const a = document.createElement('SCRIPT')
    a.src =
      'http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh'
    document.body.appendChild(a)
    a.onload = () => {
      const b = document.createElement('SCRIPT')
      b.src = 'http://static.bshare.cn/b/bshareC0.js'
      document.body.appendChild(b)
      b.onload = () => {
        window.bShare.addEntry({
          url: this.url
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-size: 13px;
  color: $--basic-orange;
  background: white;
  padding: 10px 15px;
  margin-top: 15px;
  span {
    color: $--basic-red;
  }
}
section {
  padding: 15px;
  background: white;
  margin-top: 15px;
  min-height: 441px;
  .row {
    font-size: 14px;
    & > span:first-child {
      width: 100px;
      display: inline-block;
      text-align: right;
    }
    img {
      width: 200px;
      height: 200px;
      vertical-align: text-top;
    }
    & + .row {
      margin-top: 15px;
    }
  }
  .el-button {
    margin: 15px 0 0 100px;
  }
}
</style>
