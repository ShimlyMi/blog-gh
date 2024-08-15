<script setup lang="ts">
import { ref } from "vue";
type location = "top" | "right top" | "left top" | "center center";
type messageTypes = "info" | "success" | "warning" | "error";
type variant = 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain';
interface MessageParams {
  /** 消息类型，可选 `info` 、`success` 、`warning` 、`error` ，默认 `info` */
  type?: messageTypes;
  /** 自定义图标，该属性会覆盖 `type` 的图标 */
  icon?: any;
  /** 消息提示 */
  message: string;
  /** 设置消息提示的位置 */
  location?: string;
  /** 显示时间，单位为毫秒。设为 `0` 则不会自动关闭，`vuetify` 默认是 `3000` ，平台改成默认 `2000` */
  timeout?: number;
  /** 是否显示关闭按钮，默认值 `false` */
  showClose?: boolean;
  /** 文字是否居中，默认值 `false` */
  center?: boolean;
  /** `Message` 距离窗口顶部的偏移量，默认 `20` */
  offset?: number;
  /** 关闭时的回调函数, 参数为被关闭的 `message` 实例 */
  onClose?: Function | null;
  variant?: variant
}
defineProps<MessageParams>()
const snackbar = ref<boolean | undefined>();

const show = () => {
  snackbar.value = true;
}
defineExpose({
  show
})
</script>

<template>
  <v-expand-transition mode="in-out">
    <v-snackbar :timeout="3000" :color="type" :variant="variant" v-model="snackbar" :location="location">
      <template #actions>
        <v-btn variant="text" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-expand-transition>

</template>

<style scoped>

</style>
