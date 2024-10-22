<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStoreHook } from "@/stores/user";
import {_decrypt} from "@/utils/encipher";

defineOptions({
  name: 'Home'
})
const data = useUserStoreHook().getUserInfo
const userInfo = _decrypt(data)

onMounted(
  () => data
)
</script>

<template>
  <v-row class="pageIndex">
    <v-col>
      <v-card>
        <v-container class="mi-home">
          <h2>欢迎回来！<span>{{ userInfo.nickname }}</span></h2>
          <v-divider />
          <v-row>
            <v-col>111</v-col>
            <v-col>111</v-col>
            <v-col>111</v-col>
            <v-col>111</v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-container>
          222
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
