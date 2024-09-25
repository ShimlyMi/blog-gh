export type userType = {
  userId: number
  role?: number
  verifyCode?: string
  currentPage?: number
  avatar: string
  username: string
  nickname: string
  token?: string
}

export type userInfoType = {
  username: string
  nickname: string
  avatar: string
  id?: number
}
