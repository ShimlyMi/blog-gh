import { computed, Ref, ref, unref } from 'vue'
// import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import system from '@/locale/system'

export enum LoginStateEnum {
    LOGIN,
    REGISTER,
    RESET_PASSWORD,
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState () {
  function setLoginState (state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin () {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormValid<T extends Object = any> (formRef: Ref<any>) {
  async function validForm () {
    const form = unref(formRef)
    if (!form) return
    const data = await form.validate()
    return data as T
  }
  return { validForm }
}

export function useFormRules (formData?: Record<string, T>) {
  const getAccountFormRule = computed(() => createRule(system.login.accountPlaceholder))
  const getPasswordFormRule = computed(() => createRule(system.login.passwordPlaceholder))
  const validateConfirmPassword = (password: string) => {
    return async (value: string) => {
      if (!value) {
        return Promise.reject(system.login.passwordPlaceholder)
      }
      if (value !== password) {
        return Promise.reject(system.login.diffPwd)
      }
    }
  }

  const getFormRules = computed(() => {
    const accountFormRule = unref(getAccountFormRule)
    const passwordFormRule = unref(getPasswordFormRule)

    switch (unref(currentState)) {
      case LoginStateEnum.REGISTER:
        return {
          account: accountFormRule,
          password: passwordFormRule,
          confirmPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
          ],
        }
      case LoginStateEnum.RESET_PASSWORD:
        return {
          account: accountFormRule,
        }
      default:
        return {
          account: accountFormRule,
          password: passwordFormRule,
        }
    }
  })

  return { getFormRules }
}

function createRule (message: string) {
  return [
    {
      required,
      message,
      trigger: 'change',
    },
  ]
}
