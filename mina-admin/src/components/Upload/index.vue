
<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue';

const props = defineProps({
  fileList: {
    type: Array as PropType<File[]>,
    required: true,
  },
  maxImages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:fileList", "handleRemove"]);

const selectedFiles = ref<File[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

const previewImages = computed(() =>
    selectedFiles.value.map((file) => URL.createObjectURL(file))
);

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files || []);

  if (files.length + props.fileList.length > props.maxImages) {
    alert(`最多只能选择 ${props.maxImages} 张图片`);
    return;
  }

  selectedFiles.value = files;
  emit('update:fileList', selectedFiles.value)
};


// 监听 fileList 的变化，以便在父组件更新 fileList 时反映出来（理论上不需要，因为我们是双向绑定）
watch(() => props.fileList, (newVal) => {
  console.log('fileList 更新:', newVal);
});
</script>

<template>
  <div class="image-previewer">
<!--    <input-->
<!--        type="file"-->
<!--        @change="handleFileChange"-->
<!--        accept="image/*"-->
<!--        multiple-->
<!--        ref="fileInput"-->
<!--        style="display: none;"-->
<!--    />-->
    <v-file-input
        label="选择图片"
        multiple
        accept="image/*"
        @change="onFileChange"
        :counter="maxImages - fileList.length"
        :counter-value="fileList.length"
    ></v-file-input>
<!--    <v-btn @click="triggerFileInput">选择图片</v-btn>-->
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
