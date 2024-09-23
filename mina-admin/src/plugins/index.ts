
// Plugins
import vuetify from "./vuetify.ts";
import {router} from '../router'

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
    app.use(vuetify)
        .use(router)
}
