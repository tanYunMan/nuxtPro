export default async function({ store, $axios, redirect, route }) {
  if (Object.keys(store.state.systemStyle) === 0) {
    const res = await $axios.get('/site/systemStyle/getSiteBydomain')
    //console.log(444,res)
    if (res.code === 1001) {
      store.commit('updateSystemStyle', res.body || {})
    }
  }
  const { frontStyle } = store.state.systemStyle
  const name = route.name
  if(frontStyle===3){
    //console.log('傻逼',name)
    if (/themes|themes1|index/.test(name)) redirect('/themes1')
  }
  if (frontStyle === 2) {
    if (/themes|index/.test(name)) redirect('/themes')
  }
  if (frontStyle === 1)  {
    if (/themes|index/.test(name)) redirect('/')
  }
  if (frontStyle === "")  {
    if (/themes|index/.test(name)) redirect('/')
  }
}
