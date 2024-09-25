import instance from '@/utils/http/request'
import { GetUserInfoModel, LoginParams, UserResult } from '@/api/model/userModel'

enum Api {
  Login = '/api/auth/login',
  GetUserInfo = '/api/auth/profile'
}

export const loginApi = (params: LoginParams): Promise<UserResult> => {
  return instance.post<any, UserResult>(Api.Login, params)
}

export const getUserInfo = (): Promise<GetUserInfoModel> => {
  return instance.get<any, GetUserInfoModel>(Api.GetUserInfo, {})
}
