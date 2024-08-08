const {DataTypes} = require("sequelize")
const seq = require("../../db/seq")
const moment = require("moment/moment")
// const Sequelize = require("sequelize")

/*module.exports = sequelize => {
    const Role = sequelize.define('mi_role',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "角色ID 唯一",
                require: true
            }, // 主键，自增
            /!** 菜单名称 *!/
            role_name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                comment: "角色名称 唯一",
                require: true
            },
            role_logotype: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "角色标识",
                require: true
            },
            role_type: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 3,
                comment: "1 为管理员 2 为普通用户 3 为游客",
                require: true
            },
            remark: {
                type: Sequelize.STRING,
                comment: "备注",
                require: true
            },
            createdAt: {
                type: Sequelize.DATE,
                get() {
                    return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss")
                },
            },
            updatedAt: {
                type: Sequelize.DATE,
                get() {
                    return moment(this.getDataValue("updatedAt")).format("YYYY-MM-DD HH:mm:ss")
                },
            },
        },
        {
            freezeTableName: true, // 强制表名不转复数
            paranoid: true,
        }
    );
    return Role
}*/

const Role = seq.define('mi_role',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "角色ID 唯一",
            require: true
        },
        role_name: {
            type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                comment: "角色名称 唯一",
                require: true
        },
        role_logotype: {
            type: DataTypes.STRING,
                allowNull: false,
                comment: "角色标识",
                require: true
        },
        role_type: {
            type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 3,
                comment: "1 为管理员 2 为普通用户 3 为游客",
                require: true
        },
        remark: {
            type: DataTypes.STRING,
                comment: "备注",
                require: true
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
);

// 强制同步数据库 表创建完之后 要注释掉
// Role.sync({force: true})
// console.log("User模型同步成功");

// module.exports = Role
