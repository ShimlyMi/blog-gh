<script setup lang="ts">

// const props = defineProps({
//   multiple: {
//     type: Boolean,
//     default: false
//   },
//   tabs: {
//     type: Array,
//   },
//   items: {
//     type: Array,
//   },
// })
const tab = 'tab-1'
const chip = true
</script>

<template>
  <v-tabs
      v-model="tab"
      bg-color="primary"
  >
    <v-tab value="one">Item One</v-tab>
    <v-tab value="two">Item Two</v-tab>
    <v-tab value="three">Item Three</v-tab>
  </v-tabs>
  <v-chip
      v-if="chip"
      class="ma-2"
      closable
      @click:close="chip = false"
  >
    Closable
  </v-chip>
</template>

<style scoped lang="less">

</style>
