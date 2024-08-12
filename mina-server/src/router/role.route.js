const Router = require("koa-router")

const {create} = require("../controller/role.controller")
const {roleValidator} = require("../middleware/role.middleware")
// const { createRole } = require("../service/role.service")

const router = new Router({prefix: '/role'})

router.post("/create", roleValidator, create)

module.exports = router
