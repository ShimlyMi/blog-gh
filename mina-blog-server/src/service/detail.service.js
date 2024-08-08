const Config = require("../model/config/detail.model")
class DetailService {
    async create() {
        // const [ detail, created ] = await  Config.findOrCreate({
        //     where: { blog_name: "米娜的小屋" },
        //     defaults: {
        //         personality_signature: "这个人很懒，什么也没写~"
        //     }
        // })
        // if (created) {
        //     console.log("detail.个性签名",detail.personality_signature)
        // }
        // console.log("detail.blog_name",detail.blog_name)
        // console.log("detail.个性签名",detail.personality_signature)
        // console.log("是否是刚刚创建的",created)
    }
    // 修改网站设置
    async updateDetail(config) {
        const {id} = config;
        let one = await Config.findByPk(id);
        // console.log("one", one)
        let res;
        if (one) {
            res = await Config.update(config, {
                where: {
                    id,
                },
            });
        } else {
            res = await Config.create(config);
        }

        return !!res;
    }
    // 获取网站设置
    async getWebDetail() {
        let res = await Config.findAll();
        // console.log("detailFind",res)
        // 这里不能反悔 res[0].dataValues 因为dataValues不能格式化时间
        return res.length ? res[0] : false
    }

}

module.exports = new DetailService()
