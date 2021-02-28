import moment from 'moment'
import user from '@/common/user'

export const parseCookie = (cookieStr = '') => {
  const cookieArr = cookieStr.split(';')
  const cookie = {}
  if (cookieArr.length > 0) {
    cookieArr.forEach((str) => {
      const ck = str.split('=')
      if (ck.length > 1) {
        cookie[ck[0].trim()] = ck[1]
      }
    })
  }
  return cookie
}

export function dateFormat(tms, fmt) {
  if (tms === null) return ''
  if (!fmt) {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  const date = new Date(tms)
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (const k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

export function toFixed3(num) {
  num = Number(num)
  if (!isNaN(num)) {
    return num.toFixed(3)
  } else {
    return '0.000'
  }
}

export function toFixed2(num) {
  num = Number(num)
  if (!isNaN(num)) {
    return num.toFixed(2)
  } else {
    return '0.00'
  }
}

export function xmlSyncRequest(instance, path, formData) {
  const { baseURL } = instance.$axios.defaults
  const params = []
  for (const k in formData) {
    params.push(`${k}=${formData[k]}`)
  }
  const reqUrl = `${baseURL}${path}${
    ~path.indexOf('?') ? '&' : '?'
  }${params.join('&')}&_t=${Date.now()}`
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('post', reqUrl, false)
  xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xmlHttp.setRequestHeader('x-auth-token', user.authToken(instance.$cookies))
  xmlHttp.send(null)
  let res = {}
  if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
    try {
      res = JSON.parse(xmlHttp.responseText)
    } catch (e) {}
  }
  return res
}

export function paySubmit(data) {
  const formData = { ...data }
  // 移除postUrl
  const postUrl = formData.postUrl
  delete formData.postUrl
  // 创建表单
  const form = document.createElement('FORM')
  form.setAttribute('method', 'post')
  form.setAttribute('target', '_blank')
  for (const k in formData) {
    const inp = document.createElement('INPUT')
    inp.name = k
    if (typeof formData[k] === 'object') {
      inp.value = JSON.stringify(formData[k])
    } else {
      inp.value = formData[k]
    }
    form.appendChild(inp)
  }
  form.action = postUrl
  document.body.appendChild(form)
  form.submit()
  setTimeout(() => {
    document.body.removeChild(form)
  }, 200)
}

export function getTimeArr(type) {
  let from = ''
  let to = ''
  switch (type) {
    case 0:
      from = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD 00:00:00')
      to = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD 23:59:59')
      break
    case 1:
      from = moment().format('YYYY-MM-DD 00:00:00')
      to = moment().format('YYYY-MM-DD 23:59:59')
      break
    case 2:
      from = moment()
        .day('Monday')
        .format('YYYY-MM-DD 00:00:00')
      to = moment()
        .subtract('Monday')
        .day(+7)
        .format('YYYY-MM-DD 23:59:59')
      break
    case 3:
      from = moment()
        .startOf('month')
        .format('YYYY-MM-DD 00:00:00')
      to = moment()
        .endOf('month')
        .format('YYYY-MM-DD 23:59:59')
      break
    case 4:
      from = moment()
        .subtract(1, 'month')
        .format('YYYY-MM-DD 00:00:00')
      to = moment().format('YYYY-MM-DD 23:59:59')
      break
    case 5:
      from = moment()
        .subtract(3, 'month')
        .format('YYYY-MM-DD 00:00:00')
      to = moment().format('YYYY-MM-DD 23:59:59')
      break
    default:
      break
  }
  return { from, to }
}

export function imgCache(url, width, height, type = 2) {
  let ext = `?imageView2/${type}`
  if (width > 0) {
    ext += `/w/${width}`
  }
  if (height > 0) {
    ext += `/h/${height}`
  }
  return url + ext
}

export function randomString(len) {
  len = len || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export const detectBroswer = (headers) => {
  let browser = ''
  const ua = headers['user-agent'] || ''
  // QQ或微信中，提示去浏览器打开
  if (~ua.indexOf('MicroMessenger')) {
    browser = 'w'
  } else if (~ua.indexOf('QQ/')) {
    browser = 'q'
  }
  return browser
}
