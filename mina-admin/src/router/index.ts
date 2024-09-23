import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from "vue-router";

import {remainingRouter} from './routes'


const modules: Record<string, any> = import.meta.glob(
    ['./modules/**/*.ts', '!./routes/**/index'],
    { eager: true }
)

/** 原始静态路由（未做任何处理） */
const routes = [];

Object.keys(modules).forEach(key => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routes.push(...modList)
})
/** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */


// 白名单应该包含基本静态路由
const whiteList: string[] = []
const getRouteNames = (arr: any[]) => {
    arr.forEach((item) => {
        whiteList.push(item.name)
        getRouteNames(item.children || [])
    })
}
getRouteNames(remainingRouter)

export const router: Router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: remainingRouter as unknown as RouteRecordRaw[],
    strict: true,
})

export function resetRouter() {
    router.getRoutes().forEach((route: any) => {
        const { name } = route
        if (name && !whiteList.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name)
        }
    })
}
