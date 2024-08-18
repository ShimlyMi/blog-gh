import {useToast} from "vue-toastification";

const toast = useToast();

export const messageSuccess = (content: string) => {
   toast.success(content)
}

export const messageWarning = (content: string) => {
  toast.warning(content)
}

export const messageError = (content: string) => {
  toast.error(content)
}

export const messageInfo = (content: string) => {
  toast.info(content)
}
