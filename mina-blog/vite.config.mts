// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import {defineConfig, loadEnv} from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(
    (command, mode) => {
      let env = loadEnv(mode, process.cwd())
      return {
        plugins: [
          VueRouter({
            dts: 'src/typed-router.d.ts',
          }),
          Layouts(),
          AutoImport({
            imports: [
              'vue',
              {
                'vue-router/auto': ['useRoute', 'useRouter'],
              }
            ],
            dts: 'src/auto-imports.d.ts',
            eslintrc: {
              enabled: true,
            },
            vueTemplate: true,
          }),
          Components({
            dts: 'src/components.d.ts',
          }),
          Vue({
            template: { transformAssetUrls },
          }),
          // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
          Vuetify({
            autoImport: true,
            styles: {
              configFile: 'src/styles/settings.scss',
            },
          }),
          Fonts({
            google: {
              families: [ {
                name: 'Roboto',
                styles: 'wght@100;300;400;500;700;900',
              }],
            },
          }),
        ],
        define: { 'process.env': {} },
        resolve: {
          alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
          },
          extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
          ],
        },
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `@import "./src/styles/variable.scss";`
            }
          }
        },
        server: {
          port: 3182,
          proxy: {
            [env.VITE_APP_BASE_API]: {
              // 要访问的域名
              target: env.VITE_APP_BASE_URL,
              changeOrigin: true,
              rewrite: (path) => {
                return path.replace(new RegExp('^' + env.VITE_APP_BASE_API))
              },
            }
          }
        },
      }
})
