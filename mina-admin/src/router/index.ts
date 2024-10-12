/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory, Router} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from '@/utils/progress/index'
import { basicRoutes } from "@/router/routes";

const whiteNameList: string[] = []
const getRouteNames = (array: any[]) => {
  array.forEach((item) => {
    whiteNameList.push(item.name)
      getRouteNames(item.children || [])
  })
}
getRouteNames(basicRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})


/** 路由白名单 */
const whiteList = ["/login", "/register"];
const { VITE_HIDE_HOME } = import.meta.env
router.beforeEach((to: ToRouteType, _from, next) => {
  const userInfo = sessionStorage.getItem(sessionKey)
    console.log('route', userInfo)
  NProgress.start()
  if (userInfo) {
    // 无权限跳转403页面
    if (to.meta?.role) {
      next({ path: "/error/403" });
    }
    // 开启隐藏首页后在浏览器地址栏手动输入首页welcome路由则跳转到404页面
    if (VITE_HIDE_HOME === 'true' && to.fullPath === '/home') {
      next({ path: '/error/404' })
    }
    if (_from?.name) {
      toCorrectRoute()
    } else {
      if (
        to.path !== '/login'
      ) {
        initRouter().then((router: Router) => {
          router.push(to.fullPath)
        })
      }
      toCorrectRoute()
    }
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
  NProgress.done();
})

export default router
