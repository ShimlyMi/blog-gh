<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TalkList from "./components/talk-list.vue";
import AddDialog from "./components/add-dialog.vue";
import { useTalkStore } from "@/stores/talk";

defineOptions({
  name: 'talkList'
})

const talkStore = useTalkStore()
const isDialogOpen = ref(false)
const dialogTitle = ref('')
const talkLists = ref([])
function openDialog(type: string) {
  isDialogOpen.value = true
  switch (type) {
      case 'add':
          dialogTitle.value = '新增';
          break;
      case 'edit':
          dialogTitle.value = '编辑';
          break;
      default:
          break;
  }
}

function closeDialog() {
  isDialogOpen.value = false
}
const getTalkLists = async () => {
  let res = await talkStore.getTalkList()
  console.log(res)
  // talkLists.value.pu
}

onMounted(() => getTalkLists())
</script>

<template>
  <v-row class="pageIndex" justify="center">
    <v-col cols="8">
      <v-card>
        <template #title>
          <h2>随笔</h2>
        </template>
        <template #append>
          <v-btn variant="text" icon="mdi-text-box-plus-outline"></v-btn>
        </template>
        <v-divider />
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card hover>
                <v-card-item>
                  222
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <template #title>
                  <h2>说说随笔</h2>
                </template>
                <v-divider />
                <v-card-item>
                  222
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <template #title>
                  <h2>说说随笔</h2>
                </template>
                <v-divider />
                <v-card-item>
                  222
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
          <div class="observer">
            暂无更多
          </div>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <template #title>
          <h2>说说</h2>
        </template>
        <template #append>
          <v-btn variant="text"
                 icon="mdi-text-box-plus-outline"
                 @click="openDialog('add')"></v-btn>
        </template>
        <v-divider />
        <v-container>
          <v-row>
            <v-col cols="12" v-for="item in getTalkLists" :key="item">
              <TalkList />
            </v-col>
            <v-col cols="12">
              <v-card>
                <template #title>
                  <h2>说说随笔</h2>
                </template>
                <v-divider />
                <v-card-item>
                  222
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <template #title>
                  <h2>说说随笔</h2>
                </template>
                <v-divider />
                <v-card-item>
                  222
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>

  <AddDialog :is-dialog-open="isDialogOpen" @close-dialog="closeDialog" :dialog-title="dialogTitle" />
</template>

<style scoped lang="scss">
.pageIndex {
  //background-color: #fff;
  margin: 10px;
}
</style>
