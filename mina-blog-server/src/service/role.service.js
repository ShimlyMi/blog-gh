const Role = require("../model/role/role.model")

class RoleService {
    async createRole(role) {
        // const [role,created] = await Role.findOrCreate({
        //     where: { role_name: 'admin' },
        //     defaults: {
        //         role_name: "admin",
        //         role_logotype: "超级管理员",
        //         role_type: 1,
        //         remark: "超级管理员"
        //     }
        // })
        // if (created) {
        //     console.log(role.role_name)
        // }
        const {role_name, role_logotype, role_type} = role
        let res = await Role.create({role_name, role_logotype, role_type: 2})
        return res.dataValues
    }

    /** 通过 角色 名字 查询  */
    async getRoleByName({id, role_name}) {
        const whereOpt = {};

        /** 判断是否存在 并进行拷贝 */
        id && Object.assign(whereOpt, {id})
        role_name && Object.assign(whereOpt, {role_name})

        // 查询记录
        const res = await Role.findOne({
            attributes: ['id', 'role_name'],
            where: whereOpt
        })
        return res ? res.dataValues : null;
    }
}

module.exports = new RoleService()
