/**
 * 留言的路由
 * @author: MINA
 */
const Router = require("koa-router");
const router = new Router({ prefix: "/article" });
const {
    createArticle,
    getArticleCoverById,
    updateArticle,
    updateTop,
    deleteArticle,
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
} = require("../controller/article.controller");
const { auth, needAdminPermission } = require("../middleware/auth.middleware");
const {
    validatorArticle,
    createTitleExist,
    updateTitleExist,
    validatorTopParam,
    verifyDelParam
} = require("../middleware/article.middleware");

/** 后台 start */
// 创建文章
router.post("/add", auth, needAdminPermission, validatorArticle, createTitleExist, createArticle);
// 修改文章
router.put("/update", auth, needAdminPermission, validatorArticle, updateArticle);
// 修改文章标题
router.put("/updateTitle", auth, needAdminPermission, validatorArticle, updateTitleExist, updateArticle)
// 修改文章置顶状态
router.put("/updateTop/:id/:is_top", auth, needAdminPermission, validatorTopParam, updateTop);
// 删除文章
router.delete("/delete/:id/:status", auth, needAdminPermission, verifyDelParam, deleteArticle);
// 恢复文章
router.put("/revert/:id", auth, needAdminPermission, revertArticle);
// 切换文章私密性
router.post("/isPublic/:id/:status", auth, needAdminPermission, verifyDelParam, toggleArticlePublic);
// 根据文章标题判断文章是否被注册过
router.post("/titleExist", getArticleInfoByTitle);
//分页获取文章
router.post("/getArticleList", auth, getArticleList);
/** 后台 end */

/** 前台 start */
// 分页获取文章 按照置顶和发布时间倒序排序
router.get("/blogHomeGetArticleList/:current/:size", blogHomeGetArticleList);
// 分页获取文章归档
router.get("/blogTimeLineGetArticleList/:current/:size", blogTimeLineGetArticleList);
router.get("/blogGetArticleListByMonth/:current/:size", blogGetArticleListByMonth);
// router.post("/blogGetArticleListByMonth/", blogGetArticleListByMonth);
// 分页获取该 分类 下的文章简略信息
router.post("/getArticleListByCategoryId", getArticleListByCategoryId);
// 分页获取该 标签 下的文章简略信息
router.post("/getArticleListByTagId", getArticleListByTagId);
// 分页获取上下一篇文章 和 推荐文章
router.get("/getRecommendArticleById/:id", getRecommendArticleById);
// 全局搜索
router.get("/getArticleListByContent/:content", getArticleListByContent);
// 获取热门文章
router.get("/getHotArticle", getHotArticle);
// 文章点赞
router.get("/like/:id", articleLike);
// 取消文章点赞
router.put("/cancelLike/:id", cancelArticleLike);
// 增加文章阅读时长
router.put("/addReadingDuration/:id/:duration", addReadingDuration);
/** 前台 end */

/** 公共 start */
// 根据id获取文章详情
router.get("/getArticleById/:id", getArticleById);
/** 公共 end */

module.exports = router;
