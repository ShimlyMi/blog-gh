// import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
export interface DataInfo<T> {
    /** token */
    token: string;
    /** 用户名 */
    user_name?: string;
    /** 当前登录用户的角色 */
    role?: number;
    /** 用户昵称 */
    nick_name?: string;
}

export const sessionKey = "user-info";
export const TokenKey = "authorized-token";

/** 获取`token` */
export function getToken(): DataInfo<number> {
// 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
    return Cookies.get(TokenKey) ? JSON.parse(Cookies.get(TokenKey)) : sessionStorage.getItem(sessionKey);
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`token`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`token`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`token`的过期时间（比如2小时））、`expires`（`token`的过期时间）
 * 将`token`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken(data: DataInfo<string>) {
    const { token } = data;

    function setSesstionKey(user_name: string, role: number) {

    }
}
