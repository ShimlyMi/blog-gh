/**
 * 上传路由
 * @author: MINA
 * */

const Router = require('koa-router');

const { auth } = require("../middleware/auth.middleware");
const { upload } = require("../controller/utils.controller");

const router = new Router({ prefix: "/upload" });

// 图片上传
router.post("/", auth, upload);

module.exports = router;
