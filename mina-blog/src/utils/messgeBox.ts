import {TYPE, useToast} from "vue-toastification";
import Notification from '../components/Notification/index.vue';

const toast = useToast();

export const messageSuccess = (title: string, content: string) => {
   toast({
     component: Notification,
     props: {
       title: title,
       content: content
     }
   }, {
     type: TYPE.SUCCESS
   })
}

export const messageWarning = (title: string,content: string) => {
  toast({
    component: Notification,
    props: {
      title: title,
      content: content
    }
  }, {
    type: TYPE.WARNING
  })
}

export const messageError = (title: string,content: string) => {
  toast({
    component: Notification,
    props: {
      title: title,
      content: content
    }
  }, {
    type: TYPE.ERROR
  })
}

export const messageInfo = (title: string,content: string) => {
  toast({
    component: Notification,
    props: {
      title: title,
      content: content
    }
  }, {
    type: TYPE.INFO
  })
}
