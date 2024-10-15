import type { AppRouteRecordRaw } from "@/router/types";
import { REDIRECT_NAME, LAYOUT, PAGE_NOT_FOUND_NAME } from "@/router/constant";

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/error',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/error/403',
      name: '403',
      component: () => import('@/pages/error/403.vue'),
      meta: {
        title: '403',
        hideBreadcrumb: true,
        hideMenu: true,
      }
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('@/pages/error/404.vue'),
      meta: {
        title: '404',
        hideBreadcrumb: true,
        hideMenu: true,
      }
    },
    {
      path: '/error/500',
      name: '500',
      component: () => import('@/pages/error/500.vue'),
      meta: {
        title: '500',
        hideBreadcrumb: true,
        hideMenu: true,
      }
    }
  ]
}

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: "/redirect",
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/layouts/redirect.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      }
    }
  ]
}
