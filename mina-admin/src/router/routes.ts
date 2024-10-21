import Layout from "@/layouts/default.vue";

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/system/login/Login.vue'),
    meta: {
      showLink: false
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
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
  },
  {
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
  },
  {
    path: "/tag",
    component: Layout,
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
  },
  {
    path: "/category",
    component: Layout,
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
    ]
  },
  {
    path: '/404',
    component: () => import('@/pages/error/404.vue')
  }
] as Array<RouteConfigsTable>
