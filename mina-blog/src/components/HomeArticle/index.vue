<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  articleList: {
    type: Array,
    default: () => {},
  },
  articleTotal: {
    type: Number,
    default: 0
  },
  param: {
    type: Object,
    default: () => {},
  },
  category: {
    type: Object,
    default: () => {},
  }
})

const router = useRouter();

watch(
    () => props.articleList,
    () => {
      if (!props.articleList?.length) return false;
    }
)

</script>

<template>

</template>

<style scoped>

</style>

