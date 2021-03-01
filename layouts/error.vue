<template>
  <div class="main">
    <p align="center">
      <span class="red" style="color:#FF9900;font-family:Microsoft YaHei;font-size:24px;">温馨提示：</span>
    </p>
    <p style="text-align:center;">该域名尚未搭建,可以使用!</p>
  </div>
</template>

<script>
export default {
  props:['error']
}
</script>

<style scoped>
a{text-decoration:none;}
.main{ width:680px; border:1px solid #eba25e; margin:60px auto 0;padding-left:40px; }
</style> 