/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// const app = createApp(App)

async function boostrap () {
  const app = createApp(App)
  registerPlugins(app)
  app.mount('#app')
}

// registerPlugins(app)

// app.mount('#app')

boostrap()
