/**
 * 留言的路由
 * @author: MINA
 */
const Router = require("koa-router");
const router = new Router({ prefix: "/tag" });
const { auth, needAdminAuth } = require("../middleware/auth.middleware");
const { verifyTag, verifyDelTags } = require("../middleware/tag.middleware");
const { addTag, deleteTag, getTagDictionary, getTagList, updateTag } = require("../controller/tag.controller");

// 新增标签
router.post("/add", auth, needAdminAuth, verifyTag, addTag);
// 修改标签
router.put("/update", auth, needAdminAuth, verifyTag, updateTag);
// 删除标签
router.post("/delete", auth, needAdminAuth, verifyDelTags, deleteTag);
// 条件分页获取标签
router.post("/getTagList", getTagList);
// 获取标签简略信息
router.get("/getTagDictionary", getTagDictionary);

module.exports = router;
