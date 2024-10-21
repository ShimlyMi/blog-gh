import {TOKEN_KEY, USER_INFO_KEY} from "@/enums/cacheEnum";
import Cookies from "js-cookie";
import {RoleEnum} from "@/enums/roleEnum";
import {useUserStoreHook} from "@/stores/user";
import {GetUserInfoModel} from "@/api/model/userModel";
import {_encrypt} from "@/utils/encipher";



export interface DataInfo<T = any> {
  /** token */
  token: string;
  /** 用户名 */
  userInfo: GetUserInfoModel;
  /** 当前登陆用户的角色 */
  role?: RoleEnum[];
}

export function getToken(): DataInfo<number> {
    return Cookies.get(TOKEN_KEY) ? JSON.parse(<string>Cookies.get(TOKEN_KEY)) : sessionStorage.getItem(USER_INFO_KEY)
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
  Cookies.remove(TOKEN_KEY);
  sessionStorage.clear();
}

export function setToken(data: DataInfo<string>) {
  const { token } = data
  function setSessionKey(userInfo: GetUserInfoModel,  role: RoleEnum[]) {
    useUserStoreHook().SET_USERINFO(userInfo)
    useUserStoreHook().SET_ROLE(role)
    sessionCache.setCache(USER_INFO_KEY, _encrypt({ userInfo, role }))
    // sessionStorage.setItem(USER_INFO_KEY, { userInfo, role})
  }
  Cookies.set(TOKEN_KEY, JSON.stringify({ token }))
  if (data.userInfo && data.role) {
    const { userInfo, role } = data
    setSessionKey(userInfo, role)
  } else {
    const userInfo = useUserStoreHook().getUserInfo
    const role = useUserStoreHook().getRoleList
    setSessionKey(<GetUserInfoModel>userInfo,role)
  }
}

enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clearCache() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)
export { localCache, sessionCache }

