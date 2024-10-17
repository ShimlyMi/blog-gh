import {defineStore} from "pinia";
import {constantMenus} from "@/router";
import {ascending, filterTree} from "@/router/permission";

export const usePermissionStore = defineStore({
  id: "mina-permission",
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
  }),
  getters: {
    getMenus() {
      this.wholeMenus = filterTree(constantMenus)
    }
  },
  actions: {
    handleWholeMenus(routes: any[]) {
      this.wholeMenus = filterTree(ascending(this.constantMenus.concat(routes)))
      return this.wholeMenus
    }
  }
})

export function usePermissionStoreHook() {
  return usePermissionStore();
}
