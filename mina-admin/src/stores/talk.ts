import { defineStore } from "pinia";
import { TalkFormType } from "@/stores/types";
import { AddTalkParam } from "@/api/model/talkModel";
import {publishTalkApi} from "@/api/system/talk";

interface TalkState {
    talkForm: Nullable<TalkFormType>
    imgUrlList: Nullable<any[]>,
    userId: number
}
export const useTalkStore = defineStore(
    'talk',
    {
        state: (): TalkState => ({
            talkForm: null,
            imgUrlList: [],
            userId: 0
        }),
        actions: {
            async publishTalk(params: AddTalkParam) {
                this.talkForm = {
                    content: params.content,
                    isTop: params.isTop,
                    status: params.status
                }
                this.imgUrlList = params.url
                this.userId = params.userId
                const data: AddTalkParam = {
                    content: this.talkForm.content,
                    userId: this.userId,
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
