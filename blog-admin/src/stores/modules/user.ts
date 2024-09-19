import type { UserInfo } from '#/store'
import { RoleEnum } from '@/enums/roleEnum'
import { defineStore } from 'pinia'
import { GetUserInfoModel, LoginParams } from '@/api/model/userModel'

interface UserState {
    userInfo: Nullable<UserInfo>
    token?: string
    roleList: RoleEnum[]
    sessionTimeout?: boolean
    lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo (): UserInfo {
      return this.userInfo
    },
    getToken (): string {
      return this.token
    },
    getRoleList (): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : ''
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
    setRoleList (roleList: RoleEnum[]) {
      this.roleList = roleList
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
      this.roleList = []
      this.sessionTimeout = false
    },

    async login (
      params: LoginParams & {
                getHome?: boolean
            },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { getHome = true, ...loginParams } = params
      } catch (err) {

      }
    },
  },
})
