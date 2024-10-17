import {BasicKeys, Persistent} from "@/utils/cache/persistent";
import {TOKEN_KEY} from "@/enums/cacheEnum";
import Cookies from "js-cookie";


export function getToken() {
    return getAuthCache(TOKEN_KEY)
}

export function getAuthCache<T>(key: BasicKeys, isLocal = false) {
    const fn = isLocal ? Persistent.getLocal : Persistent.getSession
    return fn(key) as T
}

export function setAuthCache(key: BasicKeys, value: any, isLocal = false) {
    const fn = isLocal ? Persistent.setLocal : Persistent.setSession
    // Cookies.set(key, value)
    return fn(key, value, true)
}

export function clearAuthCache(immediate = true, isLocal = false) {
    const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession
    return fn(immediate)
}

const cookieStorage = {
  save: (name: string, value: any, exp: any) => {
    Cookies.set(name, value, { expires: exp })
  },
  remove(name: string) {
    Cookies.remove(name)
  },
  get(name: string){
    return Cookies.get(name)
  }
}

export default cookieStorage
