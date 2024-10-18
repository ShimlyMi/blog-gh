<script setup lang="ts" name="Side">
import { ref } from "vue";
import MenuGroup from "@/layouts/default/sider/menuGroup.vue";
import {ascending, filterTree} from "@/router/permission";
import {constantMenus} from "@/router";

const rail = ref(false)
const drawer = ref(true)
  function toggleMenu () {
    rail.value = !rail.value
  }
const menus = filterTree(ascending(constantMenus))
console.log(menus)

</script>

<template>
  <v-navigation-drawer app>
    <menu-group :menus="menus" />
  </v-navigation-drawer>
</template>

<style scoped lang="less">

</style>
