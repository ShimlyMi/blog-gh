import {defineStore} from "pinia"
import type {AppRouteRecordRaw, Menu} from "@/router/types"
import {useUserStore} from "@/stores/user";
import { BasicPageEnum } from "@/enums/pageEnum";
import { PermissionModeEnum } from "@/enums/roleEnum";
import {flatMultiLevelRoutes} from "@/router/helper/routeHelper";
import {filter} from "@/utils/treeHelper/treeHelper";
import {transformRouteToMenu} from "@/router/helper/menuHelper";
import {asyncRoutes} from "@/router/routes";

interface PermissionState {
  // Permission code list
  // 权限代码列表
  permCodeList: string[] | number[]
  // Whether the route has been dynamically added
  // 路由是否动态添加
  isDynamicAddedRoute: boolean
  // To trigger a menu update
  // 触发菜单更新
  lastBuildMenuTime: number
  // Backstage menu list
  // 后台菜单列表
  backMenuList: Menu[]
  // 菜单列表
  frontMenuList: Menu[]
}

export const usePermissionStore = defineStore({
  id: 'mina-permission',
  state: () =>({
    // Whether the route has been dynamically added
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // To trigger a menu update
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // Backstage menu list
    // 后台菜单列表
    backMenuList: [],
    // menu List
    // 菜单列表
    frontMenuList: [],
  }),
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
    getLastBuildMenuTime(): number {
      return this.getLastBuildMenuTime
    }
  },
  actions: {
    /** 组装整体路由生成的菜单 */
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },
    setLastBuildMenuTime() {
      this .lastBuildMenuTime = new Date().getTime()
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    async buildRoutesAction() {
      const userStore = useUserStore()
      let routes: AppRouteRecordRaw[] = []
      const roleList = toRaw(userStore.getRoleList) || []
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { role } = meta || {}
        if (!role) return true
        return roleList.some((r) => r.includes(role))
      }
      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }
      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string = userStore.getUserInfo.homePath || BasicPageEnum.BASE_HOME
        const permissionMode = PermissionModeEnum
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }

        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }

      switch (permissionMode) {
          // 角色权限
        case PermissionModeEnum.ROLE:
          // 对非一级路由进行过滤
          routes = filter(asyncRoutes, routeFilter)
          // 对一级路由根据角色权限过滤
          routes = routes.filter(routeFilter)
          // Convert multi-level routing to level 2 routing
          // 将多级路由转换为 2 级路由
          routes = flatMultiLevelRoutes(routes)
          break

          // 路由映射， 默认进入该case
        case PermissionModeEnum.ROUTE_MAPPING:
          // 对非一级路由进行过滤
          routes = filter(asyncRoutes, routeFilter)
          // 对一级路由再次根据角色权限过滤
          routes = routes.filter(routeFilter)
          // 将路由转换成菜单
          // eslint-disable-next-line no-case-declarations
          const menuList = transformRouteToMenu(routes, true)
          // 移除掉 ignoreRoute: true 的路由 非一级路由
          routes = filter(routes, routeRemoveIgnoreFilter)
          // 移除掉 ignoreRoute: true 的路由 一级路由；
          routes = routes.filter(routeRemoveIgnoreFilter)
          // 对菜单进行排序
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })

          // 设置菜单列表
          this.setFrontMenuList(menuList)

          // Convert multi-level routing to level 2 routing
          // 将多级路由转换为 2 级路由
          routes = flatMultiLevelRoutes(routes)
          break

      }

      patchHomeAffix(routes)
      return routes
    }
  }
})

export function usePermissionStoreHook() {
  return usePermissionStore()
}
