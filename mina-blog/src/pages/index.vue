<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";

import Side from "@/components/Sider/side.vue";
import HomeArticle from "@/components/HomeArticle/index.vue";
import { messageError } from "@/utils/messgeBox";

import { getConfig } from "@/api/website";
import { useUserStore } from "@/stores/user";
import { homeGetArticleList } from "@/api/article/article";
import { getStatistic } from "@/api/statistic";

const userStore = useUserStore();
const configDetail = ref({});
const param = reactive({
  current: 1,
  size: 10,
  loading: false,
});
const configParam = reactive({
  current: 1,
  size: 10,
})
const articleList = ref([]);
const articleTotal = ref();
let tags = ref([]);
let categories = ref([]);
let data = reactive({
  category_id: 0,
  current: 1,
  size: 5
})

/** 获取个人信息 */
const getConfigDetail = async () => {
  let res: any = await getConfig();
  console.log(res)
}

/** 获取 分类、文章、标签 总数 */
// const getHomeStatistic = async () => {
//   let res = await getStatistic();
//   if (res.code === 0) {
//     Object.assign(configDetail.value, res.result);
//   }
// }



/** 获取首页文章 */
// const getArticleList = async () => {
//   // type === 'init' ? "" : (param.loading = true);
//   let res: any = await homeGetArticleList(param.current, param.size);
//   console.log(res)
//   if (res.code === 0) {
//     const { list, count } = res.result;
//     articleList.value = list;
//     articleTotal.value = count
//   }
// }

const init = async () => {
  // await getArticleList();
  await getConfigDetail();
  // await getHomeStatistic();

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
