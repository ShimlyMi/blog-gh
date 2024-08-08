const {addAlbum, getAlbumList, getAllAlbumList, deleteAlbum, updateAlbum, getOneAlbum} = require("../service/album.service")
const {result, throwError, ERRORCODE} = require("../constant/err.type")
const errorCode =  ERRORCODE.ALBUM

class AlbumController {
    /** 新增相册 */
    async addAlbum(ctx) {
        try {
            const {album_name} = ctx.request.body
            let res = await addAlbum(ctx.request.body)
            // console.log(res)
            ctx.body = result("新增相册成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "新增相册失败"), ctx)

        }
    }

    /** 根据id删除相册
     *
     * */
    async deleteAlbum(ctx) {
        try {
            const { id } = ctx.params
            let res = await deleteAlbum(id)
            ctx.body = result("删除相册成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "删除相册失败"), ctx)
        }
    }

    /** 分页获取相册列表 */
    async getAlbumList(ctx) {
        try {
            // 解析 pageNum pageSize
            const { current, size, album_name } = ctx.request.body;
            let res = await getAlbumList({ current, size, album_name })
            ctx.body = result("分页查询成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "分页查询失败"), ctx)
        }
    }

    /** 获取所有相册列表 */
    async getAllAlbum(ctx) {
        try {
            const res = await getAllAlbumList()
            ctx.body = result("获取相册列表成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "获取相册列表失败"), ctx)
        }
    }

    /** 编辑相册 */
    async updateAlbum(ctx) {
        try {
            const { id, album_name } = ctx.request.body
            let one = await getOneAlbum({ album_name });
            if (one && one.id != id) {
                return ctx.app.emit("error", throwError(errorCode, "该相册名称已经被使用了，换一个试试~"), ctx)
            }
            const res = updateAlbum(ctx.request.body);
            ctx.body = result("修改相册成功", res)
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "修改相册失败"), ctx)
        }
    }
}

module.exports = new AlbumController()
