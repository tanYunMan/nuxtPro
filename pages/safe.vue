<template>
  <div>
    <h3>
      <span>当前位置：帐户安全设置定</span>
    </h3>
    <section>
      <ul>
        <li>
          <el-button type="primary">立即设置</el-button>
          <h4>微信安全绑定</h4>
          <p>开通微信安全绑定，确保您的账户安全。</p>
        </li>
        <li>
          <el-button type="primary">立即设置</el-button>
          <h4>交易密码验证</h4>
          <p>
            请设置6位以上的密码，并且强烈建议您启用交易密码，启用交易密码后在进行购买、划款等重要地方需要输入验证，有效的确保了您的帐户资金安全。
          </p>
        </li>
        <li>
          <el-button type="primary">立即设置</el-button>
          <h4>手机绑定</h4>
          <p>
            请输入11位手机号码，并且强烈建议您绑定手机，绑定手机后可以有效的确保您的帐户安全。
          </p>
        </li>
        <li>
          <el-button type="primary">立即设置</el-button>
          <h4>硬件信息绑定</h4>
          <p>
            绑定硬件信息可以大大提高帐户安全性，网站控件程序可以取得您电脑上的网卡、硬盘及CPU编码并进行加密绑定，在您登录的时候进行比对，以此来判断用户是否合法，达到提高帐户安全性的目的。
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'webIn'
}
</script>

<style lang="scss" scoped>
section {
  padding: 15px;
  background: white;
  overflow: hidden;
  ul {
    li {
      width: 50%;
      height: 120px;
      float: left;
      padding: 15px;
      box-sizing: border-box;
      &:first-child,
      &:nth-child(2) {
        border-bottom: 1px solid $--basic-border-color;
      }
      &:first-child,
      &:nth-child(3) {
        border-right: 1px solid $--basic-border-color;
      }
      p {
        font-size: 12px;
        margin: 10px 120px 0 0;
        color: $--gray-text-color;
      }
      .el-button {
        float: right;
        margin-top: 15px;
      }
    }
  }
}
</style>
