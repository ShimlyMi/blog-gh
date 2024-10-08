import {AddTalkParam} from "@/api/model/talkModel";

enum Api {
  PUBLIC_TALK = '/api/talk/add',
  GET_ALL_TALK_LIST = '/api/talk',
  UPDATE_TALK = '/api/talk/update',
  REMOVE_TALK = '/api/talk/remove'
}

export const publicTalkApi = (param: AddTalkParam) => {

}
