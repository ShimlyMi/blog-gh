/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import pinia from 'pinia'
import vuetify from "@/plugins/vuetify";

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import {setupRouter} from "@/router/copy";

const app = createApp(App)
setupRouter(app)

app.use(pinia).use(vuetify).mount('#app')
