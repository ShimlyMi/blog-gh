import { UserInfo } from '#/store'
import { UserState } from '@/stores/modules/types'
import router from '@/router'
import { store } from '@/stores'
import { defineStore } from 'pinia'
import { GetUserInfoModel, LoginParams } from '@/api/model/userModel'
import { getUserInfo, loginApi } from '@/api/system/user'
import { RoleEnum } from '@/enums/roleEnum'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { BasicPageEnum } from '@/enums/pageEnum'
import { removeToken } from '@/utils/auth'
import { storageSession } from '@/interface/session'

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    role: 2,
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo (): UserInfo {
      return this.userInfo || storageSession.getItem<string>(USER_INFO_KEY)?.userInfo
    },
    getToken (): string {
      return this.token || storageSession.getItem<string>(TOKEN_KEY)?.token
    },
    // getRoleList (): RoleEnum[] {
    //   return this.role || storageSession.getItem<RoleEnum[]>(ROLES_KEY)?.role
    // },
    getRole (): string {
      return this.role
    },
    getSessionTimeout (): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime (): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken (info: string | undefined) {
      this.token = info || ''
    },
    setRole (role: number) {
      this.role = role
    },
    setUserInfo (info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
    },
    setSessionTimeout (flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState () {
      this.userInfo = null
      this.token = ''
      this.role = null
      this.sessionTimeout = false
    },

    async login (params: LoginParams & { goHome?: boolean }): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, ...loginParams } = params
        const data = await loginApi(loginParams)
        const { token } = data
        this.setToken(token)
        return this.afterLogin(goHome)
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async afterLogin (goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null
      const userInfo = await this.getUserInfoAction()
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        goHome && (await router.replace(userInfo?.homePath || BasicPageEnum.BASE_HOME))
      }
      return userInfo
    },

    async getUserInfoAction (): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const userInfo = await getUserInfo()
      const { role } = userInfo
      this.setRole(role)
      this.setUserInfo(userInfo)
      storageSession.setItem<UserInfo>(USER_INFO_KEY, userInfo)
      return userInfo
    },
  },

  logout () {
    removeToken()
    this.setSessionTimeout(false)
    this.setUserInfo(null)
    goLogin && router.push(BasicPageEnum.BASE_LOGIN)
  },
})

export function useUserStoreHook () {
  return useUserStore(store)
}
