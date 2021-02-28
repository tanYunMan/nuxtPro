import user from '@/common/user'
import  qs from 'qs'
function reject(msg) {
  return Promise.reject(new Error(msg || '网络异常，请稍后再试'))
}

export default function({ $axios, redirect, app, req, error }) {
  $axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  $axios.defaults.timeout = 10000
  if (process.server && req.headers) {
    $axios.defaults.headers['user-agent'] = req.headers['user-agent'] || ''
    if (req.headers['x-forwarded-for']) {
      $axios.defaults.headers['x-forwarded-for'] =
        req.headers['x-forwarded-for']
    }
    // 生产环境，才添加host
    if (process.env.NODE_ENV === 'production' && req.headers.host) {
      $axios.defaults.headers.host = req.headers.host
    }
  }
  $axios.interceptors.request.use(
    (config) => {
      // 加入公共x-auth-token
      const token = user.authToken(app.$cookies)
      if (token) {
        config.headers['x-auth-token'] = token
      }
      console.log(config.headers)
      if(config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        config.data = qs.stringify(config.data)
      }
      return config
    },
    (error) => {
      console.log('保存',error)
      return reject(error.message)
    }
  )
  $axios.interceptors.response.use(
    (response) => {
      if (response.status === 203) {
        user.removeToken(app.$cookies)
        if (process.server) {
          redirect('/')
        }
      } else if (response.status === 200) {
        // 非法域名，展示404
        if (process.server && response.data.code === 1004) {
          error({ message: '404', statusCode: 404 })
        } else if (process.browser && response.data.code !== 1001) {
          // 错误情况
          // window.alertError &&
          //   window.alertError(response.data.msg || '网络异常，请稍后再试')
        }
        // 写入x-auth-token到cookie
        if (response.config.tokenUpdate && response.headers['x-auth-token']) {
          user.updateToken(response.headers['x-auth-token'], app.$cookies)
        }
        if (typeof response.data === 'object') {
          return response.data
        }
      }
      return reject()
    },
    (error) => {
      return reject(error.message)
    }
  )
}
