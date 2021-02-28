<template>
  <div>
    <wap-header />
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import '@/plugins/vant'
import wapHeader from '@/components/wapHeader'

export default {
  components: {
    wapHeader
  },
  middleware: ['detect', 'site', 'wap'],
  computed: {
    ...mapState({
      site: (state) => state.site
    })
  },
  head() {
    return {
      title: this.site.systemName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.site.remark
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.site.keyWord
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import 'vant/lib/index.css';
html {
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
*:not([class^='van-']) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
  -webkit-tap-highlight-color: transparent;
  color: $--black-text-color;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.van-tabs__line,
.van-button--primary {
  background-color: $--color-primary;
}
.van-button--primary,
.van-sidebar-item--select {
  border-color: $--color-primary;
}
.line2 {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.tbd1px {
  position: relative;
  &::before {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    top: 0;
    left: 0;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  &.bottom::before {
    top: auto;
    bottom: 0;
  }
}
#app .scroll-y {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
