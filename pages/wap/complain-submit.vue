<template>
  <div>
    <section>
      <van-cell title="订单号：">
        <template #right-icon>
          {{ detail.orderCode }}
        </template>
      </van-cell>
      <van-cell title="商品名称：">
        <template #right-icon>
          {{ detail.goodsName }}
        </template>
      </van-cell>
      <!-- <van-cell title="投诉原因：">
        <template #right-icon>
          {{ resaon }}
        </template>
      </van-cell> -->
      <van-cell
        title="投诉原因"
        is-link
        :value="resaon"
        @click="showReason = true"
        v-if="columns.length != 0"
      ></van-cell>
       <van-field
       v-else
        v-model="resaon"
        rows="1"
        label="投诉原因："
        type="text"
        placeholder="请输入投诉原因"
      />
      <van-popup v-model="showReason" position="bottom">
        <van-picker
          show-toolbar
          value-key="themeName"
          :columns="columns"
          @cancel="showReason = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <!-- <van-field
        v-model="qq"
        label="联系QQ（必填）："
        label-width="150"
        required
        placeholder="请输入联系QQ"
      />
      <van-field
        v-model="phone"
        label="联系电话："
        placeholder="请输入联系电话 "
      /> -->
      <!-- <van-field
        v-model="message"
        placeholder="请用一句话描述您的诉求，例如我要退款 "
      /> -->
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
      <van-button :loading="isLoading" @click="submit" type="primary"
        >确认投诉</van-button
      >
    </footer>
  </div>
</template>

<script>
export default {
  layout: 'wap',
  data() {
    return {
      detail: {},
      qq: '',
      phone: '',
      resaon: '',
      message: '',
      showReason: false,
      content: '',
      columns: [],
      isLoading: false
    }
  },
  async mounted() {
    const { orderId } = this.$route.query
    const res = await this.$axios.get('/order/order/orderDetails', {
      params: {
        orderID: orderId
      }
    })
    if (res.code === 1001 && res.body) {
      this.detail = res.body
    }
    this.getReasons()
  },
  methods: {
    async getReasons() {
      const res = await this.$axios.get(
        '/order/complaintTheme/complaintThemeList'
      )
      if (res.code === 1001 && res.body) {
        this.columns = res.body
      }
    },
    onConfirm(item) {
      this.resaon = item.themeName
      this.showReason = false
    },
    async submit() {
      if (this.isLoading) return
      if (!this.resaon) {
        return this.$notify({ type: 'danger', message: '请输入投诉主题' })
      }
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
      this.isLoading = true
      const res = await this.$axios.post(
        '/order/complaint/saveComplaint',
        null,
        {
          params: {
            orderID: this.detail.orderID,
            themeName: this.resaon,
            content: this.content
          }
        }
      )
      if (res.code === 1001) {
        this.$notify({ type: 'success', message: '投诉提交成功' })
        location.href = '/wap/complain'
      } else {
        this.isLoading = false
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
</style>
