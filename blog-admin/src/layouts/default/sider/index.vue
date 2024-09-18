<script setup lang="ts" name="Side">
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const path: any[] = []
  const fil = router.getRoutes()
  fil.forEach(r => {
    if (typeof r.name === 'string' && !r.name.includes('/')) {
      path.push(r)
    }
  })
</script>

<template>
  <v-navigation-drawer>
    <v-list-item
      v-for="(item, index) in path"
      :key="index"
      color="#b9b9df"
      link
      :title="item.meta.title"
      :to="item.path"
      :value="index"
    >
      <!--      <v-list-item-title>{{ item.meta.title }}</v-list-item-title>-->
    </v-list-item>
  </v-navigation-drawer>
</template>

<style scoped lang="less">

</style>
