<script setup lang="ts">
  import LoginFormTitle from './LoginFormTitle.vue'
  import system from '@/locale/system'
  import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from '@/pages/system/login/useLogin'
</script>

<template>
  <v-sheet>
    <LoginFormTitle />
    <v-form>
      <v-text-field :label="system.login.username" :rules="useFormRules" />
      <v-text-field :label="system.login.password" :rules="useFormRules" />
      <v-checkbox :label="system.login.rememberMe" />
      <v-btn>{{ system.login.forgetPassword }}</v-btn>
      <v-btn block type="submit">{{ system.login.loginButton }}</v-btn>
      <v-btn block>{{ system.login.registerButton }}</v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="less">

</style>
