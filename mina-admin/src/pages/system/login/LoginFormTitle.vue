<script setup lang="ts">
  import { computed, unref } from 'vue'
  import { LoginStateEnum, useLoginState } from './useLogin'
  import system from '@/locale/system'

  const { getLoginState } = useLoginState()
  const getFormTitle = computed(() => {
    const titleObj = {
      [LoginStateEnum.RESET_PASSWORD]: system.login.forgetFormTitle,
      [LoginStateEnum.LOGIN]: system.login.signInFormTitle,
      [LoginStateEnum.REGISTER]: system.login.signUpFormTitle,
    }
    return titleObj[unref(getLoginState)]
  })
</script>

<template>
  <h2>{{ getFormTitle }}</h2>
</template>

<style scoped lang="less">

</style>
