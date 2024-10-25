import { BasicPageEnum } from "@/enums/pageEnum";
import { RouteLocationRaw, Router, useRouter } from "vue-router";

export type PathAsPageEnum<T> = T extends { path: string } ? T & { path: BasicPageEnum } : T
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>

function handleError(e: Error) {
    console.error(e)
}

export function useGo(_router?: Router) {
    const { push, replace } = _router || useRouter()
    function go(opt: RouteLocationRawEx = BasicPageEnum.BASE_HOME, isReplace = false) {
        if (!opt) return
        isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
    }
    return go
}

