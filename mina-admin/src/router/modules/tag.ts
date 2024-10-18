export default {
  path: "/tag",
  meta: {
    title: '标签管理',
    icon: 'mdi-chat-processing',
    rank: 4,
    showLink: true
  },
  children: [
    {
      path: "/tag/list",
      name: 'tagList',
      component: () => import('@/pages/feature/tag/index.vue'),
      meta: {
        title: '标签列表',
        showLink: true
      }
    }
  ]
} as RouteConfigsTable
