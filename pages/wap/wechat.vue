<template>
  <div>
    <div class="qrcode">
      <img
        src="http://img5.cache.netease.com/game/2014/6/12/2014061216555650c3d.png"
      />
    </div>
    <p>扫描二维码绑定账号(您也可以截图保存到相册，通过微信扫一扫)</p>
  </div>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.qrcode {
  padding: 60px 15px 15px;
  img {
    width: 70%;
    margin-left: 15%;
  }
}
p {
  padding: 15px;
  font-size: 14px;
  color: $--deep-gray-text-color;
}
</style>
