<script setup lang="ts" name="Side">
import MenuGroup from "@/layouts/default/sider/menuGroup.vue";

</script>

<template>
  <v-navigation-drawer class="mi-side" app>
    <menu-group />
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.mi-side {
  height: 100%;
}
</style>
