const Menu = require("../model/menu/menu.model")
class MenuService {
    async createMenu(menu) {
        const {menu_name, menu_type} = menu
        const res = await Menu.create({menu_name, menu_type})
        return res.dataValues
    }

    async getMenuList({id, user_name, role}) {
        const whereOpt = {}

        id && Object.assign(whereOpt, {id})
        user_name && Object.assign(whereOpt, {user_name})
        role && Object.assign(whereOpt, {role})

        if (Number(role) !== 1) {
            const res = await Menu.findOne({
                attributes: ['id', 'menu_name', 'menu_type'],
                where: whereOpt,
            })
        }
    }
}


module.exports = new MenuService()
