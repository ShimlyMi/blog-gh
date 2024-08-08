const Router = require('koa-router')

const { addMenu } = require("../controller/menu.controller")

const router = new Router({prefix: '/menu'})

router.post('/add', addMenu)

module.exports = router
