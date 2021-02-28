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
      <el-form ref="form" label-width="120px">
        <el-form-item label="问题类型：">
          <div>直销订单类</div>
        </el-form-item>
        <el-form-item label="订单号：">
          <div>{{ detail.order ? detail.order.orderCode : '' }}</div>
        </el-form-item>
        <el-form-item label="投诉主题：">
          <div>{{ detail.themeName }}</div>
        </el-form-item>
        <!-- <el-form-item label="联系QQ：">
          <div></div>
        </el-form-item>
        <el-form-item label="联系电话：">
          <div></div>
        </el-form-item> -->
        <el-form-item label="受理状态：">
          <div
            :class="
              detail.complaintState === 2 || detail.complaintState === 3
                ? 'blue'
                : 'red'
            "
          >
            {{ detail.complaintState | complainStateText }}
          </div>
          <ul class="msg-list">
            <li><span>对象</span><span>内容</span><span>时间</span><span>图片</span></li>
            <li v-for="item in msgList" :key="item.complaintContentID">
              <span>{{ item.complaintType === 1 ? '我' : '商家' }}</span>
              <span v-if="item.content">{{ item.content }}</span>
              <span v-else>&nbsp;</span>
              <span>{{ item.replyTime | dateFormat }}</span>
              <span><img :src="item.filePath" @click="toSeeMessageImg(item.filePath)" alt=""></span>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="回复时间：">
          <div></div>
        </el-form-item>
        <el-form-item label="新投诉内容：">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="ThemeContent"
          >
          </el-input>
          <i>最多输入1000个字符，您已投诉{{ ThemeContent.length }}个字符</i>
        </el-form-item>
        <el-form-item>
          <uploadImg v-if="imgLoading" :img-list="filePath" img-name="发卡客户端投诉图片" @listenTochildEvent="showMessageFromChild" />
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



    alert(res)


export default {
  layout: 'webIn',
  data() {
    const complaintID = this.$route.query.complaintID || ''
    return {
      complaintID,
      detail: {},
      ThemeContent: '',
      msgList: [],
      imgLoading: true,
      filePath: '',
      dialogImgSrc: '',
      dialogImgMessagBox: false
    }
  },
  async mounted() {
    const res = await this.$axios.get(
      `/order/complaint/getComplaint?id=${this.complaintID}`
    )

    if (res.code === 1001) {
      this.detail = res.body
    }
    const lres = await this.$axios.post('/order/complaintContent/page', null, {
      params: {
        complaintID: this.complaintID
      }
    })
    if (lres.code === 1001 && lres.body) {
      this.msgList = lres.body.records
    }
  },
  components: {
    uploadImg
  },
  methods: {
    async onSubmit() {
      if (this.ThemeContent.length < 10) {
        return this.$message.error('投诉内容不能少于10个字')
      }
      if (this.ThemeContent.length > 1000) {
        return this.$message.error('投诉内容过长，不能超过1000个字')
      }
      const res = await this.$axios.post(
        '/order/complaintContent/saveBuyer',
        null,
        {
          params: {
            complaintID: this.complaintID,
            content: this.ThemeContent,
            filePath:  this.filePath
          }
        }
      )
      if (res.code === 1001) {
        this.$message.success('投诉提交成功')
        setTimeout(() => {
          location.reload()
        }, 1500)
      }
    },
    showMessageFromChild (str) {
      this.filePath = str
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
.msg-list {
  li {
    overflow: hidden;
    line-height: 30px;
    font-size: 12px;
    &:first-child {
      background-color: $--button-border-primary;
    }
    span {
      float: left;
      padding: 0 15px;
      &:first-child {
        width: 10%;
      }
      &:nth-child(2) {
        width: 50%;
        line-height: 18px;
        padding: 6px 0;
      }
      &:nth-child(3) {
        width: 20%;
      }
      &:last-child {
        width: 20%;
        img {
          width: 50px;
          display: block;
          cursor: pointer;
        }
      }
    }
  }
}
.red {
  font-weight: 600;
  color: $--alert-red;
}
.blue {
  font-weight: 600;
  color: $--color-primary;
}
</style>

<style lang="scss">
.dialogImgBox {
  .el-dialog {
    max-width: 800px;
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
