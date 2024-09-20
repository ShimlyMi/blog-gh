import instance from '@/utils/http/request'
import {GetUserInfoModel, LoginParams} from '@/api/model/userModel'

enum Api {
  Login = '/api/auth/login',
  GetUserInfo = '/api/user/findOne'
}

export const loginApi = (params: LoginParams): Promise<LoginParams> => {
  return instance.post<any, LoginParams>(Api.Login, params)
}

export const getUserInfo = (): Promise<GetUserInfoModel> => {
  return instance.get<any, GetUserInfoModel>(Api.GetUserInfo, {})
}
