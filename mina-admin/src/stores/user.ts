import {defineStore} from 'pinia'
import { sessionCache, setToken} from '@/utils/auth'
import {LoginParams} from '@/api/model/userModel'
import {getUserInfo, loginApi} from '@/api/system/user'
import router from '@/router'
import {BasicPageEnum} from '@/enums/pageEnum'
import {UserInfo} from "#/store";
import {ROLES_KEY, TOKEN_KEY, USER_INFO_KEY} from "@/enums/cacheEnum";
import {isArray} from "@/utils/is";
import {RoleEnum} from "@/enums/roleEnum";
import Cookies from "js-cookie";
import {_decrypt, _encrypt} from "@/utils/encipher";

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  role: RoleEnum[]
  userId: number
  sessionTimeout?: boolean
  lastUpdateTime: number
}
export const useUserStore = defineStore(
  'user',
  {
    state: (): UserState => ({
      userInfo: null,
      userId: 0,
      token: undefined,
      role: [],
      sessionTimeout: false,
      lastUpdateTime: 0
    }),
    getters: {
      getUserInfo(): UserInfo {
        return this.userInfo || sessionCache.getCache(USER_INFO_KEY) || {}
      },
      // getUserId() {
      //   const str = sessionCache.getCache(TOKEN_KEY)
      //   const data = _decrypt(str)
      //   this.userId = data.id
      //   return this.userId
      // },
      getRoleList(): RoleEnum[] {
        return this.role.length > 0 ? this.role : sessionCache.getCache(ROLES_KEY)
      },
      getToken(): string {
        return this.token || sessionCache.getCache(TOKEN_KEY)
      },
      getSessionTimeout(): boolean {
        return !!this.sessionTimeout
      },
      getLastUpdateTime(): number {
        return this.lastUpdateTime
      },
    },
    actions: {
      SET_USERINFO (info: UserInfo | null) {
        this.userInfo = info
        this.lastUpdateTime = new Date().getTime()
        const users = _encrypt(info)
        sessionCache.setCache(USER_INFO_KEY, users)
      },
      SET_ROLE (role: RoleEnum[]) {
        this.role = role
        const roles = _encrypt(role)
        sessionStorage.setItem(ROLES_KEY, roles)
      },
      SET_TOKEN (token: string) {
        this.token = token ? token : ''
        sessionStorage.setItem(TOKEN_KEY, token)
        Cookies.set(TOKEN_KEY, JSON.stringify(token))
      },
      SET_SESSION_TIMEOUT(flag: boolean) {
        this.sessionTimeout = flag
      },
      RESET_STATE() {
        this.userInfo = null
        this.token = ''
        this.role = []
        this.sessionTimeout = false
      },
      async login (params: LoginParams & { goHome?: boolean }) {
        try {
          const { goHome = true, ...loginParams } = params
          // console.log(params)
          const res = await loginApi(loginParams)
          // console.log(res)
          const { access_token } = res
          this.SET_TOKEN(access_token)
          return this.afterLogin(goHome)
          // return res
        } catch (err) {
          return Promise.reject(err)
        }
      },

      async afterLogin (goHome?: boolean) {
        if (!this.token) return null
        const userInfo = await this.getUserInfoAction()
        console.log("afterLogin", userInfo)
        goHome && (await router.replace('/'))
        return userInfo
      },

      async getUserInfoAction (): Promise<UserInfo | null> {
        if (!this.token) return null
        const userInfo = await getUserInfo()
        console.log("userInfo", userInfo)
        const { role = [] } = userInfo
        if (isArray(role)) {
          const roleList = role.map((item) => item.value) as RoleEnum[]
          this.SET_ROLE(roleList)
        } else {
          userInfo.role = []
          this.SET_ROLE([])
        }
        const data = {
          token: this.token,
          userInfo,
          role: role.map((item) => item.value) as RoleEnum[]
        }
        setToken(data)
        this.SET_USERINFO(userInfo)
        return userInfo
      },
      logout (goLogin = false) {
        this.SET_TOKEN("")
        this.SET_SESSION_TIMEOUT(false)
        this.SET_USERINFO(null)
        goLogin && router.replace({ path: '/login' })
      },

    },
  }
)

export function useUserStoreHook () {
  return useUserStore()
}
