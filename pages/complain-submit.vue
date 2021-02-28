<template>
  <div>
    <h3>
      <span>当前位置：订单投诉</span>
    </h3>
    <section class="tip">
      特别提示
      “卡密平台”仅为系统服务商，不参与商户经营，您与商户产生纠纷，请自行协商解决，但“卡密平台”不允许商户出售违法违规商品，一旦您发现商户出售该等商品，可向执法机关举报，也可向“卡密平台”投诉，投诉方式：tousu.xxxx.com，“卡密平台”将保留相关证据并呈交给执法机关！
    </section>
    <section>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item v-if="type === 'order'" label="问题类型：">
          <div>直销订单类</div>
        </el-form-item>
        <el-form-item v-if="type === 'suggest'" label="投诉主题：">
          <el-input v-model="form.themeName"></el-input>
        </el-form-item>
        <div v-if="type === 'order'">
          <el-form-item label="订单号：">
            <div v-if="orderCode">{{ orderCode }}</div>
            <template v-else>
              <el-input v-model="form.orderCode"></el-input><em>必须填，否则将无法查到相关订单</em>
            </template>
          </el-form-item>
          <el-form-item label="投诉主题：" v-if="options.length != 0">
            <el-select v-model="form.themeName" filterable allow-create default-first-option placeholder="请选择投诉主题">
              <el-option v-for="item in options" :key="item.themeID" :label="item.themeName" :value="item.themeName"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="投诉主题：" v-else>
            <el-input v-model="form.themeName"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="投诉内容：">
          <el-input type="textarea" placeholder="请输入内容" v-model="form.content">
          </el-input>
          <i>最多输入1000个字符，您已投诉{{ form.content.length }}个字符</i>
        </el-form-item>
        <el-form-item>
          <uploadImg v-if="imgLoading" :img-list="form.filePath" img-name="发卡客户端投诉图片" @listenTochildEvent="showMessageFromChild" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认提交</el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogImgMessagBox"
      width="60%"
      class="dialogImgBox">
      <img :src="dialogImgSrc" alt="">
    </el-dialog>
  </div>
</template>

<script>
import uploadImg from '@/components/uploadImg'

export default {
  layout: 'webIn',
  data() {
    const orderID = this.$route.query.orderID || ''
    const orderCode = this.$route.query.orderCode || ''
    let type = this.$route.query.type
    if (orderCode) {
      type = 'order'
    }
    return {
      type,
      orderCode,
      options: [],
      form: {
        orderID,
        themeName: '',
        content: ''
      },
      imgLoading: true,
      dialogImgSrc: '',
      dialogImgMessagBox: false
    }
  },
  async mounted() {
    const res = await this.$axios.get(
      '/order/complaintTheme/complaintThemeList'
    )
    if (res.code === 1001 && res.body) {
      this.options = res.body
    }
  },
  components: {
    uploadImg
  },
  methods: {
    async onSubmit() {
      if (this.type === 'order') {
        if (!this.form.orderCode && !this.form.orderID) {
          return this.$message.error('请输入投诉订单号')
        }
      }
      if (!this.form.themeName) {
        return this.$message.error('请输入投诉主题')
      }
      if (this.form.content.length < 10) {
        return this.$message.error('投诉内容不能少于10个字')
      }
      if (this.form.content.length > 1000) {
        return this.$message.error('投诉内容过长，不能超过1000个字')
      }
      const loading = this.$loading()
      const res = await this.$axios.post(
        '/order/complaint/saveComplaint',
        null,
        { params: this.form }
      )
      if (res.code === 1001) {
        this.$message.success('投诉提交成功')
        location.href = '/complain'
      } else {
        loading.close()
      }
    },
    showMessageFromChild (str) {
      this.form.filePath = str
    },
    toSeeMessageImg (src) {
      this.dialogImgSrc = src
      this.dialogImgMessagBox = true
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  font-size: 12px;
  padding: 10px 15px;
  background: white;
  color: $--basic-orange;
  margin-bottom: 15px;
}
section + section {
  margin-top: 15px;
  background: #fff;
  padding: 15px;
}
section {
  ::v-deep.el-form {
    .el-input {
      width: 500px;
      margin-right: 10px;
    }
    .el-input + em {
      font-size: 12px;
      color: #bfbfbf;
    }
    .el-textarea {
      textarea {
        width: 500px;
        resize: none;
        height: 100px;
      }
      & + i {
        font-style: normal;
      }
    }
  }
}
</style>
