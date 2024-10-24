import { ErrorTypeEnum } from '@/enums/exceptionEnum'
import { RoleInfo } from '@/api/model/userModel'

export interface ErrorLoginInfo {
  // Type of error
  type: ErrorTypeEnum,
  // Error file
  file: string
  // Error name
  name?: string
  // Error message
  message: string
  // Error stack
  stack?: string
  // Error detail
  detail: string
  // Error url
  url: string
  // Error time
  time?: string
}

export interface UserInfo {
  userId: string | number
  username: string
  nickname: string
  avatar: string
  homePath?: string
  role: number
}

export type userInfoType = {
  username: string
  nickname: string
  avatar: string
  id?: number
}

export interface beforeMiniState {
  menuCollapsed?: boolean
}
