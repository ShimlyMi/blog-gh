const {getRoleByName} = require("../service/role.service")

const {roleAlreadyExited, roleCreateError} = require("../constant/err.type")

// 验证角色名称 唯一
const roleValidator = async (ctx, next) => {
    console.log("role_name")
    const {role_name} = ctx.request.body
    try {
        const res = await getRoleByName({role_name})
        if (res) {
            console.log("当前角色已存在", ctx.request.body);
            ctx.app.emit('error', roleAlreadyExited, ctx)
            return;
        }
    } catch (err) {
        console.error("获取角色信息错误", ctx.request.body)
        ctx.app.emit("error", roleCreateError, ctx)
        return;
    }
    await next()
}

module.exports = {
    roleValidator
}
