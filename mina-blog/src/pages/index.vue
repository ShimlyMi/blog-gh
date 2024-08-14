<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";

import Side from "@/components/Sider/side.vue";
// import VFNotification from "@/utils/VFNotiftcation";

// import { getConfig } from "@/api/website";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const configDetail = ref({});

/** 获取个人信息 */
const getConfigDetail = async () => {
  let res = await getConfig();
  console.log(res.data)
  if (res.status === 0 && typeof res.data != "String") {
    configDetail.value = res.result;
    userStore.setBlogAvatar(res.data.blog_avatar);
  }
}
onMounted(() => {
  getConfigDetail()
})
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="3">
        <Side />
      </v-col>
      <v-col>222</v-col>
    </v-row>
  </v-container>
</template>
