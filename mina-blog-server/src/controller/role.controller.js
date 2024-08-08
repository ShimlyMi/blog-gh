const {roleCreateError} = require("../constant/err.type")
const {createRole} = require("../service/role.service")

class RoleController {
    async create(ctx) {
        try {
            const res = await createRole(ctx.request.body)
            ctx.body = {
                code: 0,
                message: "创建角色成功",
                result: {
                    role_name: res.role_name,
                }
            }

        } catch (err) {
            console.log(err)
            return ctx.app.emit('error', roleCreateError, ctx)
        }
    }
}

module.exports = new RoleController()
