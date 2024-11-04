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
  isTop: number
  status: number
  url: Nullable<any[]>;
}
