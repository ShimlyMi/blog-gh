// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import * as dayjs from 'dayjs'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import type {ConfigEnv, UserConfigExport} from "vite";
import {defineConfig, loadEnv} from 'vite'
import { fileURLToPath, URL } from 'node:url'
import {resolve} from "path";
import pkg from './package.json'

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd();

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '-', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, root)
  const viteEnv =
}
