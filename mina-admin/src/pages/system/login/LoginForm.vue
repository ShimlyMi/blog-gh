<script setup lang="ts">
  import {ref, computed, unref} from 'vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import system from '@/locale/system'
  import {LoginStateEnum, useLoginState, REGEXP_PWD} from '@/pages/system/login/useLogin'
  import { useUserStore } from "@/stores/user";
  import {messageError, messageSuccess} from "@/utils/messgeBox";

  const userStore = useUserStore()
  const formRef = ref()
  const loading = ref(false)
  const usernameRef = ref<string>('')
  const passwordRef = ref<string>('')
  const valid = ref<boolean>(true)
  const rememberMe = ref(false)
  const showPassword = ref(false)
  const { getLoginState } = useLoginState()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)
  const usernameRules = [
    v => !!v || system.login.accountPlaceholder,
  ]
  const passwordRules = [
    v => !!v || system.login.passwordPlaceholder,
    v => v.length >= 8 && v.length <= 16 && REGEXP_PWD.test(v) || '密码格式应为6-18位数字、字母、符号的任意两种组合'
  ]

  const handleLogin = async () => {
    const form = unref(formRef)
    if (!form) return
    await form.validate()
    if (valid.value) {
      const username = unref<string>(usernameRef)
      const password = unref<string>(passwordRef)
      let data = { username, password }
        await userStore.login(data)
        // console.log(res)
      // try {
      //   let userInfo = await userStore.login(data)
      //     console.log(userInfo)
      //   messageSuccess('欢迎回来', `${userInfo?.nickname}${system.login.loginSuccessTitle}`)
      // } catch (error) {
      //   messageError(`${system.api.errorTip}`, `${system.api.networkExceptionMsg}`)
      // }
    }
  }

</script>

<template>
  <v-sheet class="mi-login">
    <LoginFormTitle v-show="getShow" />
    <v-form v-show="getShow" ref="formRef" v-model="valid" >
      <v-text-field
        v-model="usernameRef"
        :label="system.login.username"
        :rules="usernameRules"
        prepend-inner-icon="mdi-account"
        :placeholder="system.login.accountPlaceholder"
        required
      />
      <v-text-field
        v-model="passwordRef"
        :label="system.login.password"
        :rules="passwordRules"
        :type="showPassword ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :placeholder="system.login.passwordPlaceholder"
        required
        @click:append-inner="showPassword = !showPassword"
      />
      <v-checkbox v-model="rememberMe" :label="system.login.rememberMe" />
      <v-btn>{{ system.login.forgetPassword }}</v-btn>
      <v-btn block :loading="loading" @click="handleLogin">{{ system.login.loginButton }}</v-btn>
      <v-btn block>{{ system.login.registerButton }}</v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="scss">

</style>
