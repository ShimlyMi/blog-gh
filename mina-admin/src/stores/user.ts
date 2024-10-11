import { defineStore } from 'pinia'
import {  userType } from './types'
import { getToken, removeToken, setToken} from '@/utils/auth'
import { USER_INFO_KEY } from '@/enums/cacheEnum'
import {GetUserInfoModel, LoginParams} from '@/api/model/userModel'
import { getUserInfo, loginApi } from '@/api/system/user'
import router from '@/router'
import { BasicPageEnum } from '@/enums/pageEnum'

export const useUserStore = defineStore(
  'user',
  {
    state: (): userType => ({
      username: sessionStorage.getItem(USER_INFO_KEY)?.username ?? '',
      nickname: sessionStorage.getItem(USER_INFO_KEY)?.nickname ?? '',
      role: sessionStorage.getItem(USER_INFO_KEY)?.role,
      avatar: '',
      userId: 0,
    }),
    getters: {
      getUserId (): any {
        return (this.userId || sessionStorage.getItem(USER_INFO_KEY)?.id)
      },
      getAvatar (): any {
        return (this.avatar || sessionStorage.getItem(USER_INFO_KEY)?.avatar)
      },
      getNickname (): any {
        return (this.nickname || sessionStorage.getItem(USER_INFO_KEY)?.nickname)
      },
    },
    actions: {
      SET_USERNAME (username: string) {
        this.username = username
      },
      SET_ROLE (role: number) {
        this.role = role
      },
      SET_TOKEN (token: string) {
        this.token = token
      },
      SET_AVATAR (avatar: string) {
        this.avatar = avatar
      },
      SET_NICKNAME (nickname: string) {
        this.nickname = nickname
      },
      SET_ID (id: number) {
        this.userId = id
      },
      async login (params: LoginParams & { goHome?: boolean }) {
        try {
          const { goHome = true, ...loginParams } = params
          // console.log(params)
          const res = await loginApi(loginParams)
          console.log(res)
          const { access_token } = res
          setToken(access_token)
          this.SET_TOKEN(access_token)
          return this.afterLogin(goHome)
          // return res
        } catch (err) {
          return Promise.reject(err)
        }
      },

      async afterLogin (goHome?: boolean): Promise<GetUserInfoModel | null> {
        const access_token = getToken()
        const token = access_token.token
        if (!token) return null
        const userInfo = await this.getUserInfoAction()
        goHome && await router.push('/')
        return userInfo
      },

      async getUserInfoAction (): Promise<GetUserInfoModel | null> {
        const access_token = getToken()
        const token = access_token.token
        if (!token) return null
        const userInfo = await getUserInfo()
        console.log("userInfo", userInfo)
        this.SET_AVATAR(userInfo.avatar)
        this.SET_NICKNAME(userInfo.nickname)
        this.SET_ID(userInfo.id)
        sessionStorage.setItem(USER_INFO_KEY, userInfo)
        return userInfo
      },
      logout () {
        removeToken()
        this.username = ''
        router.push(BasicPageEnum.BASE_LOGIN)
      },
    },
  }
)

export function useUserStoreHook () {
  return useUserStore()
}
