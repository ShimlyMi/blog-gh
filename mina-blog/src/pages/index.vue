<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";

import Side from "@/components/Sider/side.vue";
import $messageBox from "@/components/MessageBox/index";

import { getConfig } from "@/api/website";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const configDetail = ref({});

/** 获取个人信息 */
const getConfigDetail = async () => {
  let res = await getConfig();
  // console.log(res.result)
  if (res.code === 0) {
    configDetail.value = res.result;
    // console.log(res.result.avatar_bg)
    // console.log(res.result.blog_avatar)
    console.log(configDetail.value)
    userStore.SET_BLOG_AVATAR(res.result.blog_avatar)
  } else {
    $messageBox({
      type: 'warning',
      message: res.message,
      location: "right top"
    })
  }
}
onMounted(() => {
  getConfigDetail()
})
</script>

<template>
  <v-container class="mi-home">
    <v-row>
      <v-col cols="4">
        <Side :config-detail="configDetail" />
      </v-col>
      <v-col md="16">222</v-col>
    </v-row>
  </v-container>
</template>
