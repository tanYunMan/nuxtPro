import user from '@/common/user'

export default function({ app, redirect }) {
  if (user.isLogin(app.$cookies)) {
    // user.removeToken(app.$cookies)
    redirect('/main')
  }
}
