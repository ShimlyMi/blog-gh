export const userRouter = [
    {
        path: '/users',
        name: 'User',
        component: () => import('@/pages/personality/index.vue'),
        meta: {
            title: '个人中心'
        }
    }
] as RouteConfigTable
