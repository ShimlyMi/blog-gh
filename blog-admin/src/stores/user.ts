import { defineStore } from 'pinia'
import { userInfoType, userType } from './types'
import { storageSession } from '@/interface/session'
import { DataInfo, getToken, removeToken, setToken } from '@/utils/auth'
import { USER_INFO_KEY } from '@/enums/cacheEnum'
import { GetUserInfoModel, LoginParams } from '@/api/model/userModel'
import { getUserInfo, loginApi } from '@/api/system/user'
import router from '@/router'
import { BasicPageEnum } from '@/enums/pageEnum'

export const useUserStore = defineStore(
  'user',
  {
    state: (): userType => ({
      username: storageSession.getItem<DataInfo<string>>(USER_INFO_KEY)?.username ?? '',
      nickname: storageSession.getItem<DataInfo<string>>(USER_INFO_KEY)?.nickname ?? '',
      role: storageSession.getItem<DataInfo<number>>(USER_INFO_KEY)?.role,
      avatar: '',
      userId: 0,
    }),
    getters: {
      getUserId (): any {
        return (this.userId || storageSession.getItem<userInfoType>(USER_INFO_KEY)?.id)
      },
      getAvatar (): any {
        return (this.avatar || storageSession.getItem<userInfoType>(USER_INFO_KEY)?.avatar)
      },
      getNickname (): any {
        return (this.nickname || storageSession.getItem<userInfoType>(USER_INFO_KEY)?.nickname)
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
      async login (params: LoginParams & { goHome?: boolean }): Promise<GetUserInfoModel | null> {
        try {
          const { goHome = true, ...loginParams } = params
          const data = await loginApi(loginParams)
          setToken(data)
          this.SET_TOKEN(String(data.id))
          return this.afterLogin(goHome)
        } catch (error) {
          return Promise.reject(error)
        }
      },

      async afterLogin (goHome?: boolean): Promise<GetUserInfoModel | null> {
        const token = getToken()
        if (!token) return null
        const userInfo = await this.getUserInfoAction()
        goHome && (await router.replace(BasicPageEnum.BASE_HOME))
        return userInfo
      },

      async getUserInfoAction (): Promise<GetUserInfoModel | null> {
        const token = getToken()
        if (!token) return null
        const userInfo = await getUserInfo()
        this.SET_AVATAR(userInfo.avatar)
        this.SET_NICKNAME(userInfo.nickname)
        this.SET_ID(userInfo.userId)
        storageSession.setItem<userInfoType>(USER_INFO_KEY, userInfo)
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
