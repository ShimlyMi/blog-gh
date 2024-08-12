/** @Desctiption 获取一些 统计信息 */
const { getArticleCount } = require("../service/article.service");
const { getTalkCount } = require("../service/talk.service");
const { getUserCount } = require("../service/user.service");
const { getTagCount } = require("../service/tag.service");
const { getCategoryCount } = require("../service/category.service");

const { result, ERRORCODE, throwError } = require("../constant/err.type");
const errorCode = ERRORCODE.STATISTIC;

class StatisticController {
    async homeStatistic(ctx) {
        try {
            let articleCount = await getArticleCount();
            let talkCount = await getTalkCount();
            let userCount = await getUserCount();
            let tagCount = await getTagCount();
            let categoryCount = await getCategoryCount();
            ctx.body = result("获取数据统计成功", {
                articleCount,
                talkCount,
                userCount,
                tagCount,
                categoryCount
            });
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "获取数据统计失败"), ctx);
        }
    }
}

module.exports = new StatisticController();
