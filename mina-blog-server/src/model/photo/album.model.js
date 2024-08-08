const {DataTypes} = require('sequelize')
const seq = require("../../db/seq")
var moment = require('moment')

const Album = seq.define(
    "mi_album",
    {
        album_name: {
            type: DataTypes.STRING(26),
            comment: "相册名称",
            require: true
        },
        album_cover: {
            type: DataTypes.STRING(555),
            comment: "相册封面",
            require: true
        },
        description: {
            type: DataTypes.STRING(55),
            require: true,
            comment: "相册描述信息"
        },
        createAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue("createAt")).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        updateAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue("updateAt")).format("YYYY-MM-DD HH:mm:ss")
            }

        }
    },
    {
        freezeTableName: true, // 强制表明不转复数
        paranoid: true,
    }
)

// Album.sync({ alter: true }) // 同步数据库表

module.exports = Album
