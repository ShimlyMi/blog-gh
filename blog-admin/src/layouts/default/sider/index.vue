<script setup lang="ts" name="Side">
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const route = router.currentRoute.value

  const path = []
  const fil = router.getRoutes()
  fil.forEach(item => {
    if (path.find(i => i.meta.title === route.meta.title && i.path === item.path) === undefined) {
      path.push(item)
    }
  })
  console.log('fil', fil)
  console.log(path)
</script>

<template>
  <v-navigation-drawer>
<!--    <v-list-item v-for="(item, index) in path" :key="index" :value="index">-->
<!--      <v-list-item-title>{{ item. mata.title }}</v-list-item-title>-->
<!--    </v-list-item>-->
  </v-navigation-drawer>
</template>

<style scoped lang="less">

</style>
