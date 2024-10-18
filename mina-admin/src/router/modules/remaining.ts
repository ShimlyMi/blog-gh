import Layout from '@/layouts/default.vue'

const remainingRouter = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      showLink: true,
      icon: 'mdi-home',
      rank: 0
    },
    children: [
      {
        path: '/home',
        component: () => import('@/pages/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          showLink: true,
        }
      }
    ]
  }
] as Array<RouteConfigsTable>

export default remainingRouter
