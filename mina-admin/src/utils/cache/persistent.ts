import {
    TOKEN_KEY,
    MULTIPLE_TABS_KEY,
    ROLES_KEY,
    USER_INFO_KEY,
    APP_LOCAL_CACHE_KEY,
    APP_SESSION_CACHE_KEY
} from "@/enums/cacheEnum";
import { UserInfo, Nullable } from "#/store";
import {RouteLocationNormalized} from "vue-router";
import {createLocalStorage, createSessionStorage} from "@/utils/cache/index";
import {Memory} from "@/utils/cache/memory";
import {DEFAULT_CACHE_TIME} from "@/config/encryption";
import {toRaw} from "vue";

interface BasicStore {
    [TOKEN_KEY]: string | number | null | undefined
    [USER_INFO_KEY]: UserInfo
    [ROLES_KEY]: number
    [MULTIPLE_TABS_KEY]: RouteLocationNormalized[]
}

type LocalStore = BasicStore
type SessionStore = BasicStore

export type BasicKeys = keyof BasicStore
type LocalKeys = keyof LocalStore
type SessionKeys = keyof SessionStore

const storageLocal = createLocalStorage()
const storageSession = createSessionStorage()

const localMemory = new Memory(DEFAULT_CACHE_TIME)
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)

function initPersistentMemory() {
    const localCache = storageLocal.getCache(APP_LOCAL_CACHE_KEY)
    const sessionCache = storageSession.getCache(APP_LOCAL_CACHE_KEY)
    localCache && localMemory.resetCache(sessionCache)
    sessionCache && sessionMemory.resetCache(sessionCache)
}

export class Persistent {
    static getLocal<T>(key: LocalKeys) {
        return localMemory.get(key)?.value as Nullable<T>
    }
    static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false) {
        localMemory.set(key, toRaw(value))
        immediate && storageLocal.setCache(APP_LOCAL_CACHE_KEY, localMemory.getCache)
    }

    static removeLocal(key: LocalKeys, immediate = false) {
        localMemory.remove(key)
        immediate && storageLocal.setCache(APP_LOCAL_CACHE_KEY, localMemory.getCache)
    }

    static clearLocal(immediate = false) {
        localMemory.clear()
        immediate && storageSession.clearCache()
    }

    static getSession<T>(key: SessionKeys) {
        return sessionMemory.get(key)?.value as Nullable<T>
    }
    static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false) {
        sessionMemory.set(key, toRaw(value))
        immediate && storageSession.setCache(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
    }

    static removeSession(key: SessionKeys, immediate = false) {
        sessionMemory.remove(key)
        immediate && storageSession.setCache(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
    }

    static clearSession(immediate = false) {
        sessionMemory.clear()
        immediate && storageSession.clearCache()
    }

    static clearAll(immediate = false) {
        sessionMemory.clear()
        localMemory.clear()
        if (immediate) {
            storageLocal.clearCache()
            storageSession.clearCache()
        }
    }
}

function storageChange(e: any) {
    const { key, newValue, oldValue } = e
    if (!key) {
        Persistent.clearAll()
        return
    }

    if (!!newValue && !!oldValue) {
        if (APP_LOCAL_CACHE_KEY == key) {
            Persistent.clearLocal()
        }
        if (APP_SESSION_CACHE_KEY === key) {
            Persistent.clearSession()
        }
    }
}
window.addEventListener('storage', storageChange)
initPersistentMemory()
