const KoaRouter = require('koa-router')
const koaBody = require('koa-body')

const router = new KoaRouter()

/**
 * 支付完成
 */
router.post('/paySuccess', koaBody(), async (ctx) => {
  const { amount } = ctx.request.body
  if (amount) {
    return ctx.redirect(`/paySuccess?money=${amount}`)
  }
  ctx.status = 404
})

module.exports = router
