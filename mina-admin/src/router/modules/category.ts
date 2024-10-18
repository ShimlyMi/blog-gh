export default {
  path: "/category",
  meta: {
    title: '分类管理',
    icon: 'mdi-chat-processing',
    rank: 3,
    showLink: true
  },
  children: [
    {
      path: "/category/list",
      name: 'categoryList',
      component: () => import('@/pages/feature/category/index.vue'),
      meta: {
        title: '分类列表',
        showLink: true
      }
    },
    // {
    //   path: "/category/add",
    //   mame: "categoryTalk",
    //   component: () => import("@/pages/feature/talk/add-edit-talk.vue"),
    //   meta: {
    //     title: "发布说说",
    //     showLink: true
    //   }
    // },
    // {
    //   path: "/category/edit",
    //   mame: "categoryTalk",
    //   component: () => import("@/pages/feature/talk/add-edit-talk.vue"),
    //   meta: {
    //     title: "修改说说",
    //     showLink: false
    //   }
    // }
  ]
} as RouteConfigsTable
