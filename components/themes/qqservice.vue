<template>
  <div class="OnlineService_Bg">
    <div class="OnlineService_Box">
      <div class="OnlineService_Phone">
        <a target="_blank" :href="qqLink">在线客服</a>
      </div>
      <div class="OnlineService_Sign">
        <a target="_blank" :href="qunLink">立即加群</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    qqLink: String,
    qunLink: String
  },
  data() {
    let idx = -1
    if (this.$route.name === 'themes') {
      idx = 0
    } else if (this.$route.name === 'register') {
      idx = 1
    } else if (~this.$route.name.indexOf('notice')) {
      idx = 2
    }
    return {
      idx
    }
  },
  created() {
    console.log(this.qunLink)
  },
  computed: {
    ...mapState({
      site: (state) => state.site
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.OnlineService_Bg {
  width: 100px;
  overflow: hidden;
  position: fixed;
  right: 10px;
  top: 160px;
  z-index: 10;
}
.OnlineService_Box {
  width: 100%;
  overflow: hidden;
}
.OnlineService_Phone {
  width: 90px;
  height: 90px;
  margin-bottom: 10px;
}
.OnlineService_Phone a {
  display: block;
  width: 90px;
  border: 1px solid rgba(222, 243, 253, 0.5);
  padding-top: 57px;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
  color: red;
  background-image: url(//kmzx.leyiv.com/i/d/c/02/leyi/img/qq.png);
  background-repeat: no-repeat;
  background-position: center 8px;
  cursor: pointer;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.5);
}
.OnlineService_Sign {
  width: 90px;
  height: 90px;
  margin-bottom: 10px;
}
.OnlineService_Sign a {
  display: block;
  width: 90px;
  border: 1px solid rgba(222, 243, 253, 0.5);
  padding-top: 57px;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
  color: red;
  background-image: url(//kmzx.leyiv.com/i/d/c/02/leyi/img/qun.png);
  background-repeat: no-repeat;
  background-position: center 8px;
  cursor: pointer;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
