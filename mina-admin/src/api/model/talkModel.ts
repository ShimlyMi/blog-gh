export interface AddTalkParam {
  content: string;
  username: string;
  status: number;
  isTop: number;
  url: Nullable<any[]>;
}

export type TalkResult = {
  content: string
  url: string[]
  status: number
  isTop: number
  like_times: number
}
