/**
 * @description: 文章控制器
 * @Author: MINA
 * @Date: 2024-06-07
 *
 * */
const seq = require("../db/seq");
const { deleteArticleTag } = require("../service/articleTag.service");
const {
    createArticle,
    getArticleCoverById,
    updateArticle,
    updateTop,
    removeArticle,
    revertArticle,
    toggleArticlePublic,
    getArticleInfoByTitle,
    getArticleById,
    getArticleList,
    getArticleListByCategoryId,
    getArticleListByContent,
    getArticleListByTagId,
    getHotArticle,
    getRecommendArticleById,
    addReadingDuration,
    blogHomeGetArticleList,
    blogTimeLineGetArticleList,
    articleLike,
    cancelArticleLike,
    blogGetArticleListByMonth
} = require("../service/article.service");
const { createCategoryOrReturn, createArticleTagByArticleId } = require("./common.controller");
const { result, ERRORCODE, throwError } = require("../constant/err.type");
const errorCode = ERRORCODE.ARTICLE;
// const { UPLOADTYPE } = require("../config/config.default");
const { deleteOnlineImgs } = require("../controller/utils.controller");

class ArticleController {
    /**
     * 新增文章
     * */
    async createArticle(ctx) {
        // 创建事务 方便回滚
        const t = await seq.transaction();
        try {
            const { tagList, category, ...articleRest } = ctx.request.body.article;
            // 若分类不存在 就先创建分类
            const { id, category_name } = category;
            articleRest.category_id = await createCategoryOrReturn(id, category_name);
            let newArticle, newArticleTagList;
            // 创建文章
            newArticle = await createArticle(articleRest);
            // tag和标签进行关联
            newArticleTagList = await createArticleTagByArticleId(newArticle.id, tagList);
            ctx.body = result("新增文章成功", {
                article: newArticle,
                articleTagList: newArticleTagList
            });
            await t.commit();
        } catch (err) {
            await t.rollback();
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "新增文章失败"), ctx);
        }
    }
    /**
     * 根据id修改文章
     * */
    async updateArticle(ctx) {
        const t =  await seq.transaction();
        try {
            const { tagList, category, ...articleRest } = ctx.request.body.article;
            let oldCover = await getArticleCoverById(articleRest.id);
            if (oldCover && oldCover != articleRest.article_cover) {
                await deleteOnlineImgs([oldCover.split("/").pop()]);
            }
            // 先删除这个文章与标签之前的关联
            // console.log("删除关联标签失败")
            // await deleteArticleTag(articleRest.id);
            articleRest.category_id = await createCategoryOrReturn(category.id, category.category_name);
            let newArticleTagList = await createArticleTagByArticleId(articleRest.id, tagList);

            let res = updateArticle(articleRest);

            ctx.body = result("修改文章成功", {
                res, newArticleTagList
            });

            t.commit();
        } catch (err) {
            await t.rollback();
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "修改文章失败"), ctx);
        }
    }

    /**
     * 修改文章置顶状态
     * */
    async updateTop(ctx) {
        try {
            const { id, is_top } = ctx.params;
            let res = await updateTop(id, is_top);
            ctx.body = result("修改文章置顶状态成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "修改文章置顶状态失败"),ctx);
        }
    }

    /***
     * 删除文章  3状态下直接删除 其他状态回退
     * @memberof ArticleController
     */
    async deleteArticle(ctx) {
        try {
            const { id, status } = ctx.params;
            if (Number(status) === 3) {
                let oldCover = await getArticleCoverById(id);
                oldCover && await deleteOnlineImgs([oldCover.split("/").pop()]);
                let res = await removeArticle(id, status);
                ctx.body = result("删除文章成功", res);
            }
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "删除文章失败"), ctx);
        }
    }
    /** 恢复文章 */
    async revertArticle(ctx) {
        try {
            const { id } = ctx.params;
            let res = await revertArticle(id);
            ctx.body = result("恢复文章成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "恢复文章失败"), ctx);
        }
    }

    /** 公开或隐藏文章 */
    async toggleArticlePublic(ctx) {
        try {
            const { id, status } = ctx.params;
            let res = await toggleArticlePublic(id, status);
            let message = Number(status) === 1 ? "隐藏文章" : "公开文章";
            ctx.body = result(message + "成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, message + "失败"), ctx);
        }
    }

    /** 条件分页获取文章 */
    async getArticleList(ctx) {
        try {
            let res = await getArticleList(ctx.request.body);
            ctx.body = result("查询文章成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "查询文章失败"), ctx);
        }
    }

    /** 根据标题获取文章是否已经存在 */
    async getArticleInfoByTitle(ctx) {
        try {
            const { id, article_title } = ctx.request.body;
            let res = await getArticleInfoByTitle({ id, article_title });
            ctx.body = result("文章查询结果", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "根据标题查询文章失败"), ctx);
        }
    }
    /** 根据id获取文章信息 */
    async getArticleById(ctx) {
        try {
            const { id } = ctx.params;
            let res = await getArticleById(id);
            ctx.body = result("查询文章详情成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "查询文章详情失败"), ctx);
        }
    }
    /** 前台获取文章列表 */
    async blogHomeGetArticleList(ctx) {
        try {
            const { current, size } = ctx.params;
            console.log("home")
            let res = await blogHomeGetArticleList(current, size);
            ctx.body = result("获取文章列表成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "获取文章列表失败"), ctx);
        }
    }
    /** 前台归档列表 */
    async blogTimeLineGetArticleList(ctx) {
        try {
            const { current, size } = ctx.params;
            console.log("timeline", current,size)
            let res = await blogTimeLineGetArticleList(current, size);
            // console.log("timeline", res)
            ctx.body = result("获取文章时间轴列表成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "获取文章时间轴列表失败"), ctx);
        }
    }
    async blogGetArticleListByMonth(ctx) {
        try {
            const { current, size } = ctx.params;
            console.log("timeline", current,size)
            let res = await blogGetArticleListByMonth(current, size);
            // console.log("timeline", res)
            ctx.body = result("通过月份查询文章成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "通过月份查询文章失败"), ctx);
        }
    }
    // async blogGetArticleListByMonth(ctx) {
    //     try {
    //         // const { current, size } = ctx.params;
    //         // console.log("timeline", current,size)
    //         let res = await blogGetArticleListByMonth(ctx.request.body);
    //         // console.log("timeline", res)
    //         ctx.body = result("通过月份查询文章成功", res);
    //     } catch (err) {
    //         console.error(err);
    //         return ctx.app.emit("error", throwError(errorCode, "通过月份查询文章失败"), ctx);
    //     }
    // }
    /** 根据标签获取该标签下的所有文章的简略信息 */
    async getArticleListByTagId(ctx) {
        try {
            const { id, current, size } = ctx.request.body;
            if (!id) {
                return ctx.app.emit("error", throwError(errorCode, "标签id不得为空"), ctx);
            }
            let res = await getArticleListByTagId(current, size, id);
            ctx.body = result("根据标签获取文章列表成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "根据标签获取文章列表失败"), ctx);
        }
    }
    /** 根据分类获取该分类下的所有文章的简略信息 */
    async getArticleListByCategoryId(ctx) {
        try {
            const { id, current, size } = ctx.request.body;
            if (!id) {
                return ctx.app.emit("error", throwError(errorCode, "分类id不得为空"), ctx);
            }
            let res = await getArticleListByCategoryId(current, size, id);
            ctx.body = result("根据分类获取文章列表成功", res)
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "根据分类获取文章列表失败"), ctx);
        }
    }
    /** 根据文章获取上下一篇文章 和 推荐文章 */
    async getRecommendArticleById(ctx) {
        try {
            const { id } = ctx.params;
            if (!id) {
                return ctx.app.emit("error", throwError(errorCode, "文章id不得为空"), ctx);
            }
            let res = await getRecommendArticleById(id);
            ctx.body = result("获取推荐文章成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "获取推荐文章失败"), ctx);
        }
    }
    /** 全局搜索文章 */
    async getArticleListByContent(ctx) {
        try {
            const { content } = ctx.params;
            let res = await getArticleListByContent(content);
            ctx.body = result("搜索文章成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "搜索文章失败"), ctx);
        }
    }
    /** 获取热门文章 */
    async getHotArticle(ctx) {
        try {
            let res = await getHotArticle();
            ctx.body = result("获取热门文章成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "获取热门文章失败"), ctx);
        }
    }
    /** 文章点赞 */
    async articleLike(ctx) {
        try {
            const { id } = ctx.params;
            let res = await articleLike(id);
            ctx.body = result("点赞文章成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "点赞文章失败"), ctx);
        }
    }
    /** 取消点赞 */
    async cancelArticleLike(ctx) {
        try {
            const { id } = ctx.params;
            let res = await cancelArticleLike(id);
            ctx.body = result("取消点赞文章成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "取消点赞文章失败"), ctx);
        }
    }
    /** 文章增加阅读时长 */
    async addReadingDuration(ctx) {
        try {
            const { id, duration } = ctx.params;
            let res = await addReadingDuration(id, duration);
            ctx.body = result("增加阅读时长成功", res);
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "增加阅读时长失败"), ctx);
        }
    }
}

module.exports = new ArticleController();
