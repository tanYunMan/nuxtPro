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
  padding: 20px;
  font-size: 13px;
  text-align: center;
  z-index: 2;
  min-width: 1190px;
  color: #fff;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  p + p {
    margin-top: 10px;
  }
}
</style>
