<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import {menuType} from "@/layouts/types";
import * as path from "path";

const props = defineProps({
  item: {
    type: Object as PropType<menuType>,
  },
  basePath: {
    type: String,
    default: ''
  }
})
const onlyOneChild: menuType = ref(null);

function hasOneShowingChild(children: menuTypep[] = [], parent: menuType) {
  const showingChildren = children.filter((item: any) => {
    onlyOneChild.value = item
    return true
  })
  if (showingChildren[0]?.meta?.showParent) {
    return false
  }
  if (showingChildren.length === 1) {
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true }
  }
  return false
}
function resolvePath(routePath) {
  const httpReg = /^http(s?):\/\//;
  if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
    return routePath || props.basePath;
  } else {
    // 使用path.posix.resolve替代path.resolve 避免windows环境下使用electron出现盘符问题
    return path.posix.resolve(props.basePath, routePath);
  }
}
</script>

<template>
  <v-list-item
    v-if="hasOneShowingChild(props.item.children, props.item) &&
    (!onlyOneChild.children || onlyOneChild.noShowingChildren)"
    link
    :to="resolvePath(onlyOneChild.path)"
    :prepend-icon="props.item.meta.icon"
    :title="props.item.meta.title"
  ></v-list-item>
  <v-list-group v-else>
    
  </v-list-group>
</template>

<style scoped lang="less">

</style>
