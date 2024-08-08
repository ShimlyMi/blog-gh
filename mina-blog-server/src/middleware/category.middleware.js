const { ERRORCODE, throwError } = require("../constant/err.type");
const errorCode = ERRORCODE.CATEGORY;
const { getOneCategory } = require("../service/category.service");

const verifyCategory = async (ctx, next) => {
    const { id, category_name } = ctx.request.body;
    if (!category_name) {
        console.error("分类名称不得为空");
        return ctx.app.emit("error", throwError(errorCode, "分类名称不得为空"), ctx);
    }
    let res = await getOneCategory({ category_name });
    if (res && res.id !== id) {
        console.error("分类名称已存在");
        return ctx.app.emit("error", throwError(errorCode, "分类名称已存在"), ctx);
    }
    await next();
}

const verifyDelCategories = async (ctx, next) => {
    const { categoryIdList} = ctx.request.body;
    if (!categoryIdList) {
        console.error("分类id列表不得为空");
        return ctx.app.emit("error", throwError(errorCode, "分类id列表不得为空"), ctx);
    }
    await next();
}

module.exports = {
    verifyCategory,
    verifyDelCategories
}
