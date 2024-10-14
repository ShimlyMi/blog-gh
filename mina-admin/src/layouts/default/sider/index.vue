<script setup lang="ts" name="Side">
import {ref, unref, watch} from "vue";
import { Menu } from "@/router/types";
import { useRouter } from "vue-router";
import { usePermissionStore } from "@/stores/permission";
import { getChildrenMenus, getCurrentParentPath, getMenus } from "@/router/menus";
import {useGo} from "@/hooks/usePage";

const rail = ref(false)
  function toggleMenu () {
    rail.value = !rail.value
  }
const menusRef = ref<Menu[]>([])
const { currentRoute } = useRouter()
const permissionStore = usePermissionStore()
const go = useGo()
watch(
    [() => unref(currentRoute).path],
    async ([path]: [string]) => {
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
    () => getMenu(),
    { immediate: true }
)

async function handleSplitLeftMenu(parentPath: string) {
  const children = await getChildrenMenus(parentPath)
  console.log("children", children)
  if (!children || !children.length) {
    menusRef.value = []
    return
  }
  menusRef.value = children
}

async function getMenu() {
  menusRef.value = await getMenus()
  console.log("menusRef", menusRef.value)
}

/**
 * click menu
 * @param menu
 */

function handleMenuClick(path: string) {
  go(path)
}

</script>

<template>
  <v-navigation-drawer :rail="rail">

    <v-list-item>
      <v-btn v-if="rail" block @click="toggleMenu">
        <v-icon icon="mdi-menu-close" />
      </v-btn>
      <v-btn v-else block @click="toggleMenu">
        <v-icon icon="mdi-menu-open" />
      </v-btn>
    </v-list-item>
  </v-navigation-drawer>
</template>

<style scoped lang="less">

</style>
