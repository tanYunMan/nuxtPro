<template>
  <div class="vip">
    <el-dialog title="架设Vip站" width="30%" :visible.sync="visible" @closed="dialogClose()">
      <el-row :gutter="20">
        <el-form
          style="padding: 20px"
          :model="form"
          ref="form"
          :rules="rules"
          label-width="80px"
          size="small"
        >
          <el-col :span="24" :offset="0">
            <el-form-item label="站点名称" prop="siteName">
              <el-input v-model="form.siteName" clearble placeholder="请输入站点名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="账号" prop="login">
              <el-input v-model="form.login" clearble placeholder="请输入扎民航局安排"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" clearble placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="QQ" prop="qq">
              <el-input v-model="form.qq" clearble placeholder="请输入qq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="域名" prop="domainPre">
              <el-input v-model="form.domainPre" clearble placeholder="请输入域名前缀"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14" :offset="0">
            <el-form-item label-width="0" prop="domainID">
              <el-select
                size="small"
                style="width: 100%"
                v-model="form.domainID"
                placeholder="请选择域名"
                clearable
                filterable
              >
                <el-option
                  v-for="item in domainList"
                  :key="item.domainID"
                  :label="item.domainAddr"
                  :value="item.domainID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="套餐" prop="subPackageID">
              <div style="color: red;margin-bottom: 10px">点击表格行即可选中</div>
              <el-table
                class="vip-table"
                highlight-current-row
                @current-change="selectRow"
                :data="packageList"
                border
              >
                <el-table-column width="40px">
                  <template slot-scope="{row}">
                    <el-radio v-model="form.subPackageID" :label="row.subPackageID" @change="selectRadio(row)"><span style="display:none">aa</span></el-radio>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="money" label="价格"></el-table-column>
                <el-table-column prop="edition.editionName" label="版本"></el-table-column>
                <el-table-column prop="level.levelName" label="级别"></el-table-column>
              </el-table>
            </el-form-item>
          </el-col>

          <el-col :span="24" :offset="0">
            <el-form-item>
              <el-button type="primary" @click="add">立即创建</el-button>
              <el-button @click="dialogClose">取消</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {},
      packageList: [],
      rules: {
        siteName: [
          { required: true, message: '请输入站点名称', trigger: 'blur' }
        ],
        qq: [
          { required: true, message: '请输入qq', trigger: 'blur' }
        ],
        login: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        qq: [{ required: true, message: '请输入QQ', trigger: 'blur' }],
        domainPre: [
          { required: true, message: '请输入域名前缀 ', trigger: 'blur' }
        ],
        domainID: [
          { required: true, message: '请选择域名', trigger: 'change' }
        ],
        subPackageID: [
          { required: true, message: '请选择套餐', trigger: 'change' }
        ]
      },
      domainList: []
    }
  },
  watch: {
    visible: function(newVal, oldVal) {
      if (newVal) {
        this.getDomainList()
        this.getPackageList()
      }
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    dialogClose() {
      this.visible = false
    },
    selectRadio(row) {
      this.form.subPackageID = row.subPackageID
    },
    selectRow(row) {
      this.form.subPackageID = row.subPackageID
    },
    add() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/platform/site/addSubForUser', this.form)
            .then((res) => {
              if (res.code === 1001) {
                this.$message.success('操作成功！')
                this.visible = false
              }
            })
        } else {
          return false
        }
      })
    },
    getPackageList() {
      this.$axios.get('/site/subPackage/list').then((res) => {
        this.packageList = res.body
      })
    },
    getDomainList() {
      this.$axios.get('/platform/systemDomain/list').then((res) => {
        this.domainList = res.body
      })
    }
  }
}
</script>

