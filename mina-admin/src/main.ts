/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import pinia from '@/stores'
import vuetify from "@/plugins/vuetify";
import { setupRouter } from '@/router'
import './router/permission'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'


const boostrap = async () => {
  const app = createApp(App)
  setupRouter(app)
  app.use(pinia)
  app.use(vuetify)
  app.mount('#app')
}

boostrap()
