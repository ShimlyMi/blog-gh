const { result, ERRORCODE, throwError } = require("../constant/err.type");
const errorCode = ERRORCODE.TAG;
const { createTag, updateTag, deleteTags, getTagList, getTagDictionary } = require("../service/tag.service");

/**
 * 标签控制层
 * */
class TagController {
    /** 新增标签 */
    async addTag(ctx) {
        try {
            let res = createTag(ctx.request.body);
            ctx.body = result("新增标签成功", {
                id: res.id,
                tag_name: res.tag_name
            });
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "新增标签失败"), ctx);
        }
    }

    /** 修改标签 */
    async updateTag(ctx) {
        try {
            let res = updateTag(ctx.request.body);
            ctx.body = result("修改标签成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "修改标签失败"), ctx);
        }
    }

    /** 删除标签 */
    async deleteTag(ctx) {
        try {
            const { tagIdList } = ctx.request.body;
            let res = await deleteTags(tagIdList);
            ctx.body = result("删除标签成功", {
                updateNun: res
            });
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "删除标签失败"), ctx);
        }
    }

    /** 分页查询标签 */
    async getTagList(ctx) {
        try {
            const { current, size, tag_name } = ctx.request.body;
            let res = await getTagList({ current, size, tag_name });
            ctx.body = result("分页查询标签成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "分页查询标签失败"), ctx);
        }
    }

    /** 添加标签字典 */
    async getTagDictionary(ctx) {
        try {
            let res = await getTagDictionary();
            ctx.body = result("获取标签字典成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "获取标签字典失败"), ctx);
        }
    }
}

module.exports = new TagController();
