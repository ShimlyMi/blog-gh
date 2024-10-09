<script setup lang="ts" name="Side">
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import {menuType} from "@/layouts/types";

  const props = defineProps({
    item: {
      type: Object as PropType<menuType>,
    },
    basePath: {
      type: String,
      default: ''
    }
  })
  const rail = ref(false)
  function toggleMenu () {
    rail.value = !rail.value
  }

  const router = useRouter()
  const path = []
  const fil = router.getRoutes()

  fil.forEach(r => {
    if (typeof r.name === 'string' && !r.name.includes('/') && r.meta.showLink !== false) {
      path.push(r)
    }
  })
  console.log(path)

</script>

<template>
  <v-navigation-drawer :rail="rail">
    <v-list>
      <v-list-group></v-list-group>
    </v-list>
    <v-list-item
      v-for="(item, index) in path"
      :key="index"
      color="#b9b9df"
      link
      :prepend-icon="item.meta.icon"
      :title="item.meta.title"
      :to="item.path"
      :value="index"
    >
      <!--      <v-list-item-title>{{ item.meta.title }}</v-list-item-title>-->
    </v-list-item>
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
