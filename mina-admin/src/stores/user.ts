import {defineStore} from 'pinia'
import {getAuthCache, setAuthCache} from '@/utils/auth'
import {LoginParams, RoleInfo} from '@/api/model/userModel'
import {getUserInfo, loginApi} from '@/api/system/user'
import router from '@/router'
import {BasicPageEnum} from '@/enums/pageEnum'
import {UserInfo} from "#/store";
import {ROLES_KEY, TOKEN_KEY, USER_INFO_KEY} from "@/enums/cacheEnum";
import {isArray} from "@/utils/is";
import {RoleEnum} from "@/enums/roleEnum";
import {usePermissionStore} from "@/stores/permission";
import {PAGE_NOT_FOUND_ROUTE} from "@/router/routes/basic";
import {RouteRecord, RouteRecordRaw} from "vue-router";

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  role: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}
export const useUserStore = defineStore(
  'user',
  {
    state: (): UserState => ({
      userInfo: null,
      token: undefined,
      role: [],
      sessionTimeout: false,
      lastUpdateTime: 0
    }),
    getters: {
      getUserInfo (): UserInfo {
        return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
      },
      getRoleList(): RoleEnum[] {
        return this.role > 0 ? this.role : getAuthCache<RoleEnum[]>(ROLES_KEY)
      },
      getToken(): string {
        return this.token || getAuthCache<string>(TOKEN_KEY)
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
        setAuthCache(USER_INFO_KEY, info)
      },
      SET_ROLE (role: RoleEnum[]) {
        this.role = role
        setAuthCache(ROLES_KEY, role)
      },
      SET_TOKEN (token: string | undefined) {
        this.token = token ? token : ''
        setAuthCache(TOKEN_KEY, token)
      },
      SET_SESSION_TIMEOUT(flag: boolean) {
        this.sessionTimeout = flag
      },
      RESET_STATE() {
        this.userInfo = null
        this.token = ''
        this.role = null
        this.sessionTimeout = false
      },
      async login (params: LoginParams & { goHome?: boolean }) {
        try {
          const { goHome = true, ...loginParams } = params
          // console.log(params)
          const res = await loginApi(loginParams)
          console.log(res)
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
        const sessionTimeout = this.sessionTimeout
        if (sessionTimeout) {
          this.SET_SESSION_TIMEOUT(false)
        } else {
          const permissionStore = usePermissionStore()
            if (!permissionStore.isDynamicAddedRoute) {
              const routes = await permissionStore.buildRoutesAction()
              routes.forEach((r) => {
                router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
              })
              router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
              permissionStore.setDynamicAddedRoute(true)
            }
            goHome && (await router.replace(userInfo?.homePath || BasicPageEnum.BASE_HOME))
        }
        return userInfo
      },

      async getUserInfoAction (): Promise<UserInfo | null> {
        if (!this.token) return null
        const userInfo = await getUserInfo()
        const { role = [] } = userInfo
        if (isArray(role)) {
          const roleList = role.map((item) => item.value) as RoleEnum[]
          this.SET_ROLE(roleList)
        } else {
          userInfo.role = []
          this.SET_ROLE([])
        }
        this.SET_USERINFO(userInfo)
        return userInfo
      },
      logout (goLogin = false) {
        this.SET_TOKEN(undefined)
        this.SET_SESSION_TIMEOUT(false)
        this.SET_USERINFO(null)
        goLogin && router.push(BasicPageEnum.BASE_LOGIN)
      },

    },
  }
)

export function useUserStoreHook () {
  return useUserStore()
}
