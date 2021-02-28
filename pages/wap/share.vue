<template>
  <section>
    <div class="qrcode">
      <span v-if="codeUrl">
        <img :src="codeUrl" />
      </span>
    </div>
    <p>发送二维码，注册成功后成为下级代理，快速发展下级</p>
    <div class="link" ref="copyBtn">
      <div>也可复制以下链接</div>
      <span>{{ url }}</span>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
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
  layout: 'wap',
  middleware: ['authorization'],
  data() {
    return {
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
  }
}
</script>

<style lang="scss" scoped>
.qrcode {
  padding: 15px;
  img {
    width: 50%;
    margin-left: 25%;
  }
}
p,
.link {
  padding: 15px;
  font-size: 14px;
  color: $--deep-gray-text-color;
}
p {
  border-bottom: 15px solid $--basic-border-color;
}
</style>
