import user from '@/common/user'

export default async function({ store, app, $axios, redirect }) {
  const token = user.authToken(app.$cookies)
  if (token) {
    const res = await $axios.get('/user/user/getLoginUser')
    if (res.code === 1001 && res.body) {
      store.commit('updateUser', res.body)
    }
  } else {
    redirect('/')
  }
}
