import { defineStore } from "pinia";

interface TalkState {
    content: string
    url: string[]
    isTop: number | string
    isPublic: number | string
}
export const useTalkStore = defineStore(
    'talk',
    {

    }
)
