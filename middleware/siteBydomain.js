export default async function({ store, $axios }) {
  const res = await $axios.get('/site/systemStyle/getSiteBydomain')
  if (res.code === 1001 && res.body) {
    store.commit('updateSystemStyle', res.body || {})
    if (res.body.mobile === 0) {
      store.commit('setMobileShow', 0)
    }
  }
}
