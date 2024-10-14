import { RouteLocationNormalized, Router } from "vue-router";
import { setRouteChange } from "@/logics/mitt/routeChange";


export function setupRouterGuard(router: Router) {
    createPageGuard(router)
    createScrollGuard(router)
}

function createPageGuard(router: Router) {
    const loaderPageMap = new Map<string, boolean>()
    router.beforeEach(async (to) => {
        to.meta.loaded = !!loaderPageMap.get(to.path)
        setRouteChange(to)
        return true
    })
    router.afterEach((to) => {
        loaderPageMap.set(to.path, true)
    })
}

function createScrollGuard(router: Router) {
    const isHash = (href: string) => {
        return /^#/.test(href)
    }

    const body = document.body

    router.afterEach(async (to) => {
        // scroll top
        isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
        return true
    })
}
