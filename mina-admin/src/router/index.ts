import { createRouter, createWebHistory } from "vue-router";
import { App } from "vue";
import { constantRoutes } from "@/router/routes";
import NProgress from '@/utils/progress'
import {useUserStoreHook} from "@/stores/user";
import {getToken} from "@/utils/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
    strict: true,
    routes: constantRoutes as any,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

/** 路由白名单 */
const whiteList = ["/login", "/register"];
// const { VITE_HIDE_HOME } = import.meta.env

router.beforeEach((to: ToRouteType, _from, next) => {
  // 开启隐藏首页后在浏览器地址栏手动输入首页welcome路由则跳转到404页面
  const token = getToken()
  NProgress.start()
  if (token) {
    // if (VITE_HIDE_HOME === "true" && to.fullPath === "/home") {
    //   next({ path: "/404" });
    // }
    toCorrectRoute()
  } else {
    if (to.path !== '/login') {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  }
  /** 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面 */
  function toCorrectRoute() {
    whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
  }
})

router.afterEach(() => {
  NProgress.done()
})
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
export default router
