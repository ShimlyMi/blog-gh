import Cookies from 'js-cookie'
import {getSessionItem} from '@/interface/session'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface DataInfo {
    /** token */
    access_token: string
    /** 用户名 */
    username: string
    /** 当前登录用户的角色 */
    role?: number;
    nickname: string
}

export const sessionKey = 'user-info'
export const TokenKey = 'authorized-token'
// const userStore = useUserStore()
/** 获取`token` */
export function getToken () {
// 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
    console.log("JSON", JSON.parse(<string>Cookies.get(TokenKey)))
  return Cookies.get(TokenKey) ? JSON.parse(<string>Cookies.get(TokenKey)) : sessionStorage.getItem(TokenKey)
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`token`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`token`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`token`的过期时间（比如2小时））、`expires`（`token`的过期时间）
 * 将`token`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken(token: string) {
    Cookies.set(TokenKey, JSON.stringify({ token }))
    sessionStorage.setItem(TokenKey, token)
}
/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken () {
  Cookies.remove(TokenKey)
  sessionStorage.clear()
}
/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return 'Bearer ' + token
}
