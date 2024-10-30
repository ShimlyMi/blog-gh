import { defineStore } from "pinia";
import { TalkFormType } from "@/stores/types";
import { AddTalkParam } from "@/api/model/talkModel";
import { publishTalkApi } from "@/api/system/talk";

interface TalkState {
    talkForm: Nullable<TalkFormType>
    imgUrlList: Nullable<any[]>,
    username: string
}
export const useTalkStore = defineStore(
    'talk',
    {
        state: (): TalkState => ({
            talkForm: null,
            imgUrlList: [],
            username: ""
        }),
        actions: {
            async publishTalk(params: AddTalkParam) {
                this.talkForm = {
                    content: params.content,
                    isTop: params.isTop,
                    status: params.status
                }
                if(params.url) {
                  this.imgUrlList = params.url
                } else {
                  this.imgUrlList = []
                }
                this.username = params.username
                const data: AddTalkParam = {
                    content: this.talkForm.content,
                    username: this.username,
                    status: this.talkForm.status,
                    isTop: this.talkForm.isTop,
                    url: this.imgUrlList,
                }
                const res = await publishTalkApi(data)
                console.log("talk", res)
                return res
            }
        }
    }
)

export function useTalkStoreHook() {
  return useTalkStore()
}
