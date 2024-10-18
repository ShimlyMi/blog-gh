<script setup lang="ts">

import {useNav} from "@/hooks/useNav";

import {menuType} from "@/layouts/types";
import {filterHomeTree} from "@/router/permission";
import {RouteRecordRaw} from "vue-router";

defineOptions({
  name: 'MenuGroup',
})

const props = defineProps({
    menus: {
        type: Object as PropType<menuType>
    }
})
console.log(props.menus)
const hasChildren = (route: { children?: Array<{ path: string; name: string }> }) => {
  return route.children && route.children.length > 0;
};
const homePath: RouteRecordRaw[] = []

const filterHomeRoute = filterHomeTree(props.menus)
</script>

<template>
  <v-list
      :lines="false"
      density="compact">
    <v-list>
      <v-list-item
          link
          prepend-icon="mdi-home"
          title="主页"
          to="/"
      ></v-list-item>
    </v-list>
    <v-list v-for="(route, i) in filterHomeRoute" :key="i">
      <v-list-item v-if="!route.children" :value="route" :prepend-icon="route.meta.icon">
        <v-list-item-title>
          {{ route.meta.title }}
        </v-list-item-title>
      </v-list-item>
      <v-list-group v-else :value="route.meta.title">
        <template #activator="{ props }">
          <v-list-item
              v-bind="props"
              :title="route.meta.title"
              :prepend-icon="route.meta.icon"
          ></v-list-item>
        </template>
        <v-list-item
            v-bind="props"
            link v-for="routeChildren in route.children"
            :key="routeChildren.path"
            :to="routeChildren.path"
            :title="routeChildren.meta.title"
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-list>
</template>

<style scoped lang="less">

</style>
