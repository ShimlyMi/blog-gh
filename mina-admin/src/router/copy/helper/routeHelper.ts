import type { AppRouteRecordRaw, AppRouteModule } from "@/router/copy/types";
import type {Router, RouteRecordNormalized} from "vue-router";
import {EXCEPTION_COMPONENT, getParentLayout, LAYOUT} from "@/router/copy/constant";
import { cloneDeep, omit } from 'lodash-es'
import { warn } from "@/utils/log";
import { createRouter, createWebHistory } from "vue-router";

export type LayoutMapKey = 'LAYOUT'
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()
LayoutMap.set('LAYOUT', LAYOUT)

let dynamicViewsModules: Record<string, () => Promise<Recordable>>

function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../pages/**/*.{vue, tsx}')
  if (!routes) return
  routes.forEach((item) => {
    const { component, name, children } = item
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase())
      if (layoutFound) {
        item.component = layoutFound()
      } else {
        item.component = dynamicImport(dynamicViewsModules, component as string)
      }
    } else if (name) {
      item.component = getParentLayout()
    }
    children && asyncImportRoute(children)
  })
}

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../pages', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  } else if (matchKeys?.length > 1) {
    warn('请不要在`page`目录下的相同名字的目录里创建相同名字的`.vue`和`.tsx`文件')
    return
  } else {
    warn('在 src/pages/下找不到' + component + '.vue ` 或 `' + component + '.tsx`, 请自行创建')
    return EXCEPTION_COMPONENT
  }
}

export function transformObjToRoute<T = AppRouteModule>(routeList: AppRouteRecordRaw[]): T[] {
  routeList.forEach((route) => {
    const component = route.component as string
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase())
      } else {
        route.children = [cloneDeep(route)]
        route.component = LAYOUT
        route.name = `${route.name}Parent`
        route.path = ''
        const meta = route.meta || {}
        meta.single = true
        meta.affix = false
        route.meta = meta
      }
    } else {
      warn('请正确配置路由：' + route?.name + '的component属性')
    }
    route.children && asyncImportRoute(route.children)
  })

  return routeList as unknown as T[]
}

/**
 * Convert multi-level routing to level 2 routing
 * 将多级路由转换为 2 级路由
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules)
  for (let i = 0; i < modules.length; i++) {
    const routeModule = modules[i]
    // 判断级别是否 多级 路由
    if (!isMultipleRoute(routeModule)) {
      // 声明终止当前循环， 即跳过此次循环，进行下一轮
      continue
    }
    // 路由等级提升
    promoteRouteLevel(routeModule)
  }
  return modules
}

function promoteRouteLevel(routeModule: AppRouteModule) {
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHistory()
  })
  // 获取所有路由 完整列表
  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null

  routeModule.children = routeModule.children?.map((item) => omit(item, 'children'))
}

function addToChildren(routes: RouteRecordNormalized[], children: AppRouteRecordRaw[], routeModule: AppRouteModule) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false
  }
  const children = routeModule.children
  let flag = false
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.children?.length) {
      flag = true
      break
    }
  }
   return flag
}
