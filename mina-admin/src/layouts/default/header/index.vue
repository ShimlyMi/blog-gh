<script setup lang="ts" name="Header">
  import { onMounted } from 'vue'
  import { useTheme } from 'vuetify'
  import { useUserStore } from '@/stores/user'
  import {sessionCache} from "@/utils/auth";
  import {USER_INFO_KEY} from "@/enums/cacheEnum";
  import {_decrypt} from "@/utils/encipher";

  const userStore = useUserStore()
  const theme = useTheme()

  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }

  const getUserInfo = () => {
    const str = sessionCache.getCache(USER_INFO_KEY)
    const data = _decrypt(str)
    console.log(data)
  }
  onMounted(() => getUserInfo())
</script>

<template>
  <v-app-bar
    app
    class="mi-header"
    title="MINA ADMIN"
  >
<!--    <template #prepend>-->
<!--      <router-link to="/mina-admin/public">-->
<!--        <img src="@/assets/logo.png">-->
<!--      </router-link>-->
<!--    </template>-->
    <template #append>
      <v-btn icon="mdi-magnify" />
      <v-btn icon="mdi-white-balance-sunny" @click="toggleTheme" />
      <v-btn icon="mdi-bell-outline" />
      <v-menu location="bottom">
        <template #activator="{ props }">
          <v-btn v-bind="props" :active="false" icon>
            <v-avatar v-if="!userStore.userInfo">
              <v-img alt="网站头像" src="@/assets/avatar.jpg" />
            </v-avatar>
            <v-avatar v-else>
              <v-img alt="网站头像" :src="userStore.userInfo.avatar"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link prepend-icon="mdi-account-circle" title="用户中心" />
          <v-list-item link prepend-icon="mdi-cog" title="用户设置" />
          <v-btn icon="mdi-logout" text="退出登录" @click="userStore.logout()" />
<!--          <v-list-item link prepend-icon="mdi-logout" title="退出登录"  />-->
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>
<style scoped lang="less">

</style>
