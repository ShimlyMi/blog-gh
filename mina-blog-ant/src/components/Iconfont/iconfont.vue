<script setup>
import { createFromIconfontCN } from "@ant-design/icons-vue";
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4544593_uo94cz83wuo.js'
})
defineProps({
  type: {
    type: String,
    default: ""
  }
})
</script>

<template>
<a-space>
  <icon-font :type="type" />
</a-space>
</template>

<style scoped>
.icons-list :deep(.anticon) {
  margin-right: 6px;
  font-size: 24px;
}
</style>
