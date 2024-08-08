const ERRORCODE = {
    USER: '10001', // 用户错误码 -> 用户已存在、密码不一致....
    AUTH: '10002', // 用户权限不足码 -> 没有管理员权限
    TOKEN: '10003', // 用户登录过期、 无效token
    FILE: '10004', // 文件格式
    UPLOAD: '10005', // 上传
    CONFIG: '10006', // 网站设置详情
    STATISTIC: "100008", // 网站统计信息
    ARTICLE: '10009', // 文章 -> 文章参数格式错误、发布文章失败、修改文章失败...
    ALBUM: '100010', // 相册
    CATEGORY: '10011', // 分类
    PHOTO: '10012', // 图片 -> 上传图片失败
    TALK: '10013', // 说说
    COMMENT: '10014', // 评论
    MESSAGE: '10015', // 留言板
    NOTIFY: '10016', // 消息推送
    LIKE: '10017', // 点赞
    TAG: '10018', // 标签
    TIPS: '11111', // 提示

}

/**
 * 公共返回结果方法
 * @param {*} message 提示信息
 * @param {*} result 结果
 * @returns
 */
function result(message, result) {
    return { code: 0, message, result }
}

/**
 * 公共返回提示方法
 * @param {*} message 提示信息
 * @param {*} result 结果
 * @returns
 */
function tipsResult(message) {
    return { code: 0, message }
}

/**
 * 公共抛出错误方法
 * @param {*} code 错误码
 * @param {*} message 错误信息
 * @returns
 */
function throwError(code, message) {
    return { code, message }
}

module.exports = {
    ERRORCODE,
    result,
    throwError,
    tipsResult
}
