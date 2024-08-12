const Talk = require("../model/talk/talk.model")
const { getIsLikeByIdAndType } = require("./like.service");
const { publishTalkPhoto, deleteTalkPhoto, getPhotoByTalkId } = require("./talkPhoto.service")
const { getOneUserInfo } = require("./user.service");
const {Op} = require("sequelize");
/**
 * 说说服务层
 * */

class TalkService {
    /**
     * 新增说说
     * @param {*} talk
     * */
    async publishTalk(talk) {
        const { talkImgList, ...resTalk } = talk;
        const res = await Talk.create(resTalk);
        if (res.dataValues.id) {
            let imgList = talkImgList.map((img) => {
                return {
                    talk_id: res.dataValues.id,
                    url: img.url
                }
            });
            await publishTalkPhoto(imgList);
        }
        return res ? res.dataValues : null;
    }

    /**
     * 修改说说
     * @param {*} talk
     * */
    async updateTalk(talk) {
        const { id, talkImgList, ...resTalk } = talk;
        const res = await Talk.update({ ...resTalk }, { where: { id } });
        // 先删除图片关联
        await deleteTalkPhoto(id);
        let imgList = talkImgList.map((img) => {
            return {
                talk_id: id,
                url: img.url
            }
        });
        // 添加图片
        await publishTalkPhoto(imgList);

        return res[0] > 0;
    }

    /**
     * 删除说说
     * @param id
     * @param status 说说状态 3 永久删除 1 2 回收站
     * */
    async deleteTalkById(id, status) {
        let res;
        if (Number(status) !== 3) {
            res = await Talk.update({ status: 3 }, { where: { id } });
        } else {
            res = await Talk.destroy({ where: { id } });
            await deleteTalkPhoto(id);
        }
        if (Number(status) === 3) {
            res = res > 0 ;
        } else {
            res = res[0] > 0;
        }
        return res;
    }
    /**
     * 恢复说说
     * @param {*} id 说说id
     * */
    async revertTalk(id) {
        const res = await Talk.update({ status: 1 }, { where: { id } });
        return res > 0;
    }

    /**
     * 切换说说 公开性
     * @param id
     * @param status
     * */
    async toggleTalkPublic(id, status){
        status = Number(status) === 2 ? 1 : 2;
        let res = await Talk.update({ status }, { where: { id } });
        return res[0] > 0;
    }


    /**
     * 置顶/取消置顶
     * @param {*} id
     * @param {*} is_top
     * @returns boolean
     * */
    async toggleTop(id, is_top) {
        const res = await Talk.update({ is_top }, { where: { id } });
        return res[0] > 0;
    }


    /**
     条件分页查询文章列表
     * @param {*} param 分页参数
     */
    async getTalkList(param) {
        const { current, size, is_top, status, content, like_times, create_time } = param;
        const offset = (current - 1) * size;
        const limit = size * 1;
        const whereOpt = {};
        content && Object.assign(whereOpt, { content: { [Op.like]: `%${content}%`} });
        status && Object.assign(whereOpt, { status });
        like_times && Object.assign(whereOpt, { like_times });
        create_time && Object.assign(whereOpt, { createdAt: { [Op.between]: create_time } });
        is_top && Object.assign(whereOpt, { is_top });
        !status && Object.assign(whereOpt, { status: [1, 2] });
        const { rows, count } = await  Talk.findAndCountAll({
            limit,
            offset,
            where: whereOpt,
            order: [["createdAt", "DESC"]]
        })
        let promiseList = [];
        promiseList = rows.map(async (v) => {
            return await getPhotoByTalkId(v.id)
        })
        await Promise.all(promiseList).then((res) => {
            res.forEach((v) => {
                if (v.length) {
                    let index = rows.findIndex((r) => r.dataValues.id === v[0].talk_id)
                    if (index !== -1) {
                        rows[index].dataValues.talkImgList = v.map((v) => v.url)
                    }
                }
            })
        })
        let userList = rows.map(async (row) => {
            return getOneUserInfo({id: row.user_id});
        })
        await Promise.all(userList).then((res) => {
            res.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.nick_name = r.nick_name
                    rows[index].dataValues.avatar = r.avatar
                }
            })
        })

        return { current, size, list: rows, total: count }
    }

    /**
     * 根据id获取说谁详情
     * @param {*} id 文章id
     * */
    async getTalkById(id) {
        let res = await Talk.findByPk(id)
        let images = await getPhotoByTalkId(id)
        return {
            ...res.dataValues,
            talkImgList: images.length ? images.map((v) => v.url) : []
        }
    }
    /** 获取说说总数 */
    async getTalkCount() {
        let res = await Talk.count({
            where: { status: 1 }
        });
        return res;
    }

    /**
     * 前台获取说说列表
     * */
    async blogGetTalkList(current, size, user_id) {
        const offset = (current - 1) * size
        const limit = size * 1
        // console.log(offset, limit)
        const { rows, count } = await Talk.findAndCountAll({
            limit, offset,
            where: { status: 1 }
        })
        let promiseList =  rows.map(async (v) => {
            return await getPhotoByTalkId(v.id)
        })
        await Promise.all(promiseList).then((res) => {
            res.forEach((v) => {
                if (v.length) {
                    let index = rows.findIndex((r) => r.dataValues.id === v[0].talk_id)
                    if (index !== -1) {
                        rows[index].dataValues.talkImgList = v.map((v) => v.url)
                    }
                }
            })
        })
        let userList = rows.map(async (row) => {
            return getOneUserInfo({id: row.user_id});
        })
        await Promise.all(userList).then((res) => {
            res.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.nick_name = r.nick_name
                    rows[index].dataValues.avatar = r.avatar
                }
            })
        })

        // 判断当前登录用户是否点赞了
        if (user_id) {
            const promiseLikeList = rows.map((row) => {
                return getIsLikeByIdAndType({ for_id: row.id, type: 2, user_id });
            });
            await Promise.all(promiseLikeList).then((result) => {
                result.forEach((r, index) => {
                    rows[index].dataValues.is_like = r;
                });
            });
        }

        return { current, size, list: rows, total: count }
    }

    /**
     * 说说点赞
     * @param {*} id
     * */
    async talkLike(id) {
        let talk = await Talk.findByPk(id)
        if (talk) {
            await talk.increment("like_times", { by: 1 })
        }
        return !!talk
    }

    /**
     * 取消说说点赞
     * @param {*} id
     */
    async cancelTalkLike(id) {
        let talk = await Talk.findByPk(id);
        if (talk) {
            await talk.decrement("like_times", { by: 1 });
        }

        return !!talk;
    }
}

module.exports = new TalkService()
