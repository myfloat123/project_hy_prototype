// 3. 实例化router对象
const Router = require('koa-router')

const { lead } = require('../controller/lead.controller')

const router = new Router({ prefix: '/api' })

// 4. 编写路由规则
router.post('/import', lead)

module.exports = router