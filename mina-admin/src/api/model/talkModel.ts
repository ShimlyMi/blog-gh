export interface AddTalkParam {
  content: string;
  username: string;
  status: number;
  isTop: number;
  url: Nullable<any[]>;
}

export type TalkResult = {
  username: string
  content: string
  url: string[]
  status: number
  isTop: number
  like_times: number
}

export type TalkList = {
  id: number
  content: string
  user: {
    nickname: string
  }
  url: string[]
  status: number
  isTop: number
  like_times: number
  updatedAt: string
}
