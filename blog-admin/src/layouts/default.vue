<template>
  <v-layout class="rounded rounded-md mi-layout">
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
</script>
<style lang="scss" scoped>

</style>
