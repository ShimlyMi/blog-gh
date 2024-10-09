/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router'
import NProgress from '@/utils/progress/index'
import {DataInfo, sessionKey} from '@/utils/auth'
import {formatFlatteningRoutes, formatRoutes, ascending, initRouter} from "@/router/utils";
import {buildHierarchyTree} from "@/utils/tree";
import basicRoutes from "@/router/modules/basic";
import {storageSession} from "@/interface/session";
import {getConfig} from "@/config";
import {usePermissionStoreHook} from "@/stores/permission";


const modules: Record<string, any> = import.meta.glob([
  "./modules/**/*.ts", "!./modules/**/basic.ts",
], { eager: true })

const routes = []
Object.keys(modules).forEach(key => {
  routes.push(modules[key].default)
})

console.log(routes)

/** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
)
console.log(constantRoutes)
/** 用于渲染菜单，保持原始层级 */
export const constantsMenus: Array<RouteRecordRaw> = ascending(routes).concat(...basicRoutes)

/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(basicRoutes).map(v => {
  return basicRoutes[v].path
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes.concat(...(basicRoutes as any)),
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  }
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
// const whiteList = ["/login", "/register"];
// const { VITE_HIDE_HOME } = import.meta.env
// router.beforeEach((to: ToRouteType, _from, next) => {
//   const userInfo = storageSession.getItem<DataInfo<number>>(sessionKey)
//   NProgress.start()
//   if (userInfo) {
//     // 无权限跳转403页面
//     if (to.meta?.role) {
//       next({ path: "/error/403" });
//     }
//     // 开启隐藏首页后在浏览器地址栏手动输入首页welcome路由则跳转到404页面
//     if (VITE_HIDE_HOME === 'true' && to.fullPath === '/home') {
//       next({ path: '/error/404' })
//     }
//     if (_from?.name) {
//       toCorrectRoute()
//     } else {
//       if (
//         usePermissionStoreHook().wholeMenus.length === 0 && to.path !== '/login'
//       ) {
//         initRouter().then((router: Router) => {
//           router.push(to.fullPath)
//         })
//       }
//       toCorrectRoute()
//     }
//   } else {
//     if (to.path !== '/login') {
//       if (whiteList.indexOf(to.path) !== -1) {
//         next()
//       } else {
//         next({ path: '/login' })
//       }
//     } else {
//       next()
//     }
//   }
//
//
//   /** 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面 */
//   function toCorrectRoute() {
//     whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
//   }
// })
// router.afterEach(() => {
//   NProgress.done();
// })

export default router
