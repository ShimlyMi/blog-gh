<script setup lang="ts" name="Side">
import {onMounted, ref } from "vue";
import {useGo} from "@/hooks/usePage";
import MenuGroup from "@/layouts/default/sider/menuGroup.vue";
import {useRouter} from "vue-router";
import {filterTree} from "@/router/permission";
import {usePermissionStoreHook} from "@/stores/permission";
import {constantMenus} from "@/router";

const rail = ref(false)
  function toggleMenu () {
    rail.value = !rail.value
  }
const menus = filterTree(constantMenus)
console.log(menus)

</script>

<template>
  <v-navigation-drawer :rail="rail">
    <menu-group :menus="menus" />
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
