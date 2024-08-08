const Router = require('koa-router');

const {
    addPhotos,
    getPhotosByAlbumId,
    deletePicture,
    revertPicture,
    getAllPicByAlbumId,
    deleteOnePic
} = require("../controller/photo.controller")
const {auth, needAdminPermission} = require("../middleware/auth.middleware")

const router = new Router({prefix: "/photo"})

/** 批量新增图片 判断是否有id来新增 并且需要传入相册id记录相册 */
router.post("/add", auth, needAdminPermission, addPhotos)

/** 批量删除图片 */
router.put("/delete", auth, needAdminPermission, deletePicture)

/** 批量恢复图片 */
router.put("/revert", auth, needAdminPermission, revertPicture)

/** 根据相册id 分页获取图片 */
router.post("/getPicListByAlbumId", getPhotosByAlbumId)

/** 获取所有相册图片 */
router.get("/getAllPictures/:id", getAllPicByAlbumId)

module.exports = router
