const tokenKey = 'km-user'

class User {
  updateToken(val, cookieInstance) {
    cookieInstance.set(tokenKey, val, {
      path: '/',
      maxAge: 60 * 60 * 24 * 3
    })
  }

  authToken(cookieInstance) {
    return cookieInstance.get(tokenKey) || ''
  }

  removeToken(cookieInstance) {
    cookieInstance.remove(tokenKey)
  }

  isLogin(cookieInstance) {
    return !!cookieInstance.get(tokenKey)
  }
}

export default new User()

export { tokenKey }
