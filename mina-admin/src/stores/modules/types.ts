import { UserInfo } from '#/store'
// import { RoleEnum } from '@/enums/roleEnum'

export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  role: number
  sessionTimeout?: boolean
  lastUpdateTime: number
}
