import user from '@/common/user'

export default function({ app, redirect }) {
  if (user.isLogin(app.$cookies)) {
    redirect('/wap/user')
  }
}
