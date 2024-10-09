<script setup lang="ts">
import {nextTick, ref} from 'vue'

const emit = defineEmits(["update:fileList", "handleRemove"]);
const props = defineProps({
  fileList: {
    type: Array,
    default: () => {}
  },
  counter: {
    type: Number,
    default: 0
  },
  multiple: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 200
  },
  height: {
    type: Number,
    default: 200
  }
})
const uploadFileList = ref([]);
const fileErrors = ref[] // 存储文件错误列表
const showUpload = ref(true);
const onFileChange = (e) => {
  fileErrors.value = []
  uploadFileList.value = []
  const files = e.target.files
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.startsWith('image/')) {
      createImage(files[i])
    } else {
      fileErrors.value.push(`File ${i + 1} is not an image.`)
    }
  }
}

const createImage = (files) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    uploadFileList.value.push(e.target.result)
  }
  reader.readAsDataURL(files)
}

</script>

<template>
  <v-sheet>
    <v-file-input
      v-model:file-list="uploadFileList"
      :multiple="multiple"
      accept="image/jpeg"
      @onChange="onFileChange"
    ></v-file-input>
  </v-sheet>
<!--  <v-sheet>-->
<!--    <v-img-->
<!--      :width="width"-->
<!--      :height="height"-->
<!--    ></v-img>-->
<!--  </v-sheet>-->
</template>

<style scoped lang="less">

</style>
