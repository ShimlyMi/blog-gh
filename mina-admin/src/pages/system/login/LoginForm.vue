<script setup lang="ts">
  import {ref, computed, unref} from 'vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import system from '@/locale/system'
  import { LoginStateEnum, useLoginState, REGEXP_PWD } from '@/pages/system/login/useLogin'
  import { useUserStoreHook } from "@/stores/user";
  import {storageLocal} from "@/interface/session";
  import {loginApi} from "@/api/system/user";

  type ruleFormType = {
    username: string,
    password: string
  }
  const formRef = ref()
  const loading = ref(false)
  const rememberMe = ref(false)
  const formData = ref<ruleFormType>({
    username: '',
    password: '',
  })
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
    const res = await loginApi(formData.value)
    console.log(res)
    // if (formRef.value) {
    //   await formRef.value.validate(async (valid: any, fields: any) => {
    //     if (valid) {
    //       if (rememberMe.value) {
    //         storageLocal.setItem('loginInfo', formData.value)
    //       } else {
    //         storageLocal.removeItem('loginInfo')
    //       }
    //
    //     }
    //   })
    // }
  }

</script>

<template>
  <v-sheet class="mi-login">
    <LoginFormTitle v-show="getShow" />
    <v-form v-show="getShow" ref="formRef" :model="formData" >
      <v-text-field
        v-model="formData.username"
        :label="system.login.username"
        :rules="usernameRules"
        required
      />
      <v-text-field
        v-model="formData.password"
        :label="system.login.password"
        :rules="passwordRules"
        required
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
