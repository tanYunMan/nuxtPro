import Vue from 'vue'
import { dateFormat, toFixed3, toFixed2, imgCache } from '@/common/utils'

Vue.filter('dateFormat', dateFormat)
Vue.filter('imgCache', imgCache)
Vue.filter('n3', toFixed3)
Vue.filter('n2', toFixed2)
Vue.filter('stateText', function(state) {
  if (state === 0) {
    return '待支付'
  } else if (state === 1) {
    return '未处理'
  } else if (state === 2) {
    return '处理中'
  } else if (state === 3) {
    return '处理完毕'
  } else if (state === 4) {
    return '投诉中'
  } else if (state === 5) {
    return '已退款'
  } else if (state === 6) {
    return '已关闭'
  }
})
Vue.filter('complainStateText', function(state) {
  if (state === 1) {
    return '尚未处理'
  } else if (state === 2) {
    return '已经完成'
  } else if (state === 3) {
    return '处理完成'
  } else if (state === 4) {
    return '无法处理'
  }
})
