// 	使用的是 seq.define 方法
const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment/moment");

const Comment = seq.define("mi_comment",
    {
        parent_id: {
            type: DataTypes.INTEGER,
            require: false,
            comment: "评论的父级id"
        },
        type: {
            type: DataTypes.INTEGER,
            require: false,
            comment: "评论类型 1 文章 2 说说 3 留言 ..."
        },
        for_id: {
            type: DataTypes.INTEGER,
            require: false,
            comment: "评论的对象id 例如文章id 说说id 留言id"
        },
        from_id: {
            type: DataTypes.INTEGER,
            require: false,
            comment: "评论人的id"
        },
        from_name: {
            type: DataTypes.STRING, // STRING 默认 255
            require: false,
            comment: "评论人的名字"
        },
        from_avatar: {
            type: DataTypes.STRING(555), // STRING 默认 255
            require: false,
            comment: "评论人的头像"
        },
        to_id: {
            type: DataTypes.INTEGER,
            require: false,
            comment: "被回复的人的id"
        },
        to_name: {
            type: DataTypes.STRING, // STRING 默认 255
            require: false,
            comment: "被回复的人的名字"
        },
        to_avatar: {
            type: DataTypes.STRING(555), // STRING 默认 255
            require: false,
            comment: "被回复的人的头像"
        },
        content: {
            type: DataTypes.STRING(555),
            require: true,
            comment: "评论内容"
        },
        thumbs_up: {
            type: DataTypes.INTEGER,
            require: false,
            defaultValue: 0,
            comment: "评论点赞数"
        },
        // ip: {
        //     type: DataTypes.STRING,
        //     require: false,
        //     comment: "ip地址"
        // },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss")
            },
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue("updatedAt")).format("YYYY-MM-DD HH:mm:ss")
            },
        },
    },
    {
        freezeTableName: true
    }
);

// Comment.sync({ alter: true });

module.exports = Comment;
