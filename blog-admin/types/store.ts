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

export interface userInfo {
  userId: string | number
  username: string
  nickname: string
  avatar: string
  role: RoleInfo[]
}

export interface beforeMiniState {
  menuCollapsed?: boolean
}
