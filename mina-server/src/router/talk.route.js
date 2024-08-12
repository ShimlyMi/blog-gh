/**
 * @Description: 说说路由
 * @author: MINA
 * @Date: 2024-03-04 15:13:30
 */
const Router = require('koa-router');

const { auth, needAdminPermission } = require("../middleware/auth.middleware")
const { createTalk, updateTalk, deleteTalk, getTalkList, revertTalk, getTalkById,
    toggleTop, togglePublic, talkLike, cancelTalkLike, blogGetTalkList
} = require("../controller/talk.controller")

const router = new Router({ prefix: '/talk' });

// 发布说说
router.post("/publishTalk", auth, needAdminPermission, createTalk)
// 修改说说
router.put("/updateTalk", auth, needAdminPermission, updateTalk)
// 删除说说
router.delete("/delete/:id/:status", auth, needAdminPermission, deleteTalk)
// 切换说说 公开/私密 状态 1 公开 2 私密
router.put("/togglePublic/:id/:status", auth, needAdminPermission, togglePublic)
// 切换说说 置顶/不置顶 状态 1 置顶 2 不置顶
router.put("/toggleTop/:id/:is_top", auth, needAdminPermission, toggleTop)
// 恢复说说
router.put("/revertTalk/:id", auth, needAdminPermission, revertTalk)
// 分页获取说说
router.post("/getTalkList", getTalkList)
// 获取说说详情
router.get("/getTalkById/:id", getTalkById)
// 说说点赞
router.put("/like/:id", talkLike)
// 取消点赞
router.put("/cancelLike/:id", cancelTalkLike)
// 前台获取说说
router.post("/blogGetTalkList", blogGetTalkList)

module.exports = router;
