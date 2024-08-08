const {DataTypes} = require('sequelize')
const seq = require("../../db/seq")
var moment = require('moment')

const Photo = seq.define(
    "mi_photo",
    {
        album_id: {
            type: DataTypes.INTEGER,
            comment: "相册id 属于哪个相册",
            require: true
        },
        url: {
            type: DataTypes.STRING(555),
            comment: "图片地址",
            require: true
        },
        status: {
            type: DataTypes.INTEGER,
            require: true,
            defaultValue: 1,
            comment: "状态 1 正常 2 回收站 3 彻底删除"
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
    }
)

// Photo.sync({ alter: true }) // 同步数据库表

module.exports = Photo
