// 	使用的是 seq.define 方法
const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment/moment");
const Notify = seq.define(
    "mi_notify",
    {
        message: {
            type: DataTypes.STRING(555),
            required: true,
            comment: "通知内容"
        },
        user_id: {
            type: DataTypes.INTEGER,
            required: true,
            comment: "通知给谁"
        },
        type: {
            type: DataTypes.INTEGER,
            required: true,
            comment: "通知类型 1 文章 2 说说 3 留言 4 友链"
        },
        isView: {
            type: DataTypes.INTEGER,
            required: true,
            defaultValue: 1,
            comment: "是否被查看 1 没有 2 已经查看"
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss");
            },
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue("updatedAt")).format("YYYY-MM-DD HH:mm:ss");
            },
        }
    },
    {
        freezeTableName: true, // 强制表名不转复数
    }
)

// Notify.sync({ alter: true })

module.exports = Notify
