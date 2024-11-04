<script setup lang="ts">
import { ref, computed, unref } from 'vue';
import {conversion, imgUpload} from "@/api/system/static";

const props = defineProps({
  maxImages: {
    type: Number,
    default: 1
  },

});
const emit = defineEmits(['update:fileList', 'handleRemove']);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFiles = ref<File[]>([]);
const previewImages = computed(() =>
  selectedFiles.value.map((file) => URL.createObjectURL(file))
);

const handleFileChange = (event: Event) => {
  const target = (event.target as HTMLInputElement);
  const files = target.files;
  if (files && files.length) {
    const newFiles = Array.from(files);
    if (props.maxImages && newFiles.length + selectedFiles.value.length > props.maxImages) {
      alert(`最多只能选择 ${props.maxImages} 张图片`);
      return;
    }
    selectedFiles.value = [...selectedFiles.value, ...newFiles];
    emit('update:fileList', newFiles);
  }
};

const removeImage = (index: number) => {
  const removedImageInfo = selectedFiles.value.splice(index, 1)[0];

  // 通知父组件图片已移除
  emit('handleRemove', removedImageInfo); // 传递被移除的图片信息给父组件
};

const resetImages = () => {
  selectedFiles.value = [];
};
// 暴露 resetImages 方法给父组件
defineExpose({
  resetImages,
});

const imagesUpload = async () => {
    const compressedFilesPromises = selectedFiles.value.map(async (file) => {
            return await conversion(file)
        }
    );
    const compressedFiles: any[] = []
    await Promise.all(compressedFilesPromises).then(res => {
        res.map(raw => {
            compressedFiles.push({ raw })
        })
    });
    console.log("compressedFiles", compressedFiles)
    let res = await imgUpload(compressedFiles)
    console.log(res)
}
</script>
<template>
  <div class="image-previewer">
    <div v-if="previewImages.length" class="preview-container">
      <div class="preview-images" v-for="(image, index) in previewImages">
        <v-img
          :key="index"
          :src="image"
          class="preview-image"
          aspect-ratio="1"
        />
        <v-btn size="x-small" variant="text" @click="removeImage(index)" class="remove-button" icon="mdi-close" />
      </div>
    </div>
    <span style="color: #a7a7d4" v-show="!selectedFiles.length">点击选择图片<v-icon icon="mdi-arrow-right-bold"></v-icon></span>
    <div v-show="selectedFiles.length < maxImages">
      <v-file-input
        label="选择图片"
        hide-input
        prepend-icon="mdi-camera-image"
        accept="image/*"
        required
        @change="handleFileChange"
        :multiple="maxImages"
        :counter="maxImages"
        :counter-value="selectedFiles.length"
        :disabled="selectedFiles.length >= maxImages"
      >
      </v-file-input>
    </div>
    <v-btn v-show="selectedFiles.length" @click="imagesUpload">点击上传图片</v-btn>
    <p v-if="maxImages && selectedFiles.length > maxImages" class="error-message">
      已超出最大上传数量：{{ maxImages }}
    </p>
  </div>
</template>


<style scoped>
.image-previewer {
  display: flex;
  align-items: center;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.preview-images {
  position: relative;
  width: 100px;
  height: 100px;
}
.preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.error-message {
  color: red;
  margin-top: 10px;
}
.remove-button {
  position: absolute;
  top: 0px;
  right: 0px;
//background-color: red;
//color: white;
  border: none;
//padding: 2px 5px;
  border-radius: 3px;
  cursor: pointer;
}
</style>

