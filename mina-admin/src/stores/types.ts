export type userType = {
  userId: number
  role?: number | null
  avatar: string
  username: string
  nickname: string
}

export type userInfoType = {
  username: string
  nickname: string
  avatar: string
  id?: number
}

export type TalkFormType = {
  content: string
  is_top: number | string
  status: number | string
}
