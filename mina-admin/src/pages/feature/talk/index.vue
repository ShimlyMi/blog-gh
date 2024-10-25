<script setup lang="ts">
import upload from '@/components/Upload/index.vue'
defineOptions({
  name: 'talkList'
})
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
  </v-row>
</template>

<style scoped lang="scss">
.pageIndex {
  //background-color: #fff;
  margin: 10px;
}
</style>
