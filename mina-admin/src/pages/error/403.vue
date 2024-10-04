<script setup lang="ts">
import {useRouter} from "vue-router";

defineOptions({
  name: '403'
})
const router = useRouter()
</script>

<template>
<p>抱歉，你无权访问该页面</p>
  <v-btn @click="router.push('/')">返回首页</v-btn>
</template>

<style scoped lang="less">

</style>
