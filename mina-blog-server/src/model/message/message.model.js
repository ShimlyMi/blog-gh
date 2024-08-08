// 	使用的是 seq.define 方法
const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment/moment");

const Message = seq.define("mi_message", {
    content: {
        type: DataTypes.STRING,
        require: true,
        comment: "留言内容"
    },

    avatar: {
        type: DataTypes.STRING,
        comment: "用户头像"
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "留言状态 1 正常 2 表示异常"
    },
    // color: {
    //     type: DataTypes.STRING, // STRING 默认 255
    //     comment: "字体颜色",
    //     defaultValue: '#676767'
    // },
    // font_size: {
    //     type: DataTypes.INTEGER,
    //     comment: "字体大小",
    //     defaultValue: 12
    // },
    // font_weight: {
    //     type: DataTypes.INTEGER,
    //     comment: "字体宽度",
    //     defaultValue: 500
    // },
    // bg_color: {
    //     type: DataTypes.STRING,
    //     comment: "背景颜色"
    // },
    // bg_url: {
    //     type: DataTypes.STRING,
    //     comment: "背景图片"
    // },
    user_id: {
        type: DataTypes.INTEGER,
        comment: "留言用户的id"
    },
    nick_name: {
        type: DataTypes.STRING,
        comment: "游客用户的昵称"
    },
    // tag: {
    //     type: DataTypes.STRING,
    //     comment: "标签"
    // },
    like_times: {
        type: DataTypes.INTEGER,
        comment: "点赞次数",
        defaultValue: 0
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

// Message.sync({ alter: true });

module.exports = Message;
