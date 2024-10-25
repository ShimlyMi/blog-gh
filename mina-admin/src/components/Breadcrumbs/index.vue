<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {RouteLocationMatched, useRoute, useRouter} from "vue-router";
import {findRouteByPath, getParentPaths} from "@/router/utils";

defineProps({
    items: {
      type: Array,
      default: () => []
    }
})
const route = useRoute()
const router = useRouter()
const levelList = ref([]);
const routes: any = router.options.routes

const getBreadcrumb = (): void => {
  let currentRoute = findRouteByPath(router.currentRoute.value.path, routes)
  // console.log(currentRoute)
  const parentRoutes = getParentPaths(
    router.currentRoute.value.name as string,
    routes,
    "name"
  )
  // console.log("parentRoutes", parentRoutes)
  const matched = []
  parentRoutes.forEach(path => {
    if (path !== '/') matched.push(findRouteByPath(path, routes))
  })
  matched.push(currentRoute)
  matched.forEach((item, index) => {
    if (currentRoute?.query || currentRoute?.params) return
    if (item?.children) {
      item?.children.forEach(v => {
        if (v?.meta?.title == item?.meta?.title) {
          matched.splice(index, 1)
        }
      })
    }
  })
  levelList.value = matched.filter(
    item => item?.meta && item?.meta?.title !== false && item?.meta?.showLink !== false
  )
  // console.log(levelList)
}

const handleLink = (item: RouteLocationMatched): void => {
  const {redirect, path} = item;
  if (redirect) {
    router.push(redirect as any);
  } else {
    router.push(path);
  }
};
onMounted(() => {
  getBreadcrumb()
})

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  {
    deep: true
  }
)
</script>

<template>
  <v-breadcrumbs>
    <transition-group>
      <v-fade-transition>
        <v-breadcrumbs-item
          v-for="item in levelList"
          :key="item.path"
          :to="item.path"
        >
          <v-icon v-if="item?.meta?.icon">{{ item?.meta?.icon }}</v-icon>
          <span>{{ item?.meta?.title }}</span>
        </v-breadcrumbs-item>
      </v-fade-transition>
    </transition-group>
  </v-breadcrumbs>
</template>
<style scoped lang="less">

</style>
