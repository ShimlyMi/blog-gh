/**
 * 留言的路由
 * @author: MINA
 */
const Router = require("koa-router");
const router = new Router({ prefix: "/comment" });

const { auth, needAdminPermission } = require("../middleware/auth.middleware");
const {
    addComment, replyComment, deleteComment, thumbUpComment, cancelThumbUp, backGetCommentList, frontGetChildrenComment, frontGetParentComment, getCommentTotal
} = require("../controller/comment.controller");

// 新增评论
router.post("/add", addComment);
// 回复评论
router.post("/reply", replyComment);
// 点赞评论
router.put("/thumbUp/:id", thumbUpComment);
// 取消点赞评论
router.put("/cancelThumbUp/:id", cancelThumbUp);
// 前台删除评论
router.delete("/delete/:id/:parent_id", auth, deleteComment);
// 后台删除评论
router.delete("/backDelete/:id/:parent_id", auth, needAdminPermission, deleteComment);
// 后台条件分页获取评论
router.post("/backGetCommentList", backGetCommentList);
// 前台分页获取父级评论
router.post("/frontGetParentComment", frontGetParentComment);
// 前台分页获取子级评论
router.post("/frontGetChildrenComment", frontGetChildrenComment);
// 获取关于当前的评论总数 子评论 + 父级评论
router.post("/backGetCommentList", backGetCommentList);
// 获取评论总条数
router.post("/getCommentTotal", getCommentTotal);
module.exports = router
