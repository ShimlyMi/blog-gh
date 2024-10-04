<script setup lang="ts">
  import { useVuelidate } from '@vuelidate/core'
  import LoginFormTitle from './LoginFormTitle.vue'
  import system from '@/locale/system'
  import { messageError, messageSuccess } from '@/utils/messgeBox'
  import { LoginStateEnum, useLoginState } from '@/pages/system/login/useLogin'
  import router from '@/router'

  const v$ = useVuelidate()
  const formRef = ref()
  const loading = ref(false)
  const rememberMe = ref(false)
  const formData = ref({
    username: '',
    password: '',
  })
  const { getLoginState } = useLoginState()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  function goTo (type: system) {
    switch (type) {
      case 'REGISTER':
        router.push('/register')
      // eslint-disable-next-line no-fallthrough
      default:
        router.push('/')
    }
  }

  // async function handleLogin () {
  //   const data = await validForm()
  //   if (!data) return
  //   try {
  //     loading.value = true
  //     const userInfo = await useUserStoreHook().login({
  //       username: data.username,
  //       password: data.password,
  //     })
  //     if (userInfo) {
  //       messageSuccess('欢迎回来', system.login.loginSuccessTitle)
  //     }
  //   } catch (err) {
  //     messageError(system.api.errorTip, system.api.networkExceptionMsg)
  //   } finally {
  //     loading.value = false
  //   }
  // }
</script>

<template>
  <v-sheet>
    <LoginFormTitle v-show="getShow" />
    <v-form v-show="getShow" ref="formRef" :model="formData">
      <v-text-field v-model="formData.username" :label="system.login.username" />
      <v-text-field v-model="formData.password" :label="system.login.password" />
      <v-checkbox v-model="rememberMe" :label="system.login.rememberMe" />
      <v-btn>{{ system.login.forgetPassword }}</v-btn>
      <v-btn block :loading="loading" type="submit">{{ system.login.loginButton }}</v-btn>
      <v-btn block @click="goTo('REGISTER')">{{ system.login.registerButton }}</v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="less">

</style>
