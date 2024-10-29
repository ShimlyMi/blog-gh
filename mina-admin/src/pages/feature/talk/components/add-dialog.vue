<script setup lang="ts">
import {ref, unref, watch} from 'vue';
import upload from '@/components/Upload/index.vue'
import system from "@/locale/system";
import {conversion, imgUpload} from "@/api/system/static";
import {messageError} from "@/utils/messgeBox";

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
const isTop = ref<number>(1)
const status = ref<number>(1)
const userId = ref(0)

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

const save = async () => {
  const form = unref(formRef)
  if (!form) return
  await form.validate()
  if (valid.value) {
    if (contentRef.value && imgList.value.length > 0) {
      // 先压缩图片

      // 再上传图片

      // 最后保存 `form` 数据
    }
  }
}

// 执行一些操作然后关闭对话框的方法
// const closeDialogAndDoSomething = () => {
//   console.log('Doing something before closing...');
//   closeDialog();
// };
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
                      <upload :limit="9"/>
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
                        <v-radio color="primary" label="不置顶" :value="1"></v-radio>
                        <v-radio color="primary" label="置顶" :value="2"></v-radio>
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
          <v-btn color="primary" text="Save" variant="tonal">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>
