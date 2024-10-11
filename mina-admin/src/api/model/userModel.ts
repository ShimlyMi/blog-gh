export interface LoginParams {
  username: string
  password: string
}

export interface GetUserInfoParams {
  access_token: string
}

export interface UserResult {
  /** `token` */
  access_token: string;
  /** 用户名 */
  username: string;
  avatar: string
  nickname: string;
  /** 当前登陆用户的角色 */
  role: number;
};

export interface RoleInfo {
  roleName: string
  value: string
}

export interface LoginResultModel {
  /** `token` */
  access_token: string;
  /** 用户名 */
  username: string;
  avatar: string
  nickname: string;
  /** 当前登陆用户的角色 */
  role: number;
}

export interface GetUserInfoModel {
  id: number
  username: string
  nickname: string
  avatar: string
  role: number
}
