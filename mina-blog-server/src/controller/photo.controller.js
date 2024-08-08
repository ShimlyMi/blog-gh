
const {
    addPic,
    getPicByAlbumId,
    deletePic,
    revertPic,
    deletePicByAlbumId,
    getAllPicByAlbumId,
    deleteOnePic
} = require("../service/photo.service")
const { ERRORCODE, throwError, result } = require("../constant/err.type")
const errorCode = ERRORCODE.USER

class PhotoController {
    /** 批量添加图片 */
    async addPhotos(ctx) {
        try {
            let {photoList} = ctx.request.body
            const res = await addPic(photoList)
            ctx.body = result("批量新增图片成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "批量新增图片失败"), ctx)
        }
    }

    /** 批量删除图片 */
    async deletePicture(ctx) {
        const { imgList, status } = ctx.request.body
        try {
            let idList = imgList.map(v => v.id)
            const res = await deletePic(idList, status)
            ctx.body = result("批量删除图片成功", res)

        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', throwError(errorCode, "批量删除图片失败"), ctx)
        }
    }

    /** 批量恢复图片 */
    async revertPicture(ctx) {
        try {
            const {idList} = ctx.request.body
            let res = await revertPic(idList)
            ctx.body = result("批量恢复图片成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', throwError(errorCode, "批量恢复图片失败"), ctx)
        }
    }

    /** 根据 相册id 分页获取 图片列表 */
    async getPhotosByAlbumId(ctx) {
        try {
            /*const { pageNum = 1, pageSize = 10,id } = ctx.request.query;
            let res = await getPicByAlbumId({ pageNum,pageSize,id})*/
            // console.log("iiii")
            const res = await getPicByAlbumId(ctx.request.body)
            ctx.body = result("分页获取图片成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', throwError(errorCode, "分页获取图片失败"), ctx)
        }
    }

    /** 获取相册所有图片 */
    async getAllPicByAlbumId(ctx) {
        try {
            const res = await getAllPicByAlbumId(ctx.params.id)
            ctx.body = result("获取图片成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', throwError(errorCode, "获取图片失败"), ctx)
        }
    }
}

module.exports = new PhotoController()
