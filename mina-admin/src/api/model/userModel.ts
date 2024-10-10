export interface LoginParams {
  username: string
  password: string
}

export interface GetUserInfoParams {
  id?: number
  username?: string
}
export type UserResult = {
  access_token: string
}
// export type UserResult = {
//   /** 用户名 */
//   username: string;
//   /** 当前登陆用户的角色 */
//   role: number;
//   /** `token` */
//   access_token: string;
//   id: number; // 用户id
//   nickname: string;
// };

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
  userId: number
  // 用户名
  username: string
  // 昵称
  nickname: string
  // 头像
  avatar: string
}
