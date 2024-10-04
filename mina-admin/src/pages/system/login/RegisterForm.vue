<script setup lang="ts">
  import system from '@/locale/system'
  import LoginFormTitle from '@/pages/system/login/LoginFormTitle.vue'
  import { LoginStateEnum, useLoginState } from '@/pages/system/login/useLogin'

  const { getLoginState } = useLoginState()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)
  const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
  })
</script>

<template>
  <v-sheet>
    <LoginFormTitle v-show="getShow" />
    <v-form v-show="getShow" ref="formRef" :model="formData">
      <v-text-field v-model="formData.username" :label="system.login.username" />
      <v-text-field v-model="formData.password" :label="system.login.password" />
      <v-text-field v-model="formData.confirmPassword" :label="system.login.confirmPassword" />
      <v-btn block :loading="loading" type="submit">{{ system.login.loginButton }}</v-btn>
      <v-btn block>{{ system.login.registerButton }}</v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="less">

</style>
