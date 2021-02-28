//统一管理路由
const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

const registerRouters = () => {
  let routers = []
  glob
    .sync(resolve(__dirname, './', '**/*.js'))
    .filter((value) => value.indexOf('index.js') === -1)
    .map((router) => {
      const route = require(router)
      if (typeof route.routes === 'function') {
        routers.push(route.routes())
        routers.push(route.allowedMethods())
      }
    })
  return compose(routers)
}

module.exports = registerRouters
