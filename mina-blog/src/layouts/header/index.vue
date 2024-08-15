<script setup name="Header">
  import { useRouter } from 'vue-router'
  import { storeToRefs } from "pinia";
  import { useUserStore } from "@/stores/user";

  const userStore = useUserStore();
  const { getBlogAvatar } = storeToRefs(userStore);
  const router = useRouter()
  const user = {
    initials: 'JD',
    fullName: 'John Doe',
    email: 'john.doe@doe.com',
  }
  const goto = () => {
    router.push({ path: '/article', query: { id: 1 } })
  }
</script>
<template>
  <v-toolbar class="mi-header">
    <template #prepend>
      <router-link to="/">
        <img alt="MINA" src="@/assets/logo.png">
      </router-link>
    </template>
    <template #append>
      <v-btn prepend-icon="mdi-home" to="/" :active="false">
        主页
      </v-btn>
      <v-btn prepend-icon="mdi-book-open" :active="false" @click="goto">
        文章
      </v-btn>
      <v-btn prepend-icon="mdi-clock" :active="false">
        归档
      </v-btn>
      <v-btn prepend-icon="mdi-home" :active="false">
        小屋
      </v-btn>
      <v-btn prepend-icon="mdi-home" :active="false">
        相册
      </v-btn>
      <v-btn prepend-icon="mdi-home" :active="false">
        说说
      </v-btn>
      <v-btn prepend-icon="mdi-home" :active="false">
        留言板
      </v-btn>
      <v-btn prepend-icon="mdi-home" :active="false">
        友人
      </v-btn>
      <!-- 登录 -->
<!--      <v-btn>-->
<!--        <v-avatar />-->
<!--      </v-btn>-->
      <!-- hover 可以使用 expand-transition -->
      <v-menu>
        <template #activator="{ props  }">
          <v-btn icon v-bind="props" :active="false">
            <v-avatar>
              <v-img alt="网站头像" :src="getBlogAvatar"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-expand-transition>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar
                    color="brown"
                >
                  <span class="text-h5">{{ user.initials }}</span>
                </v-avatar>
                <h3>{{ user.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    variant="text"
                    rounded
                >
                  Edit Account
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    variant="text"
                    rounded
                >
                  Disconnect
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-menu>
    </template>
  </v-toolbar>
</template>

<style scoped>

</style>
