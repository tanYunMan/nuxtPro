<template>
  <section>
    <van-cell title="当前状态" value="启用交易密码">
      <van-icon slot="right-icon" name="certificate" />
    </van-cell>
    <h4>当前操作</h4>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="修改交易密码" clickable @click="radio = '1'">
          <van-radio slot="right-icon" name="1" />
        </van-cell>
        <van-cell title="取消交易密码" clickable @click="radio = '2'">
          <van-radio slot="right-icon" name="2" />
        </van-cell>
        <van-cell title="功能绑定" clickable @click="radio = '3'">
          <van-radio slot="right-icon" name="3" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div v-if="radio === '1'">
      <h4>修改交易密码</h4>
      <div class="board">
        <van-field
          v-model="oldPassword"
          type="password"
          placeholder="请输入原交易密码"
          required
        />
        <van-field
          :right-icon="pwType === 'text' ? 'eye-o' : 'closed-eye'"
          @click-right-icon="changePwType"
          v-model="password"
          :type="pwType"
          placeholder="设置新密码，建议至少使用两种字符组合"
          required
        />
        <van-field
          v-if="active === 0"
          v-model="newPassword"
          :type="pwType"
          placeholder="请确认新密码"
          required
        />
      </div>
    </div>
    <div v-if="radio === '3'">
      <h4>修改功能绑定</h4>
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="i in 10"
            clickable
            :key="i"
            :title="`复选框 ${i}`"
            @click="toggle(index)"
          >
            <van-checkbox :name="i" ref="checkboxes" slot="right-icon" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
    <van-button @click="confirm" class="sure" type="primary"
      >确认设置</van-button
    >
  </section>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {
      active: 0,
      radio: '1',
      oldPassword: '',
      password: '',
      newPassword: '',
      pwType: 'password',
      result: []
    }
  },
  methods: {
    changePwType() {
      if (this.pwType === 'password') {
        this.pwType = 'text'
      } else {
        this.pwType = 'password'
      }
    },
    confirm() {}
  }
}
</script>

<style lang="scss" scoped>
.van-icon-certificate {
  color: $--color-primary;
  font-size: 20px;
  margin-left: 10px;
  line-height: inherit;
}
h4 {
  padding: 10px 15px;
  background: $--light-color-primary;
}
.board {
  padding: 0 8px;
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
