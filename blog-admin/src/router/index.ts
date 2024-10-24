/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/home/index.vue'),
      meta: {
        title: '主页',
        icon: 'mdi-home',
      },
    },
    {
      path: '/personality',
      name: 'Center',
      component: () => import('@/pages/personality/index.vue'),
      meta: {
        title: '个人中心',
        icon: 'mdi-account-circle',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/system/login/Login.vue'),
      meta: {
        title: '登录',
        showLink: false,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/system/login/RegisterForm.vue'),
      meta: {
        title: '注册',
        showLink: false,
      },
    },
  ],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
