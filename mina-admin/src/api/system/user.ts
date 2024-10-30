import instance from '@/utils/http/request'
import {GetUserInfoModel, LoginParams, UserResult} from '@/api/model/userModel'

enum Api {
  Login = '/api/auth/login',
  GetUserInfo = '/api/auth/profile',
  FindOneByUsername = '/api/user/findOneByUsername'
}

export const loginApi = (params: LoginParams): Promise<UserResult> => {
  return instance.post<any, UserResult>(Api.Login, params)
}

// export const loginApi = (data: LoginParams) => {
//   return new Promise<UserResult>(resolve => {
//     instance.post<UserResult, any>(Api.Login, data).then(res => {
//       resolve(res)
//     })
//   })
// }

export const getUserInfo = (): Promise<GetUserInfoModel> => {
  return instance.get<any, GetUserInfoModel>(Api.GetUserInfo, {})
}

