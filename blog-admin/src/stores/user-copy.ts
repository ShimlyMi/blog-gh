import { userInfoType, userType } from './types'
import router from '@/router'
import { defineStore } from 'pinia'
import { GetUserInfoModel, LoginParams } from '@/api/model/userModel'
import { getUserInfo, loginApi } from '@/api/system/user'
import { USER_INFO_KEY } from '@/enums/cacheEnum'
import { BasicPageEnum } from '@/enums/pageEnum'
import { type DataInfo, getToken, removeToken, sessionKey, setToken } from '@/utils/auth'
import { storageSession } from '@/interface/session'

export const useUserStore = defineStore({
  id: 'user',
  state: (): userType => ({
    username: storageSession.getItem<DataInfo<string>>(USER_INFO_KEY)?.username ?? '',
    role: storageSession.getItem<DataInfo<number>>(USER_INFO_KEY)?.role,
    avatar: '',
    nickname: storageSession.getItem<DataInfo<string>>(USER_INFO_KEY)?.nickname ?? '',
    userId: 0,
  }),
  getters: {
    getUserId () {
      return (this.userId || storageSession.getItem<userInfoType>(USER_INFO_KEY)?.id)
    },
    getAvatar () {
      return (this.avatar || storageSession.getItem<userInfoType>(USER_INFO_KEY)?.avatar)
    },
    getNickname () {
      return (this.nickname || storageSession.getItem<userInfoType>(USER_INFO_KEY)?.nickname)
    },
  },
  actions: {
    /** 存储用户名 */
    SET_USERNAME (username: string) {
      this.username = username
    },
    /** 存储角色 */
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
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async afterLogin (goHome?: boolean): Promise<GetUserInfoModel | null> {
      const token = getToken()
      if (!token) return null
      const userInfo = await this.getUserInfoAction()
      goHome && (await router.replace(BasicPageEnum.BASE_HOME))
      return userInfo
    },

  },
  logout () {
    removeToken()
    this.SET_USERNAME('')
    router.push(BasicPageEnum.BASE_LOGIN)
  },
})
