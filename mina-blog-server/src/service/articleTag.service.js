const  Tag = require("../model/article/articleTag.model");
const { getTagByTagIdList } = require("./tag.service");

class ArticleTagService {
    /**
     * 批量增加文章标签关联
     * @param {*} article_id
     * @param {*} tag_id
     * @returns articleTag
     */
    async createArticleTags(list) {
        let res = await Tag.bulkCreate(list);
        res = res.map(v => {
            return v.dataValues;
        });
        return res.length > 0 ? res : null
    }

    /**
     * 根据文章id删除文章标签关联
     * @param {*} article_id
     * @returns 删除条数
     */
    async deleteArticleTag(article_id) {
        let res = await Tag.destroy({ where: article_id });
        // console.log("删除文章标签失败")
        return res;
    }

    /**
     * 根据文章id获取标签名称列表
     * @param {*} article_id
     */
    async getTagListByArticleId(article_id) {
        let res = await Tag.findAll({
            attributes: ["tag_id"],
            where: { article_id }
        });
        res = res.map(v => {
            return v.tag_id
        });
        const  { tagNameList, tagList } = await getTagByTagIdList(res);
        return { tagList, tagIdList: res, tagNameList}
    }

    /**
     * 根据标签id获取该标签下所有的文章id
     * @param { * } tag_id
     * @returns
     */
    async getArticleIdListByTagId(tag_id) {
        let res = await Tag.findAll({
            attributes: ["article_id"],
            where: { tag_id }
        });
        const articleIdList = new Set([]);
        res.map(v => {
            if (!articleIdList.has(v.dataValues.article_id)) {
                articleIdList.add(v.dataValues.article_id);
            }
        });
        return Array.from(articleIdList).length ? Array.from(articleIdList) : null;
    }
    /**
     * 查询满足的关联 存在就不用新增了 不存在就新增
     * @param {*} article_id
     * @param {*} tag_id
     */
    async getOneArticleTag(article_id, tag_id) {
        let res = await Tag.findOne({
            where: {
                article_id,
                tag_id,
            },
        })

        return !!res
    }
}

module.exports = new ArticleTagService();
