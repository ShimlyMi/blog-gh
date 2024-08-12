const User = require("../model/user/user.model")
const { randomNickname } = require("../utils/tools");
const bcrypt = require("bcryptjs"); // 密码加盐加密
const { Op } = require("sequelize")


class UserService {
    /**
     * 用户注册
     *
     */
    async createUser(user) {
        // 键值对的名字一样时可以简写，即 只写一个
        // await 返回的是成功的值
        // 注意postman 发送请求 必须选择 JSON
        let { user_name, password, nick_name } = user;
        // 过滤敏感词
        // nick_name = await filterSensitive(nick_name);
        nick_name = nick_name ? nick_name : randomNickname("星星");
        const avatar = "http://localhost:8848/src/assets/avatar.jpg";
        const res = await User.create({user_name, password, nick_name, avatar});
        // console.log(res);
        return res.dataValues
    };

    /**
     *  用户自己修改用户信息
     * @param {*} id
     * @param {*} user
     * @returns
     * */
    async updateOwnUserInfo(id, user) {
        let { avatar, nick_name } = user
        // nick_name = await filterSensitive(nick_name)
        const res = await User.update({ avatar, nick_name }, { where: {id} })
        return res[0] > 0

    }
    /**
     * 修改用户密码
     * @param {*} id
     * @param {*} password
     * */
    async updatePassword(id, password) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const res = await User.update({ password: hash }, { where: { id } })
        return res[0] > 0;
    }

    /**
     * 修改用户角色
     * @param {*} id
     * @param {*} role
     */
    async updateRole(id,role) {
        const res = await User.update({ role: role }, { where: { id } })
        return res[0] > 0;
    }

    /**
     * 修改用户ip地址
     * @param {*} id
     * @param {*} ip
     */
    async updateIp(id, ip) {
        const res = await User.update( { ip,}, { where: {id}});
        return res[0] > 0;
    }

   /**
    * 根据条件查询一个用户
    * @param { id, user_name, role }
    * @return User
    * */
    async getOneUserInfo({id, user_name, password, role, nick_name, avatar}) {
        const whereOpt = {};
        /*
         * 判断 id user_name password id_admin 是否存在
         * assign 是拷贝
         */
        id && Object.assign(whereOpt, {id});
        user_name && Object.assign(whereOpt, {user_name});
        password && Object.assign(whereOpt, {password});
        nick_name && Object.assign(whereOpt, {nick_name});
        avatar && Object.assign(whereOpt, {avatar})
        role && Object.assign(whereOpt, { role })
        // console.log(whereOpt)

        // 查询数据记录
        const res = await User.findOne({
            // attributes: { exclude: ["createdAt", "updatedAt"] },
            attributes: ['id', 'user_name', 'password', 'role', 'nick_name', 'avatar'],
            where: whereOpt
        });
        return res ? res.dataValues : null;
    }
    /** 分页查询用户列表 */
    async getUserList({ current, size, nick_name, role }) {
        // 分页
        const offset = (current -1) * size
        const limit = size * 1

        // 条件
        const whereOpt = {}

        if (typeof  role === "number") {
            role && Object.assign(whereOpt, { role: {[Op.eq]: role} })
        }
        nick_name && Object.assign(whereOpt, { nick_name: { [Op.like]: `%${nick_name}%` } })
        const { count, rows } = await User.findAndCountAll(
            { offset, limit, attributes: { exclude: ["password"] }, where: whereOpt })
        return { current, size, total: count, list: rows }
    }

    /**
     * 根据id获取用户昵称
     * @param {*} id
     * */
    async getAuthorNameById(id) {
        let res = await User.findByPk(id)
        return res ? res.dataValues.nick_name : null
    }

    /** 获取用户总数 */
    async getUserCount() {
        return await User.count()
    }

    /** 管理元修改用户信息 */
    async adminUpdateUserInfo({ id, nick_name, avatar }){
        let res = await User.update({ nick_name, avatar }, { where: {id} })
        return res[0] > 0
    }
}

module.exports = new UserService()
