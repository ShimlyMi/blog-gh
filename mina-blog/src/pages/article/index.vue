<template>
  <h1>{{ route.query }}</h1>
</template>

<script setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>

<style scoped>

</style>
