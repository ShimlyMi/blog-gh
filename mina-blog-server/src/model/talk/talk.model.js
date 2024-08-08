// 	使用的是 seq.define 方法
const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment");

// 创建模型 (所对应的数据表 yz_users)
const Talk = seq.define('mi_talk', {
        // 编写表的字段
        content: {
            type: DataTypes.STRING(255),
            require: true,
            comment: "说说内容"
        },
        user_id: {
            type: DataTypes.INTEGER,
            require: true,
            comment: "发布说说的用户id"
        },
        status: {
            type: DataTypes.INTEGER,
            require: true,
            defaultValue: 1,
            comment: "说说状态 1 公开 2 私密 3 回收站",
        },
        is_top: {
            type: DataTypes.INTEGER,
            require: true,
            defaultValue: 2,
            comment: "是否置顶 1 置顶 2 不置顶"
        },
        like_times: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "点赞次数"
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
        freezeTableName: true, // 强制表名不转复数
        paranoid: true,
    }
)

// 强制同步数据库 表创建完之后 要注释掉
// Talk.sync({ force: true })
// console.log("User模型同步成功");

module.exports = Talk;
