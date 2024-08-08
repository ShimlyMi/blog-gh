const Comment = require("../model/comment/comment.model");
const { Op } = require("sequelize");
const { getOneUserInfo } = require("./user.service");
const { getIsLikeByIdAndType } = require("./like.service");

/**
 * 评论服务层
 * */
class CommentService {
    /**
     *  新增评论
     * @param {*} comment
     * */
    async createComment(comment) {
        const { type, for_id, from_id, from_name, from_avatar, content } = comment;
        const res = await Comment.create({ type, for_id, from_id, from_name, from_avatar, content })
        return res.dataValues;
    }

    /**
     * 回复评论
     * @param {*} comment
     * */

    async replyComment(comment) {
        const { parent_id, type, for_id, from_id, from_avatar, from_name, to_id, to_name, to_avatar, content } = comment
        const res = await Comment.create({
            parent_id, type, for_id, from_id, from_avatar, from_name, to_id, to_name, to_avatar, content
        })
        return res.dataValues;
    }

    /**
     * 点赞评论
     * @param { id }
     * */
    async thumbUpComment(id) {
        let comment = await Comment.findByPk(id);
        if (comment) {
            await comment.increment("thumb_up", { by: 1 });
        }
        return !!comment
    }

    /**
     * 取消点赞评论
     * @param { id }
     * */
    async cancelThumbUp(id) {
        let comment = await Comment.findByPk(id);
        if (comment) {
            await comment.decrement("thumb_up", { by: 1 });
        }
        return !!comment;
    }

    /** 删除评论 */
    async deleteComment(id, parent_id) {
        let res;
        if (parent_id > 0) {
            res = await Comment.destroy({ where: { id } });
        } else {
            res = await Comment.destroy({ where: { id } });
            await Comment.destroy({ where: { parent_id: id } });
        }

        return res ? res : null;
    }

    /**
     * 后台分页获取评论列表
     * @param current
     * @param size
     * @param {*} content
     * @param {*} from_name
     * @param {*} to_name
     * @param {*} time
     * @returns
     * */
    async backGetCommentList({ current, size, content, to_name, time, from_name }){
        const whereOp = {};
        const offset = (current - 1) * size;
        const limit = size * 1;

        content && Object.assign(whereOp, { content: { [Op.like]: `%${content}%` } });
        to_name && Object.assign(whereOp, { name: { [Op.like]: `%${to_name}%` } });
        from_name && Object.assign(whereOp, { name: { [Op.like]: `%${from_name}%` } });
        time && Object.assign(whereOp, { createdAt: { [Op.between]: time } });

        const { count, rows } = await Comment.findAndCountAll({
            offset, limit, where: whereOp, order: [["createdAt", "DESC"]]
        });

        const fromIdPromiseList = rows.map(async (row) => {
            let res;
            if (row.from_id) {
                res = await getOneUserInfo({ id: row.from_id })
            }
            return res;
        });
        await Promise.all(fromIdPromiseList).then((result) => {
            result.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.from_avatar = r.avatar;
                    rows[index].dataValues.from_name = r.nick_name;
                }
            });
        });

        const toIdPromiseList = rows.map(async (row) => {
            let res;
            if (row.to_id) {
                res = await getOneUserInfo({ id: row.to_id })
            }
            return res;
        });
        await Promise.all(toIdPromiseList).then((result) => {
            result.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.to_avatar = r.avatar;
                    rows[index].dataValues.to_name = r.nick_name;
                }
            });
        });

        return {
            current: current,
            size: size,
            total: count,
            list: rows
        };
    }

    /**
     * 前台分页获取父级评论
     * @param {*} type
     * @param {*} id
     * */
    async frontGetParentComment({ current, size, type, for_id, user_id, order }) {
        const whereOpt = {};
        const offset = (current - 1) * size;
        const limit = size * 1;
        type && Object.assign(whereOpt, { type });
        for_id && Object.assign(whereOpt, { for_id });
        Object.assign(whereOpt, { parent_id: null });

        const orderArr = order == "new" ? ["createdAt", "DESC"] : ["thumbs_up", "DESC"]
        const { count, rows } = await Comment.findAndCountAll({
            offset, limit, where: whereOpt, order: [orderArr]
        });

        const promiseList = rows.map(async (row) => {
            let res;
            // console.log("row.dataValues",row.dataValues)
            if (row.dataValues.from_id) {
                res = await getOneUserInfo({ id: row.from_id });
            }
            return res;
        });
        await Promise.all(promiseList).then((result) => {
            result.forEach((r) => {
                if (r) {
                    let index = rows.findIndex((row) =>  row.from_id == r.id)
                    if (index != -1) {
                        rows[index].dataValues.from_avatar = r.avatar;
                        rows[index].dataValues.from_name = r.nick_name;
                    }
                }
            })
        });

        if (user_id) {
            const promiseLikeList = rows.map((row) => {
                return getIsLikeByIdAndType({ for_id: row.id, type: 4, user_id });
            });
            await Promise.all(promiseLikeList).then((result) => {
                result.forEach((r, index) => {
                    rows[index].dataValues.is_like = r;
                });
            });
        }
        return {
            current: current,
            size: size,
            total: count,
            list: rows
        };
    }
    /**
     * 前台分页获取子评论
     * @param {*} parent_id 根据 parent_id 来查询
     * @param {*} type 说说还是评论 talk/article
     * @param {*} id 说说/评论id
     * */
    async frontGetChildrenComment({ current, size, type, for_id, user_id, parent_id }) {
        const whereOpt = {}
        const offset = (current - 1) * size
        const limit = size * 1
        Object.assign(whereOpt, { type });
        Object.assign(whereOpt, { for_id });
        Object.assign(whereOpt, { parent_id: parent_id });
        const { count, rows } = await Comment.findAndCountAll({
            offset, limit, where: whereOpt, order: [["createdAt", "ASC"]]
        });

        /** 根据用户 from_id 获取用户当前的昵称和头像 */
        const fromIdPromiseList = rows.map(async (row) => {
            let res;
            if (row.dataValues.from_id) {
                res = await getOneUserInfo({ id: row.from_id });
            }
            return res;
        });
        await Promise.all(fromIdPromiseList).then((result) => {
            result.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.from_avatar = r.avatar
                    rows[index].dataValues.from_name = r.nick_name
                }
            })
        })

        /** 根据用户 to_id 获取用户当前的昵称和头像 */
        const toIdPromiseList = rows.map(async (row) => {
            let res;
            if (row.dataValues.to_id) {
                res = await getOneUserInfo({ id: row.to_id });
            }
            return res;
        });
        await Promise.all(toIdPromiseList).then((result) => {
            result.forEach((r,index) => {
                if (r) {
                    rows[index].dataValues.to_avatar = r.avatar
                    rows[index].dataValues.to_name = r.nick_name
                }
            })
        });

        /** 判断当前登录用户是否点赞了 */
        if (user_id) {
            const promiseLikeList = rows.map((row) => {
                return getIsLikeByIdAndType({ for_id: row.id, type: 4, user_id });
            });
            await Promise.all(promiseLikeList).then((result) => {
                result.forEach((r, index) => {
                    rows[index].dataValues.is_like = r;
                })
            })
        }

        return {
            current: current,
            size: size,
            total: count,
            list: rows
        }
    }

    /** 根据 评论类型 和 类型对应的id 获得 评论总数 */
    async getCommentTotal({ for_id, type }) {
        const res = await Comment.count({ where: { for_id, type } })
        return res
    }

}

module.exports = new CommentService();
