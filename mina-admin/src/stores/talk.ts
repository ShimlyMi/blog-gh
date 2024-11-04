import {defineStore} from "pinia";
import {TalkFormType} from "@/stores/types";
import {AddTalkParam} from "@/api/model/talkModel";
import {getAllTalkList, publishTalkApi} from "@/api/system/talk";


interface TalkState {
    talkForm: Nullable<TalkFormType>
    username: string
    talkList: any[]
}
export const useTalkStore = defineStore(
    'talk',
    {
        state: (): TalkState => ({
            talkForm: null,
            username: "",
            talkList: []
        }),
        actions: {
          setForm(formData: TalkFormType) {
            this.talkForm = formData
          },
          async getTalkList() {
            this.talkList.map(async () => {
              await getAllTalkList()
            })
            return this.talkList
          },
          async publishTalk(params: AddTalkParam) {
            if (params.url) {
              this.talkForm = {
                content: params.content,
                isTop: params.isTop,
                status: params.status,
                url: params.url
              }
            } else {
              this.talkForm = {
                content: params.content,
                isTop: params.isTop,
                status: params.status,
                url: null
              }
            }
            this.username = params.username
            const data: AddTalkParam = {
              content: this.talkForm.content,
              username: this.username,
              status: this.talkForm.status,
              isTop: this.talkForm.isTop,
              url: this.talkForm.url,
            }
            const res = await publishTalkApi(data)
            console.log("talk", res)
            return res
          },
          resetForm() {
              this.talkForm = {
                content: '',
                status: 1,
                isTop: 1,
                url: null
              }
          }
        }
    }
)

export function useTalkStoreHook() {
  return useTalkStore()
}
