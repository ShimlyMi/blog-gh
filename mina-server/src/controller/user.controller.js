const path = require("path");
// 导入 JWT
const jwt = require('jsonwebtoken');

const { JWT_SECRET, ADMIN_PASSWORD } = require("../config/config.default")

const {
    createUser,
    getOneUserInfo,
    updatePassword,
    updateRole,
    updateIp,
    getUserList,
    updateOwnUserInfo,
    adminUpdateUserInfo,
    getAuthorNameById,
    getUserCount
} = require("../service/user.service")
const { decryptToken } = require("../service/auth.service")
const { deleteOnlineImgs } = require("../controller/utils.controller")
const { getIpAddress } = require("../utils/tools")

const { ERRORCODE, throwError, result } = require("../constant/err.type")
const errorCode = ERRORCODE.USER


class UserController {
    /** 注册函数 */
    async register(ctx) {
            // 1. 获取数据
            // console.log(ctx.request.body);
            // const { user_name, password } = ctx.request.body
            // 2. 操作数据库
            console.log(123)
            try {
                const res = await createUser(ctx.request.body);
                // 3. 返回数据
                ctx.body = result("用户注册成功", { id: res.id, user_name: res.user_name, nick_name: res.nick_name })
            } catch (err) {
                console.log(err);
                ctx.app.emit("error", throwError(errorCode, "用户注册失败"), ctx);
            }


        }
        /** 登录函数 */
    async login(ctx) {
        const { user_name, password } = ctx.request.body;
        // 1. 获取用户信息(在 token 的 payload 中 记录 id, user_name, role, nick_name)
        // console.log("ctx", ctx.request.body);
        try {
            if (user_name == 'admin') {
                if (password == ADMIN_PASSWORD) {
                    ctx.body = result("超级管理员登录成功", {
                        token: jwt.sign({ nick_name: '超级管理员', id: 1, role: 1, user_name: 'admin' }, JWT_SECRET, { expiresIn: "1d" }),
                        user_name: "超级管理员",
                        role: 1,
                        id: 1
                    })
                } else {
                    return ctx.app.emit("error", throwError(errorCode, "密码错误"), ctx)
                }
            } else {
                // 从返回的对象中剔除password属性，将剩下的属性放到res对象
                const { password, ...res } = await getOneUserInfo({ user_name });
                // console.log("getUser-res", res)
                // 保存用户ip地址
                let ip = ctx.get("X-Real-IP") || ctx.get("X-Forwarded-For") || ctx.ip;
                await updateIp(res.id, ip.split(":").pop());
                const ipAddress = getIpAddress(ip.split(":").pop());
                ctx.body = result("用户登录成功", {
                    /* 调用 jwt.sign() 方法生成 JWT 字符串
                     * 第一个参数：用户信息对象
                     * 第二个参数：加密的密钥
                     * 第三个参数：配置对象，配置token有效期
                     * */
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                    user_name: res.user_name,
                    role: res.role,
                    id: res.id,
                    nick_name: res.nick_name,
                    ipAddress
                })
            }

        } catch (err) {
            console.error("用户登录失败", err);
            return ctx.app.emit("error", throwError(errorCode, "用户登陆失败"), ctx)
        }
    }

    /** 修改密码 */
    async updatePassword(ctx) {
        try {
            /** 获取数据 */
            const { id } = ctx.stale.user;
            const { password1 } = ctx.request.body;

            /** 操作数据库 */
            if (id == 4) {
                return ctx.app.emit("error~", throwError(errorCode, "测试用户密码不可以修改哦~"), ctx)
            }
            const res = await updatePassword(id, password1)
            ctx.body = result("修改密码成功", res)
        } catch (err) {
            console.error(err);
            return ctx.app.emit('error', throwError(errorCode, "修改用户密码失败"), ctx)
        }
    }

    /** 用户修改自己的用户信息 */
    async updateOwnUserInfo(ctx) {
        try {
            const { id } = ctx.state.user;
            const { avatar } = ctx.request.body;
            let one = await getOneUserInfo({ id });

            if (one.avatar && avatar != one.avatar) {
                await deleteOnlineImgs([one.avatar.split("/").pop()]);
            }
            const res = await updateOwnUserInfo(id, ctx.result.body)
            ctx.body = result("修改用户成功", res)

        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "修改用户失败"), ctx)
        }
    }

    /**
     * 管理员根据id修改用户信息
     * @param {*} ctx
     * */
    async adminUpdateUserInfo(ctx) {
        try {
            let res = await adminUpdateUserInfo(ctx.request.body)
            ctx.body = result("修改用户信息成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "修改用户信息失败"), ctx)
        }
    }

    /** 修改用户角色 */
    async updateRole(ctx) {
        try {
            const { id, role } = ctx.params
            const res = await updateRole(id, role)
            ctx.body = result("修改角色成功", res)
        } catch (err) {
            console.error(err);
            return ctx.app.emit('error', throwError(errorCode, "修改角色失败"), ctx)
        }
    }

    /** 获取个人信息 */
    async getUserInfo(ctx) {
        try {
            /** 将 authorization 从 headers里面 去解构出来 */
            const { authorization = '' } = ctx.request.header;
            // console.log("userInfo",ctx)
            /** 拿到 token 并去掉 token前面的 “Bearer ” */
            const token = authorization.replace("Bearer ", "");
            let res = await decryptToken(token);
            // console.log("userInfo",res.id)
            // console.log("userInfo",res)
            ctx.body = result("获取个人信息成功", {
                id: res.id,
                nick_name: res.nick_name,
                avatar: res.avatar
            })

        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "获取个人信息失败"), ctx)
        }
    }

    /** 通过id获取个人信息 */
    async getUserInfoById(ctx) {
        try {
            if (ctx.params.id) {
                if (ctx.params.id == 1) {
                    ctx.body = result("此账号为超级管理员", {
                        nick_name: "超级管理员",
                        role: 1
                    })
                } else {
                    let res = await getOneUserInfo({ id: ctx.params.id })
                        // console.log(ctx.params.id)
                    const { password, user_name, ip, ...resInfo } = res;
                    // console.log("resInfo",resInfo)
                    // resInfo.ipAddress = getIpAddress(ip);
                    ctx.body = result("获取用户信息成功", resInfo)
                }
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "获取信息失败"), ctx)
        }
    }

    /** 分页获取用户信息 */
    async getUserList(ctx) {
        try {
            const { current, size, nick_name, role } = ctx.request.body
            const res = await getUserList({ current, size, nick_name, role })
            ctx.body = result("获取用户列表成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "获取用户列表失败"), ctx)
        }
    }

}


module.exports = new UserController();