<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="3">
        <Sider />
      </v-col>
      <v-col>222</v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";

import Sider from "@/components/Sider/sider.vue";

import { getConfigDetail } from "@/api/website";
import VFNotification from "@/utils/VFNotiftcation";

const configDetail = ref({});

/** 获取个人信息 */

</script>
