<template>
  <div>
    <input type="file" multiple @change="handleFileUpload" ref="fileInputRef" style="display: none;" />
    <button @click="triggerFileUpload" :disabled="currentLimitReached">Choose Files</button>
    <div v-if="localImgList.length > 0" class="preview-container">
      <div v-for="(item, index) in localImgList" :key="item.uid" class="preview-item">
        <img :src="item.previewUrl" alt="" class="preview-image" />
        <span class="file-name">{{ item.name }}</span>
        <button @click="removeImage(index)" class="remove-button">Remove</button>
      </div>
    </div>
    <p v-if="currentLimitReached" class="limit-message">You have reached the file upload limit.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, PropType } from 'vue';

interface ImageInfo {
  uid: string; // 添加一个唯一标识符，以防重名文件导致的key重复问题
  file: File;
  previewUrl: string;
  name: string;
}
const emit = defineEmits(["update:fileList", "handleRemove"]);

const props = defineProps({
  limit: {
    type: Number as PropType<number>,
    default: 0, // 默认无限制
  },
  imgList: {
    type: Array, // 假设FileInfo是包含file和name等属性的对象类型，你需要根据实际情况调整
    default: () => [],
  },
});

const localImgList = ref<ImageInfo[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);

// 生成唯一标识符的函数
const generateUid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// 初始化localImgList，将props中的imgList转换为带有previewUrl和uid的对象数组
watch(
  () => props.imgList,
  (newList) => {
  localImgList.value = newList.map(item => {
    // 假设item是一个包含file和name的对象，你需要根据实际情况调整
    const reader = new FileReader();
    reader.onload = (e) => {
      if (localImgList.value.length < props.limit) { // 确保不会超出限制
        const previewUrl = e.target.result as string;
        localImgList.value.push({
          uid: generateUid(),
          file: item.file, // 假设item有一个file属性
          previewUrl,
          name: item.name, // 假设item有一个name属性
        });
      }
    };
    reader.readAsDataURL(item.file); // 假设item有一个file属性可以被读取
    // 注意：这里的异步操作可能会导致一些问题，因为reader.onload是异步执行的。
    // 一个更好的做法是在父组件中预先处理这些文件，只传递已经转换好的带有previewUrl的对象数组给子组件。
  }).filter(item => !!item); // 过滤掉未定义的项（虽然在这个场景下可能不会有）
}, { immediate: true });

const currentLimitReached = computed(() => {
  return localImgList.value.length >= props.limit && props.limit > 0;
});

const triggerFileUpload = () => {
  if (fileInputRef.value && !currentLimitReached.value) {
    fileInputRef.value.click();
  }
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = input.files;
  if (!files || currentLimitReached.value) return;

  Array.from(files).forEach(file => {
    if (localImgList.value.length >= props.limit) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target.result as string;
      const newImageInfo = {
        uid: generateUid(),
        file,
        previewUrl,
        name: file.name,
      };
      localImgList.value.push(newImageInfo);

      // 通知父组件新图片已添加
      emit('update:fileList', newImageInfo); // 或者 emit(update:fileList, [...localImgList.value]); 但这样可能不是最高效的，因为父组件可能已经有了大部分数据
      // 如果父组件需要完整的列表，更好的做法可能是在父组件中监听这个事件，并使用这个新图片信息来更新其自己的状态
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index: number) => {
  const removedImageInfo = localImgList.value.splice(index, 1)[0];

  // 通知父组件图片已移除
  emit('handleRemove', removedImageInfo); // 传递被移除的图片信息给父组件
};
</script>

<style scoped>
.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.preview-item {
  position: relative;
  width: 150px;
  height: 150px;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-name {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
}

.remove-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: none;
  padding: 2px 5px;
  border-radius: 3px;
  cursor: pointer;
}

.limit-message {
  color: red;
  margin-top: 10px;
}
</style>
