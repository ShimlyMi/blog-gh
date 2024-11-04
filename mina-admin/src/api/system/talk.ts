import {AddTalkParam, TalkList, TalkResult} from "@/api/model/talkModel";
import instance from "@/utils/http/request";

enum Api {
  PUBLIC_TALK = '/api/talk/add',
  GET_ALL_TALK_LIST = '/api/talk',
  UPDATE_TALK = '/api/talk/update',
  REMOVE_TALK = '/api/talk/remove'
}

export const publishTalkApi = (params: AddTalkParam): Promise<TalkResult> => {
  return instance.post<any, TalkResult>(Api.PUBLIC_TALK, params)
}

export const getAllTalkList = (): Promise<TalkList[]> => {
  return instance.get<any, TalkList[]>(Api.GET_ALL_TALK_LIST, {})
}
