<script setup lang="ts" name="Side">
import { ref } from "vue";
import MenuGroup from "@/layouts/default/sider/menuGroup.vue";
const rail = ref(false)
const drawer = ref(true)
</script>

<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" class="mi-side" app>
    <menu-group />
    <v-btn
      variant="text"
      @click="rail = !rail"
      :prepend-icon="rail === true ? 'mdi-menu-close' : 'mdi-menu-open'" />
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.mi-side {
  height: 100%;
}
</style>
