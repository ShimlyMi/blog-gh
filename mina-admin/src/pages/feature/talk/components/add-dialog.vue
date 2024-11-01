<script setup lang="ts">
import { ref, unref, watch } from 'vue';
import imagePreviewer from '@/components/Upload/index.vue'
import {conversion, imgUpload} from "@/api/system/static";
import { useTalkStoreHook } from "@/stores/talk";
import { sessionCache } from "@/utils/auth";
import { USER_INFO_KEY} from "@/enums/cacheEnum";
import {_decrypt} from "@/utils/encipher";


defineOptions({
  name: 'addDialog'
})

// 定义接收的 props
const props = defineProps({
  isDialogOpen: {
    type: Boolean,
    required: true
  },
  dialogTitle: {
    type: String,
    required: true
  }
})

const formRef = ref()
const valid = ref<boolean>(true)
const contentRef = ref<string>('')
const imgList = ref<any[]>([])
const maxUploadImages = ref<number>(9); // 设置最大上传图片数量
const selectedFiles = ref<File[]>([]);
const isTop = ref<number>(1)
const status = ref<number>(1)
const username = ref<string>('')
const str = sessionCache.getCache(USER_INFO_KEY)
const userInfo = _decrypt(str)
username.value = userInfo.username
console.log(username.value)

const contentRules = [
  v => !!v || '说说内容不得为空！'
]

// 定义发出的 events
const emit = defineEmits(['close-dialog']);

// 使用 ref 创建响应式状态
const localDialogOpen = ref(props.isDialogOpen);

// 监听 props 中的 isDialogOpen 变化
watch(() => props.isDialogOpen, (newVal) => {
  localDialogOpen.value = newVal;
});

// 监听 localDialogOpen 的变化，当对话框关闭时触发 close-dialog 事件
watch(localDialogOpen, (newVal) => {
  if (!newVal) {
    emit('close-dialog');
  }
});

// 关闭对话框的方法
const closeDialog = () => {
  localDialogOpen.value = false;
};



const onFilesSelected = (files: File[]) => {
  selectedFiles.value = [...selectedFiles.value, ...files];
};

const handleSubmit = async () => {
  if (valid.value) {
      if (contentRef.value && selectedFiles.value.length === 0) {
          const formData = {
              content: contentRef.value,
              username: username.value,
              status: status.value,
              isTop: isTop.value,
              url: []
          }
          const res = await useTalkStoreHook().publishTalk(formData)
          console.log(res)
          return;
      } else if (contentRef.value && selectedFiles.value.length > 0){
          try {
              const compressedFilesPromises = selectedFiles.value.map(async (file) => {
                      return await conversion(file)
                  }
              );
            const resetList: any[] = []
            const compressedFiles: any[] = []
              await Promise.all(compressedFilesPromises).then(res => {
                res.map(raw => {
                  compressedFiles.push({ raw })
                })
              });
              console.log("compressedFiles", compressedFiles)

              // const result = await imgUpload(compressedFiles)
              const promiseList = compressedFiles.map(async v => {
                return await imgUpload(v);
              });
              console.log('图片上传成功:', promiseList);
              await Promise.all(promiseList).then(res => {
                res.map(img => {
                  resetList.push(img?.filename)
                })
              });
            selectedFiles.value = resetList
              // 在这里处理上传成功后的逻辑，例如更新表单状态或显示成功消息
              const submitFormData = {
                  content: contentRef.value,
                  username: username.value,
                  status: status.value,
                  isTop: isTop.value,
                  url: selectedFiles.value
              }
              const res = await useTalkStoreHook().publishTalk(submitFormData)
              console.log(res)
              // 假设上传成功后表单可以继续提交或进行其他操作
              // 例如，这里我们简单地模拟表单提交成功
              alert('表单已提交，图片已上传');
          } catch (error) {
              console.error('上传失败:', error);
              alert('图片上传失败，请重试');
          }
      }
  }
};
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="localDialogOpen" max-width="1200px" persistent>
      <v-card>
        <v-list-item>
          <template #title>
            {{ dialogTitle + '说说' }}
          </template>
          <template #append>
            <v-btn variant="text" @click="closeDialog" icon="mdi-close"/>
          </template>
        </v-list-item>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-form ref="formRef" v-model="valid">
                <v-row>
                  <v-col cols="12" md="12" sm="12">
                    <div class="d-flex align-center">
                    <span class="mouse_pointer">
                      <v-icon icon="mdi-content-save-edit"></v-icon>&nbsp;说说内容：
                    </span>
                      <v-textarea
                          v-model="contentRef"
                          placeholder="请输入说说内容"
                          required
                          clearable
                          variant="solo"
                          auto-grow
                          hide-details
                          :rules="contentRules"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <div class="d-flex align-center">
                    <span class="mouse_pointer">
                      <v-icon icon="mdi-camera"></v-icon>&nbsp;图片上传：
                    </span>
                      <image-previewer
                          v-model:file-list="imgList"
                          :max-images="maxUploadImages"
                          @update:file-list="selectedFiles"/>
                    </div>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <div class="d-flex align-center">
                   <span class="mouse_pointer">
                     <v-icon icon="mdi-eye"></v-icon>&nbsp;是否公开：
                   </span>
                      <v-radio-group v-model="status" inline hide-details>
                        <v-radio color="primary" label="所有人可见" :value="1"></v-radio>
                        <v-radio color="primary" label="尽自己可见" :value="2"></v-radio>
                      </v-radio-group>
                    </div>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <div class="d-flex align-center">
                   <span class="mouse_pointer">
                     <v-icon icon="mdi-arrow-collapse-up"></v-icon>&nbsp;是否置顶：
                   </span>
                      <v-radio-group v-model="isTop" inline hide-details>
                        <v-radio color="primary" label="置顶" :value="1"></v-radio>
                        <v-radio color="primary" label="不置顶" :value="2"></v-radio>
                      </v-radio-group>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
<!--              <small class="text-caption text-medium-emphasis">*indicates required field</small>-->
            </v-col>
          </v-row>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Reset">Reset</v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="handleSubmit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>
