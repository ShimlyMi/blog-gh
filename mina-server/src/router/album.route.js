const Router = require('koa-router');

const {addAlbum, getAlbumList, deleteAlbum, getAllAlbum, updateAlbum} = require("../controller/album.controller")
const {auth, needAdminPermission} = require("../middleware/auth.middleware")
const router = new Router({prefix: "/album"})

/** 新增相册 */
router.post("/add", auth, needAdminPermission, addAlbum)

/** 删除相册 */
router.delete("/delete/:id", auth, needAdminPermission, deleteAlbum)

/** 分页获取相册列表 */
router.post("/getAlbumList", getAlbumList)

/** 获取所有相册列表 */
router.get('/getAllAlbumList', getAllAlbum)

/** 修改相册 */
router.put("/update", auth, needAdminPermission, updateAlbum)


module.exports = router
