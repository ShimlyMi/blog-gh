import { BasicPageEnum } from "@/enums/pageEnum";
import { RootRoute } from "@/router/routes";
import {Router, RouteRecordRaw} from "vue-router";
import { useUserStoreHook } from "@/stores/user";
import {usePermissionStoreHook} from "@/stores/permission";
import {PAGE_NOT_FOUND_ROUTE} from "@/router/routes/basic";

const LOGIN_PATH = BasicPageEnum.BASE_LOGIN
const ROOT_PATH = RootRoute.path
const whitePathList: BasicPageEnum[] = [LOGIN_PATH]

export function createPermissionGuard(router: Router) {
    const userStore = useUserStoreHook()
    const permissionStore = usePermissionStoreHook()
    router.beforeEach(async (to, from, next) => {
        if (
            from.path === ROOT_PATH &&
            to.path === BasicPageEnum.BASE_HOME &&
            userStore.getUserInfo.homePath &&
            userStore.getUserInfo.homePath !== BasicPageEnum.BASE_HOME
        ) {
            next(userStore.getUserInfo.homePath)
            return
        }
        const token = userStore.getToken
        if (whitePathList.includes(to.path as BasicPageEnum)) {
            if (to.path === LOGIN_PATH && token) {
                const isSessionTimeout = userStore.getSessionTimeout
                try {
                    await userStore.afterLogin()
                    if (!isSessionTimeout) {
                        next((to.query?.redirect as string) || '/')
                        return
                    }
                } catch {}
            }
            next()
            return
        }

        if (!token) {
            if (to.meta.ignoreAuth) {
                next()
                return
            }

            const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
                path: LOGIN_PATH,
                replace: true
            }
            if (to.path) {
                redirectData.query = {
                    ...redirectData.query,
                    redirect: to.path
                }
            }
            next(redirectData)
            return
        }
        if (
            from.path === LOGIN_PATH &&
            to.name === PAGE_NOT_FOUND_ROUTE.name &&
            to.fullPath !== (userStore.getUserInfo.homePath || BasicPageEnum.BASE_HOME)
        ) {
            next(userStore.getUserInfo.homePath || BasicPageEnum)
            return
        }

        if (userStore.getLastUpdateTime === 0) {
            try {
                await userStore.getUserInfoAction()
            } catch (err) {
                next()
                return
            }
        }
        if (permissionStore.getIsDynamicAddedRoute) {
            next()
            return
        }
        const routes = await permissionStore.buildRoutesAction()
        routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw)
        })
        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)

        permissionStore.setDynamicAddedRoute(true)
        if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
            next({ path: to.fullPath, replace: true, query: to.query })
        } else {
            const redirectPath = (from.query.redirect || to.path) as string
            const redirect = decodeURIComponent(redirectPath)
            const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
            next(nextData)
        }
    })
}
