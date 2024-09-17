<script setup lang="ts" name="Header">
  // import { useRouter } from 'vue-router'
  //
  // const router = useRouter()
  //
  // const path = []
  // const fil = router.getRoutes()
  // fil.forEach(item => {
  //   if (path.find(i => i.path === item.path) === undefined) {
  //     path.push(item)
  //   }
  // })
  // console.log('fil', fil)
  // console.log(path)
</script>

<template>
  <v-app-bar app class="mi-header" :elevation="1" title="header">
    <template #append>
      <v-btn icon="mdi-magnify" />
      <v-btn icon="mdi-white-balance-sunny" />
      <v-btn icon="mdi-bell-outline" />
      <v-btn id="userInfoBtn">
        <v-menu activator="#userInfoBtn">

        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>
</template>
<style scoped lang="less">

</style>
