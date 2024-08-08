/**
 * 留言的路由
 * @author: MINA
 */
const Router = require("koa-router");
const router = new Router({ prefix: "/category" });
const { auth, needAdminPermission } = require("../middleware/auth.middleware");
const { verifyCategory, verifyDelCategories } = require("../middleware/category.middleware");
const { addCategory, deleteCategories, getCategoryDictionary, getCategoryList, updateCategory } = require("../controller/category.controller");

// 新增分类
router.post("/add", auth, needAdminPermission, verifyCategory, addCategory);
// 修改分类
router.put("/update", auth, needAdminPermission, verifyCategory, updateCategory);
// 删除分类
router.post("/delete", auth, needAdminPermission, verifyDelCategories, deleteCategories);
// 条件分页获取分类
router.post("/getCategoryList", getCategoryList);
// 获取分类简略信息
router.get("/getCategoryDictionary", getCategoryDictionary);

module.exports = router;
