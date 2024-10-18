<script setup lang="ts">
  defineExpose({
    name: [],
  })
</script>

<template>
  <v-breadcrumbs :items="['name1', 'name2']">
    <template #prepend>
      <v-icon icon="mdi-home" />
    </template>
  </v-breadcrumbs>
</template>
<style scoped lang="less">

</style>
