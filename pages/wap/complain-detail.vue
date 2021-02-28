<template>
  <div>
    <section>
      <van-cell title="订单号：">
        <template #right-icon>
          {{ detail.order ? detail.order.orderCode : '' }}
        </template>
      </van-cell>
      <van-cell title="商品名称：">
        <template #right-icon>
          {{ detail.order ? detail.order.goodsName : '' }}
        </template>
      </van-cell>
      <van-cell title="受理状态：">
        <template #right-icon>
          <span
            class="status"
            :class="{
              danger: detail.complaintState !== 2 && detail.complaintState !== 3
            }"
            >{{ detail.complaintState | complainStateText }}</span
          >
        </template>
      </van-cell>
      <van-cell class="van-otitle" title="投诉详情"></van-cell>
      <ul class="msg-list">
        <li><span>对象</span><span>内容</span><span>时间</span></li>
        <li
          class="tbd1px"
          v-for="item in msgList"
          :key="item.complaintContentID"
        >
          <span>{{ item.complaintType === 1 ? '我' : '商家' }}</span>
          <span v-if="item.content">{{ item.content }}</span>
          <span v-else>&nbsp;</span>
          <span>{{ item.replyTime | dateFormat }}</span>
        </li>
      </ul>
      <div class="separate"></div>
      <van-field
        v-model="content"
        rows="4"
        label="投诉内容："
        type="textarea"
        placeholder="请输入投诉内容"
      />
    </section>
    <footer class="buy tbd1px">
      <van-button @click="submit" type="primary">确认回复</van-button>
    </footer>
  </div>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {
      detail: {},
      msgList: [],
      content: ''
    }
  },
  async mounted() {
    const { complainId } = this.$route.query
    this.complaintID = complainId
    const res = await this.$axios.get(
      `/order/complaint/getComplaint?id=${complainId}`
    )
    if (res.code === 1001) {
      this.detail = res.body
    }
    const lres = await this.$axios.post('/order/complaintContent/page', null, {
      params: {
        complaintID: complainId
      }
    })
    if (lres.code === 1001 && lres.body) {
      this.msgList = lres.body.records
    }
  },
  methods: {
    async submit() {
      if (this.content.length < 10) {
        return this.$notify({
          type: 'danger',
          message: '投诉内容不能少于10个字'
        })
      }
      if (this.content.length > 1000) {
        return this.$notify({
          type: 'danger',
          message: '投诉内容过长，不能超过1000个字'
        })
      }
      const res = await this.$axios.post(
        '/order/complaintContent/saveBuyer',
        null,
        {
          params: {
            complaintID: this.complaintID,
            content: this.content
          }
        }
      )
      if (res.code === 1001) {
        this.$notify({ type: 'success', message: '投诉提交成功' })
        setTimeout(() => {
          location.reload()
        }, 1500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.separate {
  height: 10px;
  background: $--basic-border-color;
}
.buy {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: white;
  button {
    width: 100%;
  }
}
.van-otitle {
  font-size: 16px;
  font-weight: 600;
  background: #ebedf0;
}
.status {
  font-weight: 600;
  color: $--color-primary;
  &.danger {
    color: $--alert-red;
  }
}
.msg-list {
  li {
    overflow: hidden;
    font-size: 12px;
    &:first-child {
      background-color: $--button-border-primary;
    }
    span {
      float: left;
      padding: 6px 15px;
      line-height: 16px;
      &:first-child {
        width: 15%;
      }
      &:nth-child(2) {
        width: 55%;
        padding: 6px 0;
      }
      &:last-child {
        width: 30%;
      }
    }
  }
}
</style>
