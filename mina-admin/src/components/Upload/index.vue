<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ maxImages?: number }>();
const emit = defineEmits<{ (e: 'update:fileList', files: File[]): void }>();

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFiles = ref<File[]>([]);
const previewImages = computed(() =>
    selectedFiles.value.map((file) => URL.createObjectURL(file))
);

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

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
</script>
<template>
  <div class="image-previewer">
        <input
            type="file"
            @change="handleFileChange"
            accept="image/*"
            multiple
            ref="fileInput"
            style="display: none;"
        />
<!--    <v-file-input-->
<!--        label="选择图片"-->
<!--        multiple-->
<!--        accept="image/*"-->
<!--        @change="onFileChange"-->
<!--        :counter="maxFiles - fileList.length"-->
<!--        :counter-value="fileList.length"-->
<!--    ></v-file-input>-->
    <v-btn @click="triggerFileInput">选择图片</v-btn>
    <div v-if="previewImages.length" class="preview-images">
      <v-img
          v-for="(image, index) in previewImages"
          :key="index"
          :src="image"
          class="preview-image"
          aspect-ratio="1"
      />
    </div>
    <p v-if="maxImages && selectedFiles.length > maxImages" class="error-message">
      已超出最大上传数量：{{ maxImages }}
    </p>
  </div>
</template>


<style scoped>
.image-previewer {
  /* 添加你的样式 */
}
.preview-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
</style>


<style scoped>
.image-previewer {
  /* 添加你的样式 */
}
.preview-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
</style>
