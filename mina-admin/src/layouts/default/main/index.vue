<script setup lang="ts" name="MainLayout">
  import { getTransitionName } from './transition'

</script>

<template>
  <v-main class="mi-main">
    <RouterView>
      <template #default="{ Component, route }">
        <transition appear mode="out-in" :name="getTransitionName(route)">
          <div :key="route.name">
            <component :is="Component" :key="route.fullPath" />
          </div>
        </transition>
      </template>
    </RouterView>
  </v-main>
</template>
