const path = require('path')

// 1. 导出koa和koa-router
const Koa = require('koa')
const { koaBody } = require('koa-body')
const KoaStatic = require('koa-static')

// 2. 实例化app对象
const app = new Koa()

const cors = require('@koa/cors')

app.use(cors())

const router = require('../router')
// 5. 注册中间件
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../uploads/'),
    keepExtensions: true
  },
  parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}))

app.use(KoaStatic(path.join(__dirname, '../uploads')))
app.use(router.routes()).use(router.allowedMethods())

module.exports = app