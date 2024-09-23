import { createApp } from 'vue'
import { registerPlugins } from "./plugins";

import App from './App.vue'

const app = createApp(App)

// async function boostrap () {
//     const app = createApp(App)
//     registerPlugins(app)
//     app.mount('#app')
// }

registerPlugins(app)

app.mount('#app')

// boostrap()
