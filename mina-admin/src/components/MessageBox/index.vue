<script setup lang="ts">
defineProps({
  message: {
    type: String
  }
})
</script>

<template>
  <v-messages :messages="message">{{ message }}</v-messages>
</template>

<style scoped>

</style>
