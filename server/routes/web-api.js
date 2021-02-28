const KoaRouter = require('koa-router')
const md5 = require('md5')
const $axios = require('../koa-axios')
const axios = require('../koa-axios')
const { isWap } = require('../utils')

const router = new KoaRouter()

router.prefix('/web-api')

/**
 * QQ回调域名下
 * 第三方登录回调path
 */
router.get('/third', async (ctx) => {
  let { state, code } = ctx.query
  if (state && code) {
    // 这里把域名更新进去，防止获取到的token是错误的
    ctx.request.header.host = state
    axios.headerUpdate(ctx.request.header)
    const response = await axios.get('/user/qqConfig/return', {
      params: {
        state,
        code
      }
    })
    if (response.status === 200 && response.data) {
      let isMobileShow = 1
      // 这里单独再拿一次isMobileShow，保证准确性
      try {
        const siteres = await axios.get('/site/systemStyle/getSiteBydomain')
        if (siteres.data.body.mobile === 0) {
          isMobileShow = 0
        }
      } catch(e) {}
      const res = response.data
      if (res.code === 1001 && res.body) {
        if (res.body.type === 1) {
          if (isWap(ctx.request.headers['user-agent']) && isMobileShow == 1) {
            state = `${state}/wap`
          }
          // 没有账号，去绑定
          if (res.body.qqOpenid) {
            // QQ
            const url = `//${state}/thirdRegister?openid=${
              res.body.qqOpenid
            }&tk=${res.body.qqAccessToken}&auth=${md5(
              `km${res.body.qqOpenid}${res.body.qqAccessToken}`
            )}`
            return ctx.redirect(url)
          } else if (res.body.wxOpenid) {
            // WX
          }
        } else if (res.body.type === 2) {
          // 已有账号，直接跳转登录
          return ctx.redirect(
            `//${state}/web-api/third-login?token=${res.body.token}`
          )
        }
      }
    }
  }
  ctx.status = 404
})

/**
 * 正常域名下
 * 跳转Path，主要用于写入Cookie
 */
router.get('/third-login', async (ctx) => {
  if (ctx.query.token) {
    ctx.cookies.set('km-user', ctx.query.token, {
      httpOnly: false
    })
    const isMobileShow = ctx.cookies.get('isMobileShow')
    if (isWap(ctx.request.headers['user-agent']) && isMobileShow == 1) {
      return ctx.redirect('/wap/user')
    } else {
      // return ctx.redirect('/main')
      return ctx.redirect('/category-list')
    }
  }
  ctx.status = 404
})

/**
 * 正常域名下
 * 包装第三方注册的api
 */
router.post('/third-register', async (ctx) => {
  const query = { ...ctx.request.query }
  const { openid, tk, auth, login, parentID } = query
  if (openid && tk && auth) {
    if (md5(`km${openid}${tk}`) === auth) {
      const params = {
        qqAccessToken: tk,
        qqOpenid: openid,
        login,
        userName: login,
        password: '123123',
        parentID
      }
      axios.headerUpdate(ctx.request.header)
      const response = await axios.post('/user/user/register', null, {
        params
      })
      if (response.status === 200) {
        if (response.data && response.data.code === 1001) {
          ctx.cookies.set('km-user', response.headers['x-auth-token'], {
            httpOnly: false
          })
        }
        return (ctx.body = response.data)
      }
    }
  }
  ctx.status = 203
})

/**
 * 正常域名下
 * 包装第三方绑定的api
 */
router.post('/third-bind', async (ctx) => {
  const query = { ...ctx.request.query }
  const { openid, tk, auth, login, password } = query
  if (openid && tk && auth) {
    if (md5(`km${openid}${tk}`) === auth) {
      axios.headerUpdate(ctx.request.header)
      const response = await axios.post('/login/login/login', null, {
        params: { login, password }
      })
      if (response.status === 200) {
        if (response.data && response.data.code === 1001) {
          const bindResponse = await axios.post('/user/oauth/bind', null, {
            params: { qqAccessToken: tk, qqOpenid: openid },
            headers: {
              'x-auth-token': response.headers['x-auth-token']
            }
          })
          if (bindResponse.status === 200 && bindResponse.data) {
            ctx.cookies.set('km-user', response.headers['x-auth-token'], {
              httpOnly: false
            })
          }
          return (ctx.body = bindResponse.data)
        } else {
          return (ctx.body = response.data)
        }
      }
    }
  }
  ctx.status = 203
})

module.exports = router
