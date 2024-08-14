<script setup>
  import Header from './header/index.vue'
</script>
<template>
  <v-app class="mi-layout">
    <Header />
    <router-view />
  </v-app>
</template>

<style lang="scss" scoped>
@include b(mi-layout) {
  @include bfc;
  overflow: hidden;
}
</style>
