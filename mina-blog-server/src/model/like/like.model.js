// 	使用的是 seq.define 方法
const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment/moment");

const Like = seq.define("mi_like", {
        type: {
            type: DataTypes.INTEGER,
            require: true,
            comment: "点赞类型 1 文章 2 说说 3 留言 4 评论"
        },
        for_id: {
            type: DataTypes.INTEGER, // STRING 默认 255
            require: true,
            comment: "点赞的id 文章id 说说id 留言id"
        },
        user_id: {
            type: DataTypes.INTEGER,
            require: true,
            comment: "点赞用户id"
        },
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

// Like.sync({ alter: true });

module.exports = Like;
