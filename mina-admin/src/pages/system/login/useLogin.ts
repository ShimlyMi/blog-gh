import { required, sameAs } from '@vuelidate/validators'

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

const getAccountFormRule = computed(() => createRule(system.login.accountPlaceholder))
const getPasswordFormRule = computed(() => createRule(system.login.passwordPlaceholder))
const validateConfirmPassword = (password: string) => sameAs(password)



export function useFormRules (formData?: Recordable) {
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
    case LoginStateEnum.RESET_PASSWORD: {
      return { account: accountFormRule }
    }
    default:
      return {
        account: accountFormRule,
        password: passwordFormRule,
      }
  }
}

export function createRule (message: string) {
  return {
    required,
    message,
    trigger: 'blur',
  }
}
