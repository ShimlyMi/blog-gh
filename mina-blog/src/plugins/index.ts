/**
 * plugins/article.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import Toast, {PluginOptions, POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";

// Types
import type {App} from 'vue'

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: false,
  closeButton: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: false,
  showCloseButtonOnHover: false,
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true
}

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(Toast, options)
}
