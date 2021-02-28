export default async function ({ $axios, store }) {
  if (store.state.browser) return
  const a = await $axios.get('/site/siteExtend/getSiteExtend')
  if (a.code === 1001 && a.body) {
    store.commit('updateSite', a.body)
  }
  const b = await $axios.get('/site/decorationCode/getFK')
  if (b.code === 1001 && b.body) {
    store.commit('updateFixup', b.body)
  }
}
