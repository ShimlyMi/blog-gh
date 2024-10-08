const Layout = () => import('@/layouts/default.vue')
export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/system/login/Login.vue'),
    meta: { title: '登录', showLink: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/system/login/RegisterForm.vue'),
    meta: {
      title: '注册',
      showLink: false,
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      showLink: false,
      rank: 104
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/layouts/redirect.vue'),
        meta: {
          showLink: false,
        }
      }
    ]
  }
  // setupLayouts([
  //   {
  //     path: '/redirect',
  //
  //   }
  // ])
] as Array<RouteConfigsTable>
