<script setup lang="ts" name="Header">
  import { useTheme } from 'vuetify'
  import { useUserStore } from '@/stores/user'
  import {sessionCache} from "@/utils/auth";
  import {USER_INFO_KEY} from "@/enums/cacheEnum";
  import {_decrypt} from "@/utils/encipher";
  import {onMounted} from "vue";

  const userStore = useUserStore()

  function logOut() {
    return userStore.logout()
  }
  const str = sessionCache.getCache(USER_INFO_KEY)
  const data = _decrypt(str)
  console.log(data)
  onMounted(
    () => str
  )
</script>

<template>
  <v-app-bar
    app
    class="mi-header"
    title="MINA ADMIN"
  >
    <template #append>
      <v-btn icon="mdi-magnify" />
      <v-btn icon="mdi-bell-outline" />
      <v-menu location="bottom">
        <template #activator="{ props }">
          <v-btn v-bind="props" :active="false" icon>
            <v-avatar>
              <v-img  v-if="!str" alt="网站头像" src="@/assets/avatar.jpg" />
              <v-img v-else alt="网站头像" :src="data.avatar"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link prepend-icon="mdi-account-circle" title="用户中心" />
          <v-list-item link prepend-icon="mdi-cog" title="用户设置" />
<!--          <v-btn icon="mdi-logout" text="退出登录" @click="logOut" />-->
          <v-list-item prepend-icon="mdi-logout" title="退出登录" @click="logOut" />
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>
<style scoped lang="less">

</style>
