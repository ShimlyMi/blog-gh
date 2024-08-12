
const { createMenu } = require("../service/menu.service")

class MenuController {
    async addMenu(ctx) {
        try {
            const res = await createMenu(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '添加菜单成功',
                result: {
                    menu_name: res.menu_name
                }
            };
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new MenuController()
