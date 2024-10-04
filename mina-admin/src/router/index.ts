/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import BasicRoutes from '@/router/modules/basic'
import { formatFlatteningRoutes, formatTwoStageRoutes} from "@/router/utils";


const modules: Record<string, any> = import.meta.glob([
  "./modules/**/*.ts", "!./modules/**/basic.ts",
], { eager: true })
const routes = []
Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
})
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(routes);
/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(BasicRoutes).map(v => {
  return BasicRoutes[v].path;
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes.concat(...(remainingPaths as any)),
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
const whiteList = ["/login", "/register"];
const { VITE_HIDE_HOME } = import.meta.env
router.beforeEach( (to: ToRouteType, _from, next) => {
  const userInfo = storageSession.getItem<DataInfo<number>>(USER_INFO_KEY);
  if (!to.matched.length) {
    next('/error/404')
  }
  if (userInfo) {
    // 无权限跳转403页面
    // if (to.meta?.role) {
    //   next({ path: "/error/403" });
    // }
    // 开启隐藏首页后在浏览器地址栏手动输入首页welcome路由则跳转到404页面
    if (VITE_HIDE_HOME === 'true' && to.fullPath === '/home') {
      next({path: '/error/404'})
    }
    if (_from?.name) {
      toCurrentRoute()
    } else {
      if (to.path !== '/login') {
        initRouter().then((router: Router) => {
          // 确保动态路由完全加入路由列表并且不影响静态路由（注意：动态路由刷新时router.beforeEach可能会触发两次，第一次触发动态路由还未完全添加，第二次动态路由才完全添加到路由列表，如果需要在router.beforeEach做一些判断可以在to.name存在的条件下去判断，这样就只会触发一次）
          router.push(to.fullPath)
        })
      }
      toCurrentRoute()
    }
  } else if (to.path !== '/login') {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
  function toCurrentRoute() {
    whiteList.includes(to.fullPath) ? next(_from?.fullPath) : next()
  }
})
export default router
