<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps({
  talkList: []
})

// watch(() => props.talkList)
</script>

<template>
  <v-card>
    <v-card-item>
      <div>header</div>
      <div>content</div>
    </v-card-item>
  </v-card>
</template>

<style scoped lang="less">

</style>
