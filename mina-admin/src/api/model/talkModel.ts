export interface AddTalkParam {
  content: string;
  userId: number;
  status: number;
  isTop: number;
  url?: string[];
}

export type TalkResult = {
  content: string
  url?: string[]
  status: number
  isTop: number
  like_times: number
}
