import {BasicPageEnum} from "/@/enums/pageEnum.ts";


export const remainingRouter =  [
    {
        path: '/',
        name: 'Home',
        redirect: BasicPageEnum.BASE_HOME,
        meta: {
            title: '主页'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('/@/pages/system/login/Login.vue'),
        meta: {
            title: '登录'
        }
    }
] as Array<RouteConfigTable>

// extends const basicRoutes = [ remainingRouter]
