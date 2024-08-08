
const { Op } = require("sequelize");
const Article = require("../model/article/article.model");
const { deleteArticleTag, getArticleIdListByTagId, getTagListByArticleId } = require("./articleTag.service");
const { getCategoryNameById } = require("./category.service");
const { getAuthorNameById } = require("./user.service");

class ArticleService {
    /**
     * 新增文章
     * @param {*} article
     * @returns article
     */
    async createArticle(article) {
        let res;
        try {
            // 判断当前分类是否存在，若是存在，则会有分类id
            res = await Article.create(article);
        } catch (err) {
            console.error(err);
        }
        return res ? res.dataValues : null;
    }

    /**
     * 修改文本信息
     * @param { article } article
     * @returns Boolean
     */
    async updateArticle(article) {
        let res;
        try {
            res = await Article.update(article, { where: { id: article.id } })

        } catch (err) {
            console.error(err);
        }
        return res[0] > 0;
    }
    /**
     * 修改文章置顶信息
     * @param {*} id
     * @param {*} is_top
     * @returns boolean
     */
    async updateTop(id, is_top) {
        let res = await Article.update(
            {
                is_top,
            },
            {
                where: {
                    id,
                },
            }
        );
        return res[0] > 0;
    }
    /**
     * 删除文本
     * @param {*} id 文章id
     * @param {*} status 文章状态 3 永久删除 1 2 回收站
     */
    async removeArticle(id, status) {
        let res;
        if (Number(status) !== 3) {
            res = await Article.update({ status: 3 }, { where: { id } });
        } else {
            res = await Article.destroy({ where: { id } });
            // 删除和标签的关联
            await deleteArticleTag(id);
        }
        if (Number(status) === 3) {
            res = res > 0 ;
        } else {
            res = res[0] > 0;
        }
        return res;
    }
    /**
     * 恢复文章
     * @param {*} id 文章id
     */
    async revertArticle(id) {
        let res = await Article.restore({ status: 1 },{ where: { id } });
        return res > 0;
    }

    /**
     * 公开或隐藏文章
     * @param {*} id 文章id
     * @param {*} status  文章状态
     * @returns
     */
    async toggleArticlePublic(id, status) {
        status = Number(status) === 2 ? 1 : 2;
        let res = await Article.update({ status }, { where: { id } });
        return res[0] > 0;
    }
    /**
     * 根据文章标题获取文章信息 校验是否可以新增或编辑文章
     * @param {*} article_title
     */
    async getArticleInfoByTitle({ id, article_title }) {
        let res = await Article.findOne({ attributes: ["id"],  where: { article_title } });
        if (res) {
            if (id) {
                res = res.dataValues != id;
            } else {
                res = true;
            }
        }
        return res;
    }

    /**
     * 条件分页查询文章列表
     * @param {*} param 分页参数
     * */
    async getArticleList(param) {
        const { current, size, article_title, is_top, status, tag_id, category_id, create_time, month } = param;
        const offset = (current - 1) * size;
        const limit = size * 1;
        const whereOpt = {};
        let articleIdList = [];

        article_title && Object.assign(whereOpt, { article_title: { [Op.like]: `%${article_title}%` } });
        create_time && Object.assign(whereOpt, { createdAt: { [Op.between]: create_time } });
        month && Object.assign(whereOpt, { createdAt: { [Op.like]: `%${month}` } });
        is_top && Object.assign(whereOpt, { is_top });
        status && Object.assign(whereOpt, { status });
        !status && Object.assign(whereOpt, { status: [1, 2] });
        category_id && Object.assign(whereOpt, { category_id });

        // 根据标签id查文章
        if (tag_id) {
            articleIdList = await getArticleIdListByTagId(tag_id);
            articleIdList && articleIdList.length && Object.assign(whereOpt, { id: articleIdList });
        }

        // 查询文章
        const { count, rows } = await Article.findAndCountAll({
            offset, limit, where: whereOpt,
            attributes: { exclude: ["article_content", "origin_url"] },
            order: [["createdAt", "DESC"]]
        });

        // 根据文章id获取文章各自的标签名称列表 和 分类名称
        let promiseList = [];
        promiseList = rows.map(async (v) => {
            let obj = {
                categoryName: await getCategoryNameById(v.dataValues.category_id),
                tagList: await getTadListByArticleId(v.dataValues.id)
            };
            return obj;
        });

        await Promise.all(promiseList).then((res) => {
            if (res.length) {
                rows.forEach((v, i) => {
                    v.dataValues.categoryName = res[i].categoryName;
                    v.dataValues.tagNameList = res[i].tagList.tagNameList;
                });
            }
        });
        return {
            current, size, list: rows, total: count
        };
    }

    /**
     * 根据文章id获取文章详细信息
     * @param {*} id 文章id
     * */
    async getArticleById(id) {
        let article = await Article.findByPk(id);
        if (article) {
            await article.increment("view_times", { by: 1 });
        }
        // 获取标签列表
        const { tagIdList, tagNameList } = await getTadListByArticleId(id);
        // 获取分类名称
        const categoryName = await getCategoryNameById(article.category_id);
        // 获取文章作者昵称
        const authorName = await getAuthorNameById(article.author_id);

        if (article) {
            Object.assign(article.dataValues, { tagIdList, tagNameList, categoryName, authorName });
            // console.log(tagNameList)
        }
        return article;
    }

    /**
     * 博客前台获取文章列表
     * @param {*} current 当前页
     * @param {*} size 分页大小
     * */
    async blogHomeGetArticleList(current, size) {
        const offset = (current - 1) * size;
        const limit = size * 1;
        // console.log("service", typeof(current), current, typeof(size), size)
        const { count, rows } = await Article.findAndCountAll({
            order: [['is_top', 'ASC'], ['createdAt', 'DESC']],
            attributes: { exclude: ["article_content", "origin_url"] },
            limit, offset,
            where: { status: 1 }
        });

        let promiseList = [];
        promiseList = rows.map(async (v) => {
            let obj = {
                categoryName: await getCategoryNameById(v.dataValues.category_id),
                tagList: await getTagListByArticleId(v.dataValues.id)
            };
            return obj;
        });
        await Promise.all(promiseList).then((res) => {
            if (res.length) {
                rows.forEach((v, i) => {
                    v.dataValues.categoryName = res[i].categoryName;
                    v.dataValues.tagNameList = res[i].tagList.tagNameList;
                });
            }
        });
        return {
            current, size, list: rows, total: count
        };
    }

    /**
     * 时间轴 归档
     * @param {*} current
     * @param {*} size
     * */

    async blogTimeLineGetArticleList(current, size) {
        const offset = (current - 1) * size;
        const limit = size * 1;
        const { rows, count } = await Article.findAndCountAll({
            limit, offset,
            attributes: ["id", "article_title", "article_cover", "createdAt"],
            where: { status: 1 },
            order: [["createdAt", "DESC"]]
        });
        let resultList = {};
        // 这里的对象值只能用字符串，不然对象无法根据键来判断
        rows.forEach((v) => {
            let year = "year_" + v.createdAt.substring(0, 4);
            if (resultList.hasOwnProperty(year)) {
                resultList[year].push(v);
            } else {
                resultList[year] = [];
                resultList[year].push(v);
            }
        });
        // 整合数据
        let final = Object.keys(resultList).map((key) => {
            return {
                year: key.replace("year_", ""),
                articleList: resultList[key]
            };
        });
        return {
            current, size, list: final, total: count
        }
    }
    /**
     * 月份查询
     * @param {*} current
     * @param {*} size
     * */
    async blogGetArticleListByMonth(current, size) {
        const offset = (current - 1) * size;
        const limit = size * 1;
        const { rows, count } = await Article.findAndCountAll({
            limit, offset,
            attributes: ["id", "article_title", "article_cover", "createdAt"],
            where: { status: 1 },
            order: [["createdAt", "DESC"]]
        });
        let resultList = {};
        // 这里的对象值只能用字符串，不然对象无法根据键来判断
        rows.forEach((v) => {
            let month = "month_" + v.createdAt.substring(0, 7);
            if (resultList.hasOwnProperty(month)) {
                resultList[month].push(v);
            } else {
                resultList[month] = [];
                resultList[month].push(v);
            }
        });
        // 整合数据
        let final = Object.keys(resultList).map((key) => {
            return {
                month: key.replace("month_", ""),
                articleList: resultList[key]
            };
        });
        return {
            current, size, list: final, total: count
        }
    }
    // async blogGetArticleListByMonth(param) {
    //     const { current, size,  month } = param;
    //     const offset = (current - 1) * size;
    //     const limit = size * 1;
    //     let whereOpt = {};
    //
    //     month && Object.assign(whereOpt, { createdAt: { [Op.like]: `%${month}` } });
    //
    //     const { rows, count } = await Article.findAndCountAll({
    //         limit, offset,
    //         attributes: ["id", "article_title", "article_cover", "createdAt"],
    //         where: whereOpt,
    //         order: [["createdAt", "DESC"]]
    //     });
    //     return {
    //         current, size, list: rows, total: count
    //     }
    // }

    /**
     * 通过tagId 获取文章列表
     * @param {*} current
     * @param {*} size
     * @param {*} tag_id
     * */
    async getArticleListByTagId(current, size, tag_id) {
        let tagIdList = await getArticleIdListByTagId(tag_id);
        const offset = (current - 1) * size;
        const limit = size * 1;
        const { rows, count } = await Article.findAndCountAll({
            offset, limit,
            where: {
                id: tagIdList,
                status: 1
            },
            attributes: ["id", "article_title", "article_cover", "createdAt"],
            order: [["createdAt", "DESC"]]
        });
        return {
            current, size, list: rows, total: count
        }
    }

    /**
     * 通过分类id获取文章列表
     * @param {*} current
     * @param {*} size
     * @param {*} category_id
     * */
    async getArticleListByCategoryId(current, size, category_id) {
        const offset = (current - 1) * size;
        const limit = size * 1;
        const { rows, count } = await Article.findAndCountAll({
            offset, limit,
            where: {
                category_id,
                status: 1
            },
            attributes: ["id", "article_title", "article_cover", "createdAt",],
            order: [["createdAt", "DESC"]]
        });
        let promiseList = await getCategoryNameById(category_id);
        await Promise.all(promiseList).then((res) => {
            if (res.length) {
                rows.forEach((v, i) => {
                    v.dataValues.categoryName = res[i].categoryName;
                });
            }
        });
        return {
            current, size, list: rows, total: count
        }
    }

    /**
     * 通过文章id获取推荐文章
     * @param {*} article_id
     * */
    async getRecommendArticleById(article_id) {
        // 上一篇文章id
        let contextPrevious = await Article.findOne({
            where: { id: { [Op.lt]: article_id }, status: 1 },
            attributes: ["id", "article_title", "article_cover"],
            order: [["createdAt", "DESC"]]
        });
        // 下一篇文章id
        let contentNext = await Article.findOne({
            where: { id: { [Op.gt]: article_id }, status: 1 },
            attributes: ["id", "article_title", "article_cover"],
            order: [["createdAt", "DESC"]]
        });
        // 上下文不存在就获取当前的文章id
        if (!contextPrevious) {
            contextPrevious = await Article.findOne({
                where: { id: article_id},
                attributes: ["id", "article_title", "article_cover"]
            });
        }
        if (!contentNext) {
            contentNext = await Article.findOne({
                where: { id: article_id},
                attributes: ["id", "article_title", "article_cover"]
            });
        }
        const { tagIdList } = await getTadListByArticleId(article_id);
        const articleIdList = await getArticleIdListByTagId(tagIdList);
        // 获取文章tagId在本文章中 最多六篇推荐文章
        const recommend = await Article.findAll({
            limit: 6,
            where: {
                id: articleIdList,
                status: 1
            },
            attributes: ["id", "article_title", "article_cover", "createdAt"],
            order: [["createdAt", "DESC"]]
        });
        return {
            previous: contextPrevious,
            next: contentNext,
            recommend
        };
    }

    /** 获取文章总数 */
    async getArticleCount() {
        let res = await Article.count({
            where: { status: 1 }
        });
        return res;
    }

    /**
     * 根据文章内容搜索文章
     * */
    async getArticleListByContent(content) {
        let res = await Article.findAll({
            where: {
                article_content: {
                    [Op.like]: `%${content}%`,
                },
                status: 1,
            },
            attributes: ["id", "article_title", "article_content", "view_times"],
            limit: 8,
            order: [["view_times", "DESC"]]
        });
        let result = [];
        res.length && res.forEach((r) => {
            let { id, article_content, article_title } = r.dataValues;
            let index = article_content.search(content);
            let previous = index;
            let next = index + content.length + 12;
            result.push({ id, article_content: article_content.substring(previous, next), article_title });
        });
        return result;
    }

    /**
     * 获取热门文章
     * */
    async getHotArticle() {
        let res = await Article.findAll({
            where: {
                status: 1,
            },
            attributes: ["id", "article_title", "view_times"],
            limit: 5,
            order: [["view_times", "DESC"]]
        });
        return res;
    }

    /**
     * 文章点赞
     * @param {*} id
     * */
    async articleLike(id) {
        let article = await Article.findByPk(id);
        if (article) {
            await article.increment("thumbs_up_times", { by: 1 });
        }
        return !!article;
    }

    /**
     * 取消文章点赞
     * @param {*} id
     * */
    async cancelArticleLike(id) {
        let article = await Article.findByPk(id);
        if (article) {
            await article.decrement("thumbs_up_times", { by: 1 });
        }
        return !!article;
    }

    /**
     * 文章增加阅读时长
     * @param {*} id
     * @param {*} duration
     * */
    async addReadingDuration(id, duration) {
        let article = await Article.findByPk(id);
        if (article) {
            await article.increment("reading_duration", { by: duration });
        }
        return !!article;
    }

    /**
     * 根据文章获取文章封面
     * @param {*} id
     * */
    async getArticleCoverById(id) {
        let res = await Article.findByPk(id);
        return res.article_cover;
    }
}

module.exports = new ArticleService();
