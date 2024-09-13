import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const users: AppRouteModule = {
  path: '/users',
  name: 'User',
  component: LAYOUT,
  redirect: '/users/center',
  meta: {
    icon: 'ion:account-book-outlined',
    title: t('routes.dashboard.users.center'),
  },
  children: [
    {
      path: 'center',
      name: 'Center',
      component: () => import('/@/views/users/center/index.vue'),
      meta: {
        title: t('routes.dashboard.userInfo'),
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
}

export default users
