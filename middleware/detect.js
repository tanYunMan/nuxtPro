import { detectBroswer } from '@/common/utils'

export default function({ req, redirect, store }) {
  if (req && req.headers) {
    const browser = detectBroswer(req.headers)
    if (browser) {
      if (req.originalUrl !== '/') {
        redirect('/')
      } else {
        store.commit('updateBorswer', browser)
      }
    }
  }
}
