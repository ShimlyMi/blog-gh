import { ErrorTypeEnum } from '@/enums/exceptionEnum'
import {RoleInfo} from "@/api/model/userModel";

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
  id: string | number
  username: string
  nickname: string
  avatar: string
  homePath?: string
  role: RoleInfo[]
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
/**
 * 对应 `public/serverConfig.json` 文件的类型声明
 */
interface ServerConfigs {
  Version?: string;
  Title?: string;
  FixedHeader?: boolean;
  HiddenSideBar?: boolean;
  MultiTagsCache?: boolean;
  KeepAlive?: boolean;
  Locale?: string;
  Layout?: string;
  Theme?: string;
  DarkMode?: boolean;
  Grey?: boolean;
  Weak?: boolean;
  HideTabs?: boolean;
  SidebarStatus?: boolean;
  EpThemeColor?: string;
  ShowLogo?: boolean;
  ShowModel?: string;
  MenuArrowIconNoTransition?: boolean;
  CachingAsyncRoutes?: boolean;
  TooltipEffect?: Effect;
  ResponsiveStorageNameSpace?: string;
}

declare type Nullable<T> = T | null
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
