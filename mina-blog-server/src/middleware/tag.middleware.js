const { ERRORCODE, throwError } = require("../constant/err.type");
const errorCode = ERRORCODE.TAG;
const { getOneTag } = require("../service/tag.service");

const verifyTag = async (ctx, next) => {
    const { id, tag_name } = ctx.request.body;
    if (!tag_name) {
        console.error("标签名称不得为空");
        return ctx.app.emit("error", throwError(errorCode, "标签名称不得为空"), ctx);
    }
    let res = await getOneTag({ tag_name });
    if (res && res.id !== id) {
        console.error("标签名称已存在");
        return ctx.app.emit("error", throwError(errorCode, "标签名称已存在"), ctx);
    }
    await next();
}

const verifyDelTags = async (ctx, next) => {
    const { tagIdList} = ctx.request.body;
    if (!tagIdList) {
        console.error("标签id不得为空");
        return ctx.app.emit("error", throwError(errorCode, "标签id不得为空"), ctx);
    }
    await next();
}

module.exports = {
    verifyTag,
    verifyDelTags
}
