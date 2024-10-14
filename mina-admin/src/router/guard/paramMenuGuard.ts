import { Router } from "vue-router";
import {usePermissionStoreHook} from "@/stores/permission";
import {Menu} from "@/router/types";
import {PermissionModeEnum} from "@/enums/roleEnum";
import {configureDynamicParamsMenu} from "@/router/helper/menuHelper";

export function createParamMenuGuard(router: Router) {
    const permissionStore = usePermissionStoreHook()
    router.beforeEach(async (to, _from, next) => {
        if (!to.name) {
            next()
            return
        }
        if (!permissionStore.getIsDynamicAddedRoute) {
            next()
            return
        }
        let menus: Menu[] = []
        if (isRouteMappingMode()) {
            menus = permissionStore.setFrontMenuList()
        }
        menus.forEach((item) => configureDynamicParamsMenu(item, to.params))
        next()
    })
}
const getPermissionMode = () => {
    const permission = PermissionModeEnum
    return permission
}
const isRouteMappingMode = () => {
    return getPermissionMode().ROUTE_MAPPING
}