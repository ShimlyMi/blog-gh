<script setup lang="ts">
import {useRouter} from "vue-router";
import noAccess from "@/assets/status/403.svg?component";

defineOptions({
  name: '403'
})
const router = useRouter()
</script>

<template>
  <div class="flex justify-center items-center h-[640px]">
    <noAccess/>
    <div class="ml-12">
      <p
        v-motion
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 100
          }
        }"
        :initial="{
          opacity: 0,
          y: 100
        }"
        class="font-medium text-4xl mb-4 dark:text-white"
      >
        403
      </p>
      <p
        v-motion
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
        :initial="{
          opacity: 0,
          y: 100
        }"
        class="mb-4 text-gray-500"
      >
        抱歉，你无权访问该页面
      </p>
      <v-button
        v-motion
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 500
          }
        }"
        :initial="{
          opacity: 0,
          y: 100
        }"
        type="primary"
        @click="router.push('/')"
      >
        返回首页
      </v-button>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
