<script setup name="Header">
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const goto = () => {
    router.push({ path: '/article', query: { id: 1 } })
  }
</script>
<template>
  <v-toolbar>
    <template #prepend>
      <router-link to="/">
        <img alt="MINA" src="@/assets/logo.png">
      </router-link>
    </template>
    <template #append>
      <v-btn prepend-icon="mdi-home" to="/home">
        主页
      </v-btn>
      <v-btn prepend-icon="mdi-book-open" @click="goto">
        文章
      </v-btn>
      <v-btn prepend-icon="mdi-clock">
        归档
      </v-btn>
      <v-btn prepend-icon="mdi-home">
        小屋
      </v-btn>
      <v-btn prepend-icon="mdi-home">
        相册
      </v-btn>
      <v-btn prepend-icon="mdi-home">
        说说
      </v-btn>
      <v-btn prepend-icon="mdi-home">
        留言板
      </v-btn>
      <v-btn prepend-icon="mdi-home">
        友人
      </v-btn>
      <!-- 登录 -->
      <v-btn>
        <v-avatar />
      </v-btn>
    </template>
  </v-toolbar>
</template>

<style scoped>

</style>
