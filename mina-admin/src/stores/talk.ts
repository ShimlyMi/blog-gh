import { defineStore } from "pinia";
import { TalkFormType } from "@/stores/types";
import { AddTalkParam } from "@/api/model/talkModel";

interface TalkState {
    talkForm: Nullable<TalkFormType>
    imgUrlList: any[],
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

            }
        }
    }
)
