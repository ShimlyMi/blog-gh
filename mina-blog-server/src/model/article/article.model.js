// 	使用的是 seq.define 方法
const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment");

// 创建模型 (所对应的数据表 yz_users)
const Article = seq.define('mi_article', {
        // 编写表的字段
        article_title: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "文章标题 不能为空",
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: "文章作者 不能为空",
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "分类ID 不能为空",
        },
        article_description: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "文章描述 不能为空",
        },
        article_content: {
            type: DataTypes.TEXT,
            comment: "文章内容",
        },
        article_cover: {
            type: DataTypes.STRING(1234),
            defaultValue: "http://localhost:8888/b4e81e8116e5aaf762af3e101.jpg",
            comment: '文章缩略图',
        },
        is_top: {
            type: DataTypes.INTEGER,
            require: true,
            defaultValue: 2,
            comment: "文章置顶 1 置顶 2 取消置顶",
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: "文章状态 1 公开 2 私密 3 草稿箱",
        },
        article_types: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: "文章类型 1 原创 2 转载 ",
        },
        origin_url: {
            type: DataTypes.STRING,
            comment: "原文链接 是转载或翻译的情况下提供",
        },
        view_times: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "文章访问次数",
        },
        thumbs_up_times: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "文章点赞次数",
        },
        reading_duration: {
            type: DataTypes.DOUBLE,
            require: false,
            defaultValue: 0,
            comment: "文章阅读时长",
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD")
            },
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue("updatedAt")).format("YYYY-MM-DD")
            },
        },

    },
    {
        freezeTableName: true, // 强制表名不转复数
        paranoid: true,
    }
)

// 强制同步数据库 表创建完之后 要注释掉
// Article.sync({ force: true })
// console.log("User模型同步成功");

module.exports = Article;
