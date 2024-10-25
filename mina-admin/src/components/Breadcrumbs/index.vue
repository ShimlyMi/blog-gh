<script setup lang="ts">
  defineProps({
    items: {
      type: Array,
      default: () => []
    }
  })
</script>

<template>
  <v-breadcrumbs :items="items">
    <template v-slot:prepend>
      <v-icon icon="icon" size="small"></v-icon>
    </template>
  </v-breadcrumbs>
</template>
<style scoped lang="less">

</style>
