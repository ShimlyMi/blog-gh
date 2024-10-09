import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {usePermissionStoreHook} from "@/stores/permission";
import {computed} from "vue";
import {useUserStoreHook} from "@/stores/user";
import {remainingPaths} from "@/router";

const errorInfo = '当前路由配置不正确，请检查配置'

export function useNav() {
  const route = useRoute()
  const routers = useRouter().options.routes
  const { wholeMenus } = storeToRefs(usePermissionStoreHook())

  /** 用户信息 */
  const username = computed(() => {
    return useUserStoreHook()?.username
  })
  const nickname = computed(() => {
    return useUserStoreHook()?.getNickname
  })
  const avatar = computed(() => {
    return useUserStoreHook()?.getAvatar
  })
  const userId = useUserStoreHook()?.getUserId
  const role = computed(() => {
    return useUserStoreHook()?.role
  })

  /** 退出登录 */
  function logOut() {
    return useUserStoreHook().logout
  }
  function resolvePath(route) {
    if (!route.children) return console.error(errorInfo);
    const httpReg = /^http(s?):\/\//;
    const routeChildPath = route.children[0]?.path;
    if (httpReg.test(routeChildPath)) {
      return route.path + "/" + routeChildPath;
    } else {
      return routeChildPath;
    }
  }
  /** 判断路径是否参与菜单 */
  function isRemaining(path: string) {
    return remainingPaths.includes(path)
  }

  return {
    route,
    routers,
    wholeMenus,
    username,
    nickname,
    avatar,
    userId,
    role,
    logOut,
    isRemaining,
    resolvePath
  }
}
