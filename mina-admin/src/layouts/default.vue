<template>
  <v-layout :class="['rounded','rounded-md','mi-layout', theme.global.current.value.dark ? 'layout-theme-dark' : '']">
    <Header />
    <Side />
    <Main />
    <!--    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">-->
    <!--      Main Content-->
    <!--    </v-main>-->
  </v-layout>
</template>

<script lang="ts" setup>
  //
  import Header from './default/header/index.vue'
  import Side from './default/sider/index.vue'
  import Main from './default/main/index.vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()
</script>
<style lang="scss" scoped>
.layout-theme-dark {
  background-color: var(--v-theme-surface);
}
</style>
