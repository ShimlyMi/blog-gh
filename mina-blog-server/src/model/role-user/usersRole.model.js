// const {DataTypes} = require("sequelize")
// const seq = require("../../db/seq")
// const moment = require("moment/moment")
// const Role = require("../role/role.model")
// const User = require("../user/user.model")
//
// const UsersRole = seq.define('yz_users_role',
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         users_id: {type: DataTypes.INTEGER},
//         role_id: {type: DataTypes.INTEGER},
//         createdAt: {
//             type: DataTypes.DATE,
//             get() {
//                 return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss")
//             },
//         },
//         updatedAt: {
//             type: DataTypes.DATE,
//             get() {
//                 return moment(this.getDataValue("updatedAt")).format("YYYY-MM-DD HH:mm:ss")
//             },
//         },
//     },
//     {
//         freezeTableName: true, // 强制表名不转复数
//     }
// )
//
//
// module.exports = UsersRole
