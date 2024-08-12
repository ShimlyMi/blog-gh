/**
 * 留言的路由
 * @author: MINA
 */
const Router = require("koa-router");
const router = new Router({ prefix: "/like" });
const { addLike, cancelLike, getIsLikeByIdAndType } = require("../controller/like.controller")

// 点赞
router.post("/addLike", addLike);
// 取消点赞
router.post("/cancelLike", cancelLike);
// 获取当前用户对当前文章/说说/留言 是否点赞
router.post("/getIsLikeByIdAndType", getIsLikeByIdAndType);

module.exports = router


