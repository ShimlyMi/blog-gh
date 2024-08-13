import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { MessageBox } from "@/components/MessageBox";

const vuetify = createVuetify({
  components,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#111111',
          secondary: '#4DB6AC',
        },
      },
      dark: {
        colors: {
          primary: '#EEEEEE',
          secondary: '#FAFAFA',
        },
      },
    },
  },
})

/**
 * @param { Object } options // 配置项
 */
let timeId
export default function VFNotification(options: any) {
  const app = createApp(MessageBox, {
    ...options,
    onClick() {
      if (options.showClose) {
        app.unmount()
        div.remove()
      }
    },
  })
  const div = document.createElement('div')
  document.body.appendChild(div)
  app.use(vuetify)
  app.mount(div)
  const { timeout } = options || {};
  timeId = setTimeout(() => {
    app.unmount()
    div.remove()
  }, timeout || 3000)
}
