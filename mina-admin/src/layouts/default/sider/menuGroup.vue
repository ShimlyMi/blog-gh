<script setup lang="ts">
defineOptions({
  name: 'MenuGroup',
})
</script>

<template>
  <v-list>
    <v-list-item prepend-icon="mdi-home" title="主页" to="/"></v-list-item>
    <v-list-item prepend-icon="mdi-note-text" title="博客文章"></v-list-item>
    <v-list-item prepend-icon="mdi-chat-processing" title="说说随笔" to="/talk/list"></v-list-item>
    <v-list-item prepend-icon="mdi-image" title="相册图库" to="/category/list"></v-list-item>
  </v-list>
</template>

<style scoped lang="sass">

</style>
