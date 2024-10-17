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
  //   const newTree = cloneDeep(data).filter(
  //       (v: { path: '/', meta: { showLink: boolean } }) => {
  //           return v.path !== '/' && v.meta?.showLink !== false
  //       }
  //   );
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

/**
 * 将多级嵌套路由处理成一维数组
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList
  let hierarchyList = buildHierarchyTree(routesList);
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

/**
 * 一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
 * https://github.com/pure-admin/vue-pure-admin/issues/67
 * @param routesList 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成规定路由的格式
 */
function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  const newRoutesList: RouteRecordRaw[] = [];
  routesList.forEach((v: RouteRecordRaw) => {
    if (v.path === "/") {
        newRoutesList.push({
            component: v.component,
            name: v.name,
            path: v.path,
            redirect: v.redirect,
            meta: v.meta,
            children: []
        });
    } else {
      newRoutesList[0]?.children.push({ ...v });
    }
  });
  return newRoutesList;
}


/** 通过指定 `key` 获取父级路径集合，默认 `key` 为 `path` */
function getParentPaths(value: string, routes: RouteRecordRaw[], key = "path") {
  // 深度遍历查找
  function dfs(routes: RouteRecordRaw[], value: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // 返回父级path
      if (item[key] === value) return parents;
      // children不存在或为空则不递归
      if (!item.children || !item.children.length) continue;
      // 往下查找时将当前path入栈
      parents.push(item.path);

      if (dfs(item.children, value, parents).length) return parents;
      // 深度遍历查找未找到时当前path 出栈
      parents.pop();
    }
    // 未找到时返回空数组
    return [];
  }

  return dfs(routes, value, []);
}

/** 查找对应 `path` 的路由信息 */
// function findRouteByPath(path: string, routes: RouteRecordRaw[]) {
//   let res = routes.find((item: { path: string }) => item.path == path);
//   if (res) {
//     for (let i = 0; i < routes.length; i++) {
//       if (
//         routes[i].children instanceof Array &&
//         routes[i].children.length > 0
//       ) {
//         res = findRouteByPath(path, routes[i].children);
//       }
//     }
//     return null;
//   }
// }

/** 获取所有菜单中的第一个菜单（顶级菜单）*/
function getTopMenu(tag = false): menuType {
  const topMenu = usePermissionStoreHook().wholeMenus[0]?.children[0];
  return tag && topMenu;
}

export {
  formatFlatteningRoutes,
  formatTwoStageRoutes,
  filterTree,
  filterChildrenTree,
  getParentPaths,
  // findRouteByPath,
    ascending,
  getTopMenu
}
