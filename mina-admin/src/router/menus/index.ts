import { Menu, MenuModule } from "@/router/types";
import { PermissionModeEnum } from "@/enums/roleEnum";
import { getAllParentPath, transformMenuModule } from "@/router/helper/menuHelper";
import { usePermissionStore} from "@/stores/permission";
import router from "@/router";
import { filter } from "@/utils/treeHelper/treeHelper";
import { RouteRecordNormalized } from "vue-router";
import { isUrl } from "@/utils/is";
import { pathToRegexp } from "path-to-regexp";

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
const menuModules: MenuModule[] = []
Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    menuModules.push(...modList)
})

const getPermissionMode = () => {
    const permission = PermissionModeEnum
    return permission
}
const isRouteMappingMode = () => {
    return getPermissionMode().ROUTE_MAPPING
}
const isRoleMode = () => {
    return getPermissionMode().ROLE
}

const staticMenus: Menu[] = []
;(() => {
    menuModules.sort((a, b) => {
        return (a.orderNo || 0) - (b.orderNo || 0)
    })
    for (const menu of menuModules) {
        staticMenus.push(transformMenuModule(menu))
    }
})()

async function getAsyncMenus() {
    const permissionStore = usePermissionStore()
    if (isRouteMappingMode()) {
        return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu)
    }
    return staticMenus
}

export const getMenus = async (): Promise<Menu[]> => {
    const menus = await getAsyncMenus()
    if (isRoleMode()) {
        const routes = router.getRoutes()
        return filter(menus, basicFilter(routes))
    }
    return menus
}

export async function getCurrentParentPath(currentPath: string) {
    const menus = await getAsyncMenus()
    const allParentPath = getAllParentPath(menus, currentPath)
    return allParentPath?.[0]
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<Menu[]> {
    const menus = await getAsyncMenus()
    const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }))
    if (isRoleMode()) {
        const routes = router.getRoutes()
        return shallowMenuList.filter(basicFilter(routes))
    }
    return shallowMenuList
}
// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
    const menus = await getMenus()
    const parent = menus.find((item) => item.path === parentPath)
    if (!parent || !parent.children || !parent?.meta?.hideChildrenInMenu) {
        return [] as Menu[]
    }
    if (isRoleMode()) {
        const routes = router.getRoutes()
        return filter(parent.children, basicFilter(routes))
    }
    return parent.children
}

function basicFilter(routes: RouteRecordNormalized[]) {
    return (menu: Menu) => {
        const matchRoute = routes.find((r) => {
            if (isUrl(menu.path)) return true
            const { regexp  } = pathToRegexp(r.path)
            if (r.meta?.carryParam) {
                return regexp.test(menu.path)
            }
            const isSame = r.path === menu.path
            if (!isSame) return false
            if (r.meta?.ignoreAuth) return true
            return  isSame || regexp.test(menu.path)
        })
        if (!matchRoute) return false
        menu.icon = (menu.icon || matchRoute.meta.icon) as string
        menu.meta = matchRoute.meta
        return true
    }
}
