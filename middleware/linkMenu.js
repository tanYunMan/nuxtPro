export default async function({ store, app, $axios, redirect, route }) {
    console.log(666666666666)
    const res = await $axios.get('/site/customMenu/list')
    if (res.code === 1001) {
      store.commit('setLinkMenuTop', res.body || [])
    }
  }