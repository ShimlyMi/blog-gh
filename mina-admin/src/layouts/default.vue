<template>
  <v-layout :class="['rounded','rounded-md','mi-layout']">
    <Header />
    <Side />
<!--    <div>-->
<!--      <Breadcrumbs />-->
<!--    </div>-->
    <Main />
  </v-layout>
</template>

<script lang="ts" setup>
  //
  import Header from './default/header/index.vue'
  // import Tabs from '@/components/Tabs/index.vue'
  import Side from './default/sider/index.vue'
  import Main from './default/main/index.vue'
  // import Breadcrumbs from '@/components/breadcrumbs/index.vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()
</script>
<style lang="scss" scoped>
//.layout-theme-dark {
//  background-color: var(--v-theme-surface);
//}

</style>
