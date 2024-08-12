const { result, throwError, ERRORCODE } = require("../constant/err.type");
const errorCode = ERRORCODE.NOTIFY;

const { createNotify, deleteNotify, getNotifyList, updateNotify } = require("../service/notify.service")

class NotifyController {
    /** 新增消息通知 */
    async addNotify({ user_id, type, to_id, message }) {
        try {
           await createNotify({ user_id, type, to_id, message })
        } catch (err) {
            console.error(err)
        }
    }

    /** 已阅消息通知 */
    async updateNotice(ctx) {
        try {
            let  res = await updateNotify(ctx.params.id);
            ctx.body = result("已阅消息通知成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "已阅消息通知失败"), ctx)
        }
    }

    /** 删除消息通知 */
    async deleteNotify(ctx) {
        try {
            let res = await deleteNotify(ctx.params.id)
            ctx.body = result("删除消息通知成功", { res })
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "删除消息通知失败"))
        }
    }

    /** 分页查找消息通知 */
    async getNotifyList(ctx) {
        try {
            const { current, size, userId } = ctx.request.body
            let res = await getNotifyList({ current, size, userId });
            ctx.body = result("分页查找消息通知成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "分页查找消息通知失败"), ctx)
        }
    }
}

module.exports = new NotifyController();
