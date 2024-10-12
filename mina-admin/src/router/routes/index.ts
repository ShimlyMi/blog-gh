import type { AppRouteRecordRaw, AppRouteModule } from "@/router/types";
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "@/router/routes/basic";
import { BasicPageEnum } from "@/enums/pageEnum";

const modules = import.meta.glob(',/modules/**/*.ts', { eager: true })
const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
})

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]

export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: BasicPageEnum.BASE_HOME,
    meta: {
        title: 'Root'
    }
}

export const LoginRoot: AppRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/system/login/Login.vue'),
    meta: {
        title: '登录'
    }
}

export const basicRoutes = [LoginRoot, RootRoute, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE]
