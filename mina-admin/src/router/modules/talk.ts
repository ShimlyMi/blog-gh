
export default {
  path: "/talk",
  meta: {
    title: '说说管理',
    icon: 'mdi-chat-processing',
    rank: 2,
    showLink: true
  },
  children: [
    {
      path: "/talk/list",
      name: 'talkList',
      component: () => import('@/pages/feature/talk/index.vue'),
      meta: {
        title: '说说列表',
        showLink: true
      }
    },
    {
      path: "/talk/add",
      mame: "addTalk",
      component: () => import("@/pages/feature/talk/add-edit-talk.vue"),
      meta: {
        title: "发布说说",
        showLink: true
      }
    },
    {
      path: "/talk/edit",
      mame: "editTalk",
      component: () => import("@/pages/feature/talk/add-edit-talk.vue"),
      meta: {
        title: "修改说说",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable
