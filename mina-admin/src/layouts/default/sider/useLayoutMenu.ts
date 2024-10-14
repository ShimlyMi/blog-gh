import {ref, unref, watch} from "vue";
import {useRouter} from "vue-router";
import {usePermissionStore} from "@/stores/permission";
import {getChildrenMenus, getCurrentParentPath} from "@/router/menus";
import { Menu } from "@/router/types";

export function useLayoutMenu() {
    const menusRef = ref<Menu[]>([])
    const { currentRoute } = useRouter()
    const permissionStore = usePermissionStore()

    watch(
        [() => unref(currentRoute).path],
        async (path: string) => {
            const { meta } = unref(currentRoute)
            const currentActiveMenu = meta.currentActiveMenu as string
            let parentPath = await getCurrentParentPath(path)
            if (!parentPath) {
                parentPath = await getCurrentParentPath(currentActiveMenu)
            }
            parentPath && await handleSplitLeftMenu(parentPath)
        },
        {
            immediate: true
        }
    )
    watch(
        [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getFrontMenuList],
        () => getMenus(),
        { immediate: true }
    )

    async function handleSplitLeftMenu(parentPath: string) {
        const children = await getChildrenMenus(parentPath)
        if (!children || !children.length) {
            menusRef.value = []
            return
        }
        menusRef.value = children
    }

    async function getMenus() {
        menusRef.value = await getMenus()
        console.log("menusRef", menusRef.value)
    }

    return { menusRef }
}
