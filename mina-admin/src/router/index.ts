import {createRouter, createWebHistory, RouteComponent, Router, RouteRecordRaw} from "vue-router";
import remainingRouter from "./modules/remaining";
import {App} from "vue";
import {ascending, formatFlatteningRoutes, formatTwoStageRoutes, getTopMenu} from "@/router/permission";
import {buildHierarchyTree} from "@/utils/tree";
import {usePermissionStoreHook} from "@/stores/permission";

const modules = import.meta.glob(
  ['./modules/**/**.ts', '!./modules/**/remaining.ts'],
  { eager: true }
)
const menus = []

Object.keys(modules).forEach((key) => {
    menus.push(modules[key].default)
})
// console.log(menus)
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
    formatFlatteningRoutes(buildHierarchyTree(ascending(menus)))
)

console.log(constantRoutes)
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    strict: true,
    routes: constantRoutes.concat(...(remainingRouter as any)),
    scrollBehavior: () => ({ left: 0, top: 0 })
})

// console.log(constantRoutes)
/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = ascending(menus).concat(
  ...remainingRouter
);
// console.log(constantMenus)
// console.log(constantMenus.concat(...(remainingRouter as any)))

/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(remainingRouter).map(v => {
  return remainingRouter[v].path;
});




function initRouter() {
  return new Promise(resolve => {
    // 初始化路由
    usePermissionStoreHook().handleWholeMenus([]);
    resolve(router);
  });
}
//
router.beforeEach((to: ToRouteType, _from, next) => {
  initRouter().then(r => r.path)
  // console.log(routerList)
  next()
})

// router.afterEach((to) => {  })

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
export default router
