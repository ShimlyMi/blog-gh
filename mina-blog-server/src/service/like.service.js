const Like = require("../model/like/like.model");


class LikeService {
    /**
     * 点赞
     * */
    async addLike({ for_id, type, user_id }) {
        let res;
        // 只有没点赞的用户才可以点赞，前端是可以判断的
        res = await Like.create({ for_id, type, user_id })
        return !!res;
    }

    /**
     * 根据 for_id type user_id取消点赞
     * */
    async cancelLike({ for_id, type, user_id }) {
        let res = await Like.destroy({
            where: { for_id, type, user_id }
        })

        return res ? res : null
    }

    /**
     * 获取当前用户对当前 文章 说说 留言 是否点赞
     * */
    async getIsLikeByIdAndType({ for_id, type, user_id }) {
        let like = await Like.findAll({ where: { for_id, type, user_id } });
        return !!like.length;
    }
}

module.exports = new LikeService();
