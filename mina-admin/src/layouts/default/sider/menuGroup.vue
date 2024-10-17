<script setup lang="ts">

import {useNav} from "@/hooks/useNav";

import {menuType} from "@/layouts/types";

defineOptions({
  name: 'MenuGroup',
})

const props = defineProps({
    menus: {
        type: Object as PropType<menuType>
    }
})
console.log(props.menus)

</script>

<template>
  <v-list nav>
    <div v-for="(route, index) in menus" :key="index">
      <v-list-item
          link
          v-if="!route.children"
          :to="route.path"
          ripple="ripple"
          :prepend-icon="route.meta.icon || route.meta.title.substring(0,1)"
      >
        <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
      </v-list-item>
      <v-list-group v-else :prepend-icon="route.meta.icon">
        <v-list-item
            link
            :to="route.path"
            ripple="ripple">
          {{ route.meta.title }}
        </v-list-item>
      </v-list-group>
    </div>
  </v-list>
</template>

<style scoped lang="less">

</style>
