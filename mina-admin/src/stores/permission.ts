import {defineStore} from "pinia"
import type { Menu } from "@/router/types"

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
    // 权限代码列表
    permCodeList: [],
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
    getPermCodeList(): string[] | number[] {
      return this.permCodeList
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
    // handleWholeMenus(routes: any[]) {
    //   this.wholeMenus = ascending(this.constantsMenus.concat(routes))
    //     console.log("this.wholeMenus", this.wholeMenus)
    //     console.log("routes", routes)
    // },
  }
})

export function usePermissionStoreHook() {
  return usePermissionStore()
}
