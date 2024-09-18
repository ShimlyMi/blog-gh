export interface LoginParams {
  username: string
  password: string
}

export interface RoleInfo {
  roleName: string
  value: string
}

export interface LoginResultModel {
  userId: string | number
  token: string
  role: RoleInfo
}

export interface GetUserInfoModel {
  roles: RoleInfo[]
  // 用户id
  userId: string | number
  // 用户名
  username: string
  // 昵称
  nickname: string
  // 头像
  avatar: string
}
