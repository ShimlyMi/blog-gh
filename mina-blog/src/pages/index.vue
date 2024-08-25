<script lang="ts" setup>
import {  ref, onMounted } from "vue";

import Side from "@/components/Sider/side.vue";

import { getConfig } from "@/api/website";
import { WebsiteResponse } from "@/api/website/types";
import { useWebsiteStore } from "@/stores/website";

const configDetail = ref({});
const useWebsite = useWebsiteStore();


/** 获取个人信息 */
const getConfigDetail = async () => {
  const res = await useWebsite.sendWebsiteConfig()
  console.log(res)
  configDetail.value = res
  useWebsite.setWebsiteConfig(configDetail.value)
}


const init = () => {
  getConfigDetail();

}

onMounted(() => {
  init();
})
</script>

<template>
  <v-container class="mi-home">
    <v-row>
      <v-col md="3">
        <Side  />
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
