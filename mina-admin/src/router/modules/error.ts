export default {
  path: '/error',
  redirect: '/error/403',
  meta: {
    // title: 'informationLine',
    title: '异常页面',
    showLink: false,
    rank: 9
  },
  children: [
    {
      path: '/error/403',
      name: '403',
      component: () => import('@/pages/error/403.vue'),
      meta: {
        title: '403',
        showLink: false,
      }
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('@/pages/error/404.vue'),
      meta: {
        title: '404',
        showLink: false,
      }
    },
    {
      path: '/error/500',
      name: '500',
      component: () => import('@/pages/error/500.vue'),
      meta: {
        title: '500',
        showLink: false,
      }
    }
  ]
} as RouteConfigsTable