// import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie'
import { UserInfo } from '#/store'
import { useUserStoreHook } from '@/stores/modules/user'
import { storageSession } from '@/interface/session'
export interface DataInfo<T = any> {
    /** token */
    token: string;
    /** 用户名 */
    userInfo: UserInfo;
    /** 当前登录用户的角色 */
    role?: number;
}

export const sessionKey = 'user-info'
export const TokenKey = 'authorized-token'

/** 获取`token` */
export function getToken (): DataInfo<number> {
// 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey) ? JSON.parse(Cookies.get(TokenKey)) : sessionStorage.getItem(sessionKey)
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`token`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`token`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`token`的过期时间（比如2小时））、`expires`（`token`的过期时间）
 * 将`token`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken (data: DataInfo<string>) {
  const { token } = data
  function setSessionKey (userInfo: UserInfo, role: number) {
    useUserStoreHook().setUserInfo(userInfo)
    useUserStoreHook().setRole(role)
    sessionStorage.setItem(sessionKey, { userInfo, role })
  }
  Cookies.set(TokenKey, JSON.stringify({ token }))
  if (data.userInfo && data.role) {
    const { userInfo, role } = data
    setSessionKey(userInfo, role)
  } else {
    const userInfo = storageSession.getItem<DataInfo<number>>(sessionKey)?.userInfo ?? ''
    const role = storageSession.getItem<DataInfo<number>>(sessionKey)?.role ?? ''
    setSessionKey(userInfo, role)
  }
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
