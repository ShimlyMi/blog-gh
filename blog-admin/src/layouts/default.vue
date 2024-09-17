<template>
  <v-layout class="rounded rounded-md">
    <Header />
    <Side />
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  //
  import Header from './default/header/index.vue'
  import Side from './default/sider/index.vue'
</script>
