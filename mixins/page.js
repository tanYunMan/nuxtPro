export default {
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 20
      },
      dataTotal: 0,
      multipleSelection: [],
      idKey: ''
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    pageChage(val) {
      this.query.pageNum = val
      this.getList && this.getList()
    },
    selectIds(key) {
      const ids = []
      this.multipleSelection.forEach((item) => {
        ids.push(item[key || this.idKey])
      })
      return ids
    }
  }
}
