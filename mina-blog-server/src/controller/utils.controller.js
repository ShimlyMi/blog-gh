const path = require('path');
const { ERRORCODE, throwError, result, tipsResult } = require("../constant/err.type")
const errorCodeUpload = ERRORCODE.UPLOAD
const errorCodeConfig = ERRORCODE.CONFIG
const { getWebDetail, updateDetail } = require("../service/detail.service")
const fs = require("fs");

class UtilsController {
    /** 图片上传 */
    async upload(ctx, next) {
        const { file } = ctx.request.files;
        // console.log(file);
        const fileTypes = ['image/jpeg', 'image/png']
            // console.log(file)
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                console.log(ctx.request.files.file.mimetype)
                return ctx.app.emit('error', throwError(errorCode, "文件格式错误"), ctx)
            }
            ctx.body = result("图片上传成功", {
                    url: "http://127.0.0.1:8888/" + path.basename(file.filepath),
                })
                // console.log(file.filepath);
            console.log("图片上传成功");
        } else {
            return ctx.app.emit('error', throwError(errorCodeUpload, "图片上传失败"), ctx)
        }
    }

    // 删除服务器下的照片
    async deleteOnlineImgs(imgList) {
        Array.isArray(imgList) &&
            imgList.length &&
            imgList.forEach((v) => {
                if (v) {
                    let filePath = path.join(__dirname, "./upload/online/" + v).replace("/controller/utils", "");
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
            });
    }

    /** 修改设置 */
    async updateDetail(ctx) {
            try {
                let config = await getWebDetail();
                // 如果背景图不一致，删除原来的
                const { avatar_bg, blog_avatar } = ctx.request.body;
                // console.log(" avatar_bg, blog_avatar",  avatar_bg, blog_avatar)
                // console.log("ctx.request.body", ctx.request.body)
                const Utils = new UtilsController();
                if (avatar_bg && config.avatar_bg && avatar_bg != config.avatar_bg) {
                    await Utils.deleteOnlineImgs([config.avatar_bg.split("/").pop()])
                }
                if (blog_avatar && config.blog_avatar && blog_avatar != config.blog_avatar) {
                    await Utils.deleteOnlineImgs([config.blog_avatar.split("/").pop()]);
                }
                let res = await updateDetail(ctx.request.body)
                ctx.body = result("修改网站设置成功", res)

            } catch (error) {
                console.error(error)
                return ctx.app.emit("error", throwError(errorCodeConfig, "修改网站设置失败"), ctx)
            }
        }
        /** 获取详情信息 */
    async getDetail(ctx) {
        try {
            let res = await getWebDetail()
                // console.log("detail", res)
            if (res) {
                ctx.body = result("获取详情成功", res);
            } else {
                ctx.body = tipsResult("请到博客后台查看完整的详细信息");
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCodeConfig, "获取详情失败"), ctx)
        }
    }
}

module.exports = new UtilsController();
