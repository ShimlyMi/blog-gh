/*
 * @Author: MINA
 * @Date: 2023-11-19
 * @Description: 用户路由
 * @LastEditTime: 2024-01-11 10:48:12
 * @LastEditors: MINA
 */

const Router = require('koa-router')

// 导入 UserController 对象
const { userValidator, verifyUser, crpytPassword, verifyLogin, verifyUpdatePassword } = require("../middleware/user.middleware")
const { auth, isSuperAmin, needAdminAuth } = require("../middleware/auth.middleware")
const {register, login, getUserInfo, getUserInfoById, getUserList, adminUpdateUserInfo, updatePassword, updateOwnUserInfo, updateRole } = require("../controller/user.controller")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post("/register", userValidator, verifyUser, crpytPassword, register)

// 登录接口
router.post("/login", userValidator,verifyLogin, login);

// 修改密码接口
router.patch("/updatePassword", auth, isSuperAmin, verifyUpdatePassword, updatePassword)

// 用户修改个人用户信息
router.put("/updateOwnUserInfo", auth, isSuperAmin, updateOwnUserInfo)
// 管理员修改用户角色
router.put("/updateRole/:id/:role", auth, needAdminAuth, updateRole)
// 管理员修改用户信息
router.put("/adminUpdateUserInfo", auth, needAdminAuth, adminUpdateUserInfo)

// 分页获取用户列表
router.post('/getUserList', auth, getUserList)
// 获取信息
router.get('/info', auth, getUserInfo);
// 根据id获取
router.get('/getUserInfoById/:id', getUserInfoById)

module.exports = router;
