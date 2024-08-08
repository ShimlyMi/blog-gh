const Message = require("../model/message/message.model");
const { getOneUserInfo } = require("./user.service");
const { getIsLikeByIdAndType } = require("./like.service");
const {Op} = require("sequelize");

class MessageService {
    /** 新增留言 */
    async addMessage({ content, user_id, nick_name, avatar }) {
        const res = await Message.create({ content, user_id, nick_name, avatar});
        return !!res;
    }

    /**
     * 点赞留言
     * @param id
     * */
    async likeMessage(id) {
        let message = await Message.findByPk(id);
        if (message) {
            await message.increment("like_times", {by: 1})
        }
        return !!message
    }

    /**
     * 分页获取留言
     * */
    async getMessageList({ current, size, content }) {
        const offset = (current - 1) * size;
        const limit = size * 1;
        const whereOpt = {};
        content && Object.assign(whereOpt, {message: {[Op.like]: `%${content}%`}});
        // time && Object.assign(whereOpt, {createdAt: {[Op.between]: time}});
        const { rows, count } = await Message.findAndCountAll({
            limit, offset, where: whereOpt, order: [["createdAt", "DESC"]]
        });
        // 根据用户form_id获取用户当前的昵称和头像
        const promiseList = rows.map(async (row) => {
            let res;
            if (row.user_id && row.user_id !== 0) {
                res = await getOneUserInfo({ id: row.user_id });
                return res;
            } else {
                return {
                    nick_name: row.nick_name,
                    avatar: "",
                };
            }
        });

        await Promise.all(promiseList).then((result) => {
            result.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.nick_name = r.nick_name;
                    rows[index].dataValues.avatar = r.avatar;
                }
            });
        });
        return {
            current, size, list: rows, total: count
        }
    }
}
module.exports = new MessageService();
