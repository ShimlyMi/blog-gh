const Photo = require("../model/photo/photo.model")

class PhotoService {
    /**
     * 批量添加图片
     * @returns
     * */
    async addPic(photoList) {
        /** sequelize v6 批量创建 */
        let res = await Photo.bulkCreate(photoList)
        return res
    }

    /**
     * 批量删除图片
     * @param { * } idList
     * */
    async deletePic(idList, status) {
        let res
        if (Number(status) == 1) {
            res = await Photo.update({status: 2}, {where: {id: idList}})
        } else {
            res = await Photo.destroy({where: {id: idList}})
        }
        return res
    }


    /** 根据 相册 id 删除图片 */
    async deletePicByAlbumId(album_id) {
        let res = await Photo.destroy({where: album_id})
        return res
    }

    /** 批量恢复图片 */
    async revertPic(idList) {
        let res = await Photo.update({status: 1}, {where: {id: idList}})
        return res
    }

    /** 分页获取图片列表 */
    async getPicByAlbumId({current, size, id, status}) {
        const offset = (current - 1) * size
        const limit = size * 1
        let { count, rows } = await Photo.findAndCountAll({ offset, limit, where: {album_id: id, status } })
        return {
            current,
            size,
            list: rows,
            total: count
        }
    }

    /** 根据 相册id 升序查询所有图片 */
    async getAllPicByAlbumId(album_id) {
        let res = await Photo.findAll(
            {
                where: {album_id, status: 1},
                order: [['createAt', 'DESC']]
            })
        return res
    }
}

module.exports = new PhotoService()
