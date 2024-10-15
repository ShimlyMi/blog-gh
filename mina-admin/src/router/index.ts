import { createRouter, createWebHistory } from "vue-router";
import type {AppRouteRecordRaw} from "@/router/copy/types";
import {useUserStoreHook} from "@/stores/user";

const Layout = () =>import("@/layouts/default.vue.vue");
const modules = import.meta.glob('../modules/**/*.ts', { eager: true });
const routeModuleList = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
console.log("routeModuleList", routeModuleList)

const systemRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/home/index.vue'),
        meta: {
          title: '首页',
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/system/login/Login.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...systemRoutes]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStoreHook()
  if (to.path === '/login') {
    next()
  }
  if (userStore.userInfo)
})
