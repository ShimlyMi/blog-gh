// 	使用的是 seq.define 方法
const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment");

// 创建模型 (所对应的数据表 yz_users)
const Category = seq.define('mi_category', {
        // 编写表的字段
        category_name: {
            type: DataTypes.STRING(55),
            require: true,
            unique: true,
            comment: "分类名称 唯一",
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
// CategoryEntity.sync({ force: true })
// console.log("User模型同步成功");

module.exports = Category;
