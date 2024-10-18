import Layout from '@/layouts/default.vue'
export default {
  path: "/talk",
  component: Layout,
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
      mame: "addEditTalk",
      component: () => import("@/pages/feature/talk/add-edit-talk.vue"),
      meta: {
        title: "发布说说",
        showLink: true
      }
    },
    {
      path: "/talk/edit",
      mame: "addEditTalk",
      component: () => import("@/pages/feature/talk/add-edit-talk.vue"),
      meta: {
        title: "修改说说",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable
