export default {
  data() {
    return {
      url: '',
      pageNo: 0,
      pageSize: 20,
      totalPage: 1,
      list: [],
      listLoading: false,
      finished: false
    }
  },
  methods: {
    async getList(refresh) {
      if (refresh) {
        this.pageNo = 0
        this.totalPage = 1
        this.list = []
        this.listLoading = true
      }
      this.pageNo++
      if (this.totalPage < this.pageNo) return
      let params = {}
      if (this.getParams) {
        params = this.getParams()
      }
      const res = await this.$axios.post(this.url, null, {
        params: {
          ...params,
          pageNum: this.pageNo,
          pageSize: this.pageSize
        }
      })
      this.listLoading = false
      if (res.code === 1001 && res.body) {
        this.list = this.list.concat(res.body.records)
        this.totalPage = Math.ceil(res.body.total / this.pageSize)
        if (this.pageNo >= this.totalPage) {
          this.finished = true
        }
      }
    }
  }
}
