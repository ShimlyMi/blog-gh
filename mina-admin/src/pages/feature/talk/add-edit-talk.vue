<script setup lang="ts">
import { ref, watch } from 'vue';
import upload from '@/components/Upload/index.vue'

defineOptions({
  name: 'addEditTalk'
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

const radios = ref(1)
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

// 执行一些操作然后关闭对话框的方法
// const closeDialogAndDoSomething = () => {
//   console.log('Doing something before closing...');
//   closeDialog();
// };
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="localDialogOpen" max-width="700px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
          <v-divider class="divider" />
        </v-card-title>

        <v-card-text>
         <v-row>
          <v-col cols="12" md="12" sm="12">
            <v-form>
<!--              <v-text-field label="标题" required></v-text-field>-->
<!--              <v-textarea label="内容" required clearable variant="solo" auto-grow></v-textarea >-->
<!--              <upload :limit="9"/>-->
<!--              <v-radio-group v-model="radios">-->
<!--                <v-radio label="Option One" value="one"></v-radio>-->
<!--                <v-radio label="Option 2 (string)" value="2"></v-radio>-->
<!--                <v-radio :value="3" label="Option 3 (integer)"></v-radio>-->
<!--              </v-radio-group>-->
              <v-row>
                <v-col cols="12" md="12" sm="12">
                  <div class="d-flex align-center">
                    <span class="mouse_pointer">
                      <v-icon icon="mdi-subtitles-outline"></v-icon>&nbsp;标题：
                    </span>
                    <v-text-field
                        label="标题"
                        required
                        clearable
                        variant="solo"
                        auto-grow
                        hide-details
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="12" sm="12">
                  <div class="d-flex align-center">
                    <span class="mouse_pointer">
                      <v-icon icon="mdi-content-save-edit"></v-icon>&nbsp;内容：
                    </span>
                    <v-textarea
                        label="内容"
                        required
                        clearable
                        variant="solo"
                        auto-grow
                        hide-details
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
                   <v-radio-group v-model="radios" inline hide-details>
                     <v-radio color="primary" label="所有人可见" :value="1"></v-radio>
                     <v-radio color="primary" label="尽自己可见" :value="2"></v-radio>
                   </v-radio-group>
                 </div>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
         </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Close" variant="plain" @click="closeDialog">Close</v-btn>
          <v-btn color="primary" text="Save" variant="tonal">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>
