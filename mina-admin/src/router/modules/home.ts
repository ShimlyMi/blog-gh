const Layout = () => import('@/layouts/default.vue')
const { VITE_HIDE_HOME } = import.meta.env;
export default {
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: {
    title: '首页',
    rank: 0
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/home/index.vue'),
      meta: {
        title: '首页',
        icon: 'mdi-home',
        showLink: VITE_HIDE_HOME !== 'true'
      }
    }
  ]
} as RouteConfigsTable
