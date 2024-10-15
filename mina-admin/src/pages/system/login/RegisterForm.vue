<script setup lang="ts">
  import { ref, computed, unref } from 'vue'
  import system from '@/locale/system'
  import LoginFormTitle from '@/pages/system/login/LoginFormTitle.vue'
  import { LoginStateEnum, useLoginState } from '@/pages/system/login/useLogin'
  import router from "@/router/copy";

  const { getLoginState } = useLoginState()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)
  const loading = ref(false)
  const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
  })
  function goTo (type: system) {
    switch (type) {
      case 'LOGIN':
        router.push('/login')
      // eslint-disable-next-line no-fallthrough
      default:
        router.push('/')
    }
  }
</script>

<template>
  <v-sheet>
    <LoginFormTitle v-show="getShow" />
    <v-form v-show="getShow" ref="formRef" :model="formData">
      <v-text-field v-model="formData.username" :label="system.login.username" />
      <v-text-field v-model="formData.password" :label="system.login.password" />
      <v-text-field v-model="formData.confirmPassword" :label="system.login.confirmPassword" />
      <v-btn block @click="goTo('LOGIN')">{{ system.login.loginButton }}</v-btn>
      <v-btn block :loading="loading" type="submit">{{ system.login.registerButton }}</v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="less">

</style>
