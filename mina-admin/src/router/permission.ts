import {RouteComponent, RouteRecordRaw} from "vue-router";
import {cloneDeep} from "lodash-es";
// import { isProxy, toRaw } from "vue";
import {buildHierarchyTree} from "@/utils/tree";
import {usePermissionStoreHook} from "@/stores/permission";
import {menuType} from "@/layouts/types";
import {isEmpty} from "@/utils/is";


function handRank(routeInfo: any) {
  const { name, path, parentId, meta } = routeInfo;
  return isEmpty(parentId)
    ? isEmpty(meta?.rank) ||
    (meta?.rank === 0 && name !== "Home" && path !== "/")
      ? true
      : false
    : false;
}

/** 按照路由中meta下的rank等级升序来排序路由 */
function ascending(arr: any[]) {
  arr.forEach((v, index) => {
    // 当rank不存在时，根据顺序自动创建，首页路由永远在第一位
    if (handRank(v)) v.meta.rank = index + 2;
  });
  return arr.sort(
    (a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
      return a?.meta.rank - b?.meta.rank;
    }
  );
}


/** 过滤meta中showLink为false的菜单 */
function filterTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter(
    (v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false
  );
  newTree.forEach(
    (v: { children }) => v.children && (v.children = filterTree(v.children))
  );
  return newTree;
}


/** 过滤meta中showLink为false的菜单 */
function filterHomeTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter(
      (v: { path: '/', meta: { showLink: boolean } }) => {
          return v.path !== '/' && v.meta?.showLink !== false
      }
  );
  newTree.forEach(
      (v: { children }) => v.children && (v.children = filterTree(v.children))
  );
  return newTree;
}
/** 过滤children长度为0的的目录，当目录下没有菜单时，会过滤此目录，目录没有赋予roles权限，当目录下只要有一个菜单有显示权限，那么此目录就会显示 */
function filterChildrenTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter((v: any) => v?.children?.length !== 0);
  newTree.forEach(
    (v: { children }) => v.children && (v.children = filterTree(v.children))
  );
  return newTree;
}


function flatRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  const newRoutesList: RouteRecordRaw[] = [];
  routesList.forEach(route => {
    newRoutesList.push(route)
    if (route.children) {
      flatRoutes(route.children)
    }
  })
  return newRoutesList
}


export {
  filterTree,
  filterChildrenTree,
  filterHomeTree,
  flatRoutes,
  ascending,
}
