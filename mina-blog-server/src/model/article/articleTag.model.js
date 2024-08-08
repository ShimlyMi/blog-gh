const { DataTypes } = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")

const ArticleTag =  seq.define('mi_article_tag', {
    article_id: {
        type: DataTypes.INTEGER,
        require: true,
        comment: "文章id",
    },
    tag_id: {
        type: DataTypes.INTEGER,
        require: true,
        comment: "标签id",
    },
},
    {
        freezeTableName: true, // 强制表名不转复数
        paranoid: true,
    }
)
// ArticleTag.sync({ alter: true }) // 同步数据库表
module.exports = ArticleTag;
