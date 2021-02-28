<template>
  <div>
    <van-cell title="客户编号" value="666" />
    <van-cell title="域名后缀" is-link />
    <van-field
      v-model="value"
      placeholder="二级域名，如abc.xxx.com，只需填写abc"
    />
    <van-cell title="完整域名" value />
    <van-field v-model="value" placeholder="请输入网站名称" />
    <van-cell title="网站风格" is-link />
    <van-radio-group v-model="radio">
      <van-cell title="套餐1" clickable @click="radio = '1'">
        <van-radio slot="right-icon" name="1" />
      </van-cell>
    </van-radio-group>
    <van-cell title="套餐价格" value="50.00" />
    <van-cell title="套餐级别" value="总站站长" />
    <van-cell title="套餐版本" value="普及版" />
    <div class="price">¥ 0</div>
    <van-button @click="confirm" class="sure" type="primary"
      >确认搭建</van-button
    >
  </div>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {
      value: '',
      radio: 0
    }
  },
  methods: {
    confirm() {}
  }
}
</script>

<style lang="scss" scoped>
.price {
  border-top: 10px solid $--basic-border-color;
  padding: 15px 15px 60px 15px;
  color: $--basic-red;
  font-size: 22px;
  font-weight: 600;
}

.sure {
  color: white;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 16px;
  font-weight: 500;
}
</style>
