<script lang="ts" setup>
import {  ref, onMounted } from "vue";

import Side from "@/components/Sider/side.vue";

import { getConfig } from "@/api/website/website";

const configDetail = ref({});


/** 获取个人信息 */
const getConfigDetail = async () => {
  let res: any = await getConfig();
  console.log(res)
}


const init = async () => {
  await getConfigDetail();

}

onMounted(() => {
  init();
})
</script>

<template>
  <v-container class="mi-home">
    <v-row>
      <v-col md="3">
        <Side :config-detail="configDetail" />
      </v-col>
      <v-col md="16">
<!--        <HomeArticle-->
<!--          :param="param"-->
<!--          :article-list="articleList"-->
<!--          :article-total="articleTotal" />-->
      </v-col>
    </v-row>
  </v-container>
</template>
