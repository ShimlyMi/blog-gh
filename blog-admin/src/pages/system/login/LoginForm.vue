<script setup lang="ts">
  import LoginFormTitle from './LoginFormTitle.vue'
  import system from '@/locale/system'
  import { useUserStore } from '@/stores/modules/user'
  import { messageError, messageSuccess } from '@/utils/messgeBox'
  import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './useLogin'

  const userStore = useUserStore()
  const { setLoginState, getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()
  const formRef = ref()
  const loading = ref(false)
  const rememberMe = ref(false)
  const formData = ref({
    username: '',
    password: '',
  })
  const { validForm } = useFormValid(formRef)
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  async function handleLogin () {
    const data = await validForm()
    if (!data) return
    try {
      loading.value = true
      const userInfo = await userStore.login({
        username: data.username,
        password: data.password,
      })
      if (userInfo) {
        messageSuccess('欢迎回来', system.login.loginSuccessTitle)
      }
    } catch (err) {
      messageError(system.api.errorTip, system.api.networkExceptionMsg)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <v-sheet>
    <LoginFormTitle v-show="getShow" />
    <v-form v-show="getShow" ref="formRef" :model="formData">
      <v-text-field v-model="formData.username" :label="system.login.username" :rules="getFormRules" />
      <v-text-field v-model="formData.password" :label="system.login.password" :rules="getFormRules" />
      <v-checkbox v-model="rememberMe" :label="system.login.rememberMe" />
      <v-btn @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">{{ system.login.forgetPassword }}</v-btn>
      <v-btn block :loading="loading" o@click="handleLogin" type="submit">{{ system.login.loginButton }}</v-btn>
      <v-btn block @click="setLoginState(LoginStateEnum.REGISTER)">{{ system.login.registerButton }}</v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="less">

</style>
