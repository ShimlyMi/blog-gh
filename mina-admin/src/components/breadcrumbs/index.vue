<script setup lang="ts">
  defineExpose({
    name: [],
  })
</script>

<template>
  <v-breadcrumbs :items="name">
    <template #prepend>
      <v-icon icon="mdi-home" />
    </template>
  </v-breadcrumbs>
</template>
<style scoped lang="less">

</style>
