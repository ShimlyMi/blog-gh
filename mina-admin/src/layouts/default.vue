<template>
  <v-layout :class="['rounded','rounded-md','mi-layout']">
    <Side :is-open="drawerOpen" @update:isOpen="drawerOpen = $event"/>
    <Header :is-open="drawerOpen" @update:isOpen="drawerOpen = $event"/>
    <Main />
  </v-layout>
</template>

<script lang="ts" setup>
  //
  import { ref } from 'vue'
  import Header from './default/header/index.vue'
  // import Tabs from '@/components/Tabs/index.vue'
  import Side from './default/sider/index.vue'
  import Main from './default/main/index.vue'
  // import Breadcrumbs from '@/components/breadcrumbs/index.vue'
  const drawerOpen = ref(false);
</script>
<style lang="scss" scoped>
//.layout-theme-dark {
//  background-color: var(--v-theme-surface);
//}

</style>
