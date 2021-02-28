export default {
  data() {
    return {
      activeName: 'common',
      form: {
        login: '',
        userName: '',
        phoneNum: '',
        password: '',
        passwordRepeat: '',
        parentID: '',
        qq: ''
      },
      formRules: {
        login: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        passwordRepeat: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '11位手机号码', trigger: 'blur' }
        ],
        varifyCode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '4位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    tabClick() {
      this.form.password = ''
      this.form.passwordRepeat = ''
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.passwordRepeat) {
            return this.$message.error('两次输入的密码不一致')
          }
          this.doRegister()
        }
      })
    },
    async doRegister() {
      const res = await this.$axios.post('/user/user/register', null, {
        params: this.form,
        tokenUpdate: true
      })
      if (res.code === 1001) {
        this.regSuccess()
      }
    }
  }
}
