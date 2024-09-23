<script setup lang="ts">
defineProps({
  title: () => {
    return {
      type: String,
      required: true,
      default: 'Tips'
    }
  },
  content: () => {
    return {
      type: String,
      required: true,
      default: 'Content'
    }
  }
})
</script>

<template>
<h4>{{ title }}</h4>
  <span>{{ content }}</span>
</template>

<style scoped>

</style>
