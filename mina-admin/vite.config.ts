// Plugins
import {wrapperEnv} from "./bulid/utils";
import {resolve} from "path";
import Vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import dayjs from "dayjs";

// Utilities
import {ConfigEnv, loadEnv, UserConfig} from 'vite'




/** 路径查找 */
const pathResolve = (dir: string): string => {
    return resolve(process.cwd(), '-', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
    /** 当前执行node命令时文件夹的地址（工作目录） */
    const root: string = process.cwd();
    const env = loadEnv(mode, root)
    const viteEnv = wrapperEnv(env)
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;
    const isBuild = command === 'build'
    return {
        base: VITE_PUBLIC_PATH,
        root,
        resolve: {
            alias: [
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/'
                },
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/'
                }
            ],
        },
        plugins: [
            Vue()
        ],
        server: {
            host: true,
            port: VITE_PORT,
            proxy: {
                // target: 'http://localhost:8888',
                // changeOrigin: true,
                "/api": {
                    //要访问的跨域的域名
                    target: "http://localhost:8888",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
        // esbuild: {
        //   pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
        // },
        define: {
            // setting vue-i18-next
            // Suppress warning
            __INTLIFY_PROD_DEVTOOLS__: false,
            __APP_INFO__: JSON.stringify(__APP_INFO__),
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
    }
}
