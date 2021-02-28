export default async function({ $axios, store }) {
  const res = await $axios.get('/user/user/needTransactionPassword')
  if (res.code === 1001) {
    store.commit('updateHasTradePwd', res.body)
  }
}
