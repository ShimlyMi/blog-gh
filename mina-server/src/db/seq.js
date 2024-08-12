const { Sequelize } = require("sequelize")
// 导入 配置文件里的 MYSQL 配置
const {
    MYSQL_HOST,
    MYSQL_POST,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = require("../config/config.default")

// 实例化对象
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
})

// 测试链接
seq.authenticate().then(() => {
    console.log("数据库连接成功");
    // const User = require('../model/user/user.model')(seq);
    // const Role = require('../model/role/role.model')(seq);
    // // User的实例对象将拥有：getRole、serRole、addRole、createRole、removeRole、hasRole 方法
    // User.hasMany(Role)
    //
    // // Role的实例对象将拥有：getUser、serUser、createUser方法
    // Role.belongsTo(User)
    // seq.sync().then(async () => {
    //     console.log("数据库和数据表都已创建！")
    // })
}).catch((err) => {
    console.log("数据库连接失败", err);
})

module.exports = seq;
