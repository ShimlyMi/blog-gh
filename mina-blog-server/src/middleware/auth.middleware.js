const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { ERRORCODE, throwError, result } = require("../constant/err.type")
const errorCode = ERRORCODE.AUTH; // 用户权限不足
const tokenErrorCode = ERRORCODE.TOKEN; // 用户登录过期
const auth = async(ctx, next) => {
    /** 将 authorization 从 headers里面 去解构出来 */
    const { authorization = '' } = ctx.request.header;
    /** 拿到 token 并去掉 token前面的 “Bearer ” */
    const token = authorization ? authorization.replace("Bearer ", "") : undefined;
    // console.log("token",ctx);
    if (!authorization) {
        console.error("您没有权限访问，请先登录");
        return ctx.app.emit("error", throwError(tokenErrorCode, "您没有权限访问，请先登录"), ctx);
    }
    try {
        /** user 包含了 payload 的信息(id,user_name,role,nick_name) */
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user;
        // console.log("token-user",user)
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit('error', throwError(tokenErrorCode, "token已过期"), ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', throwError(tokenErrorCode, "无效的token"), ctx)
        }
    }
    // console.log("校验用户失败")
    await next();
};

/** 管理员权限 */
const needAdminPermission = async (ctx, next) => {
    const { role, user_name } = ctx.state.user;
    if (Number(role) !== 1) {
        console.error("普通用户仅限查看哦~", ctx.state.user);
        return ctx.app.emit('error', throwError(errorCode, "普通用户仅限查看哦"), ctx);
    }
    if (user_name == 'admin') {
        console.error("admin是配置的用户，没有用户信息，建议注册账号再发布博客内容");
        return ctx.app.emit("error", throwError(errorCode, "admin是配置的用户，没有用户信息，建议注册账号再发布博客内容"), ctx);
    }
    await next();
}



// 对需要管理员权限的进行操作进行提示
const needAdminAuth = async (ctx, next) => {
    const { role, username } = ctx.state.user;
    if (Number(role) !== 1) {
        console.error("普通用户仅限查看");
        return ctx.app.emit("error", throwError(errorCode, "普通用户仅限查看"), ctx);
    }
    await next();
}

/** 超级管理员 */
const isSuperAmin = async (ctx, next) => {
    const { user_name } = ctx.state.user
    if (user_name === 'admin') {
        console.error("管理员信息可通过配置修改")
        return ctx.app.emit('error', throwError(errorCode, "管理员信息只可通过配置信息修改"), ctx)
    }
    await next
}

module.exports = {
    auth,
    needAdminPermission,
    needAdminAuth,
    isSuperAmin
}
