const $axios = require('axios')
const nuxtConfig = require('../nuxt.config')

$axios.defaults.baseURL = nuxtConfig.axios.baseURL
$axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
$axios.defaults.timeout = 10000

$axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return error
  }
)
$axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return error
  }
)
$axios.headerUpdate = function(headers) {
  if (headers) {
    $axios.defaults.headers['user-agent'] = headers['user-agent'] || ''
    if (headers['x-forwarded-for']) {
      $axios.defaults.headers['x-forwarded-for'] = headers['x-forwarded-for']
    }
    if (process.env.NODE_ENV === 'production' && headers.host) {
      $axios.defaults.headers.host = headers.host
    }
  }
}

module.exports = $axios
