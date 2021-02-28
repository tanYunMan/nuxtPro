<template>
  <footer>
    <p>{{ site.operator }}</p>
    <p>{{ site.icp }}&nbsp;&nbsp;{{ site.icp2 }}</p>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      site: (state) => state.site
    })
  }
}
</script>

<style lang="scss" scoped>
footer {
  background-color: $--footer-bg;
  padding: 20px;
  font-size: 13px;
  text-align: center;
  position: relative;
  z-index: 2;
  min-width: 1190px;
  p + p {
    margin-top: 10px;
  }
}
</style>
