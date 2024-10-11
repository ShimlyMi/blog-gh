import {defineStore} from "pinia";
import { constantsMenus } from "@/router";
import {ascending, filterNoPermissionTree, filterTree} from "@/router/utils";

export const usePermissionStore = defineStore({
  id: 'mina-permission',
  state: () =>({
    // 静态路由生成的菜单
    constantsMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 缓存页面keepAlive
    cachePageList: []
  }),
  actions: {
    /** 组装整体路由生成的菜单 */
    // handleWholeMenus(routes: any[]) {
    //   this.wholeMenus = filterNoPermissionTree(filterTree(ascending(this.constantsMenus.concat(routes))))
    // },
  }
})

export function usePermissionStoreHook() {
  return usePermissionStore()
}
