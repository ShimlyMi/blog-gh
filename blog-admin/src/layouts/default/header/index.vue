<script setup lang="ts" name="Header">
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
</script>

<template>
  <v-app-bar
    app
    class="mi-header"
    :elevation="1"
    title="MINA ADMIN"
  >
    <template #prepend>
      <img src="@/assets/logo.png">
    </template>
    <template #append>
      <v-btn icon="mdi-magnify" />
      <v-btn icon="mdi-white-balance-sunny" @click="toggleTheme" />
      <v-btn icon="mdi-bell-outline" />
      <v-menu location="bottom">
        <template #activator="{ props }">
          <v-btn v-bind="props" :active="false" icon>
            <v-avatar>
              <v-img alt="网站头像" src="@/assets/avatar.jpg" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link prepend-icon="mdi-account-circle" title="用户中心" />
          <v-list-item link prepend-icon="mdi-cog" title="用户设置" />
          <v-list-item link prepend-icon="mdi-logout" title="退出登录" />
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>
<style scoped lang="less">

</style>
