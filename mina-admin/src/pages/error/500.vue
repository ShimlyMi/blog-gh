<script lang="ts" setup>
import {useRouter} from "vue-router";
import noServer from "@/assets/status/500.svg?component";

defineOptions({
  name: "500"
});

const router = useRouter();
</script>

<template>
  <div class="flex justify-center items-center h-[640px]">
    <noServer/>
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
        500
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
        抱歉，服务器出错了
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
