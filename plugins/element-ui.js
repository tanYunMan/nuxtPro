import Vue from 'vue'
import Element, { Message } from 'element-ui'
import IEVersion from '@/common/ie'

if (process.browser) {
  if (IEVersion() === 9) {
    // ie9下，处理table宽度异常问题
    Element.Table.mixins.push({
      mounted() {
        setTimeout(() => {
          this.doLayout()
        })
      }
    })
  }
}

Vue.use(Element)

if (process.browser) {
  window.alertError = (msg) => {
    Message.error(msg)
  }
}
