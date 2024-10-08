/**
 * @description 提取菜单树中的每一项uniqueId
 * @param tree 树
 * @returns 每一项uniqueId组成的数组
 */
// export const extractPathList = (tree: any[]): any => {
//   if (!Array.isArray(tree)) {
//     console.warn('菜单树必须是一个数组')
//     return []
//   }
//   if (!tree || tree.length === 0) return []
//   const expandedPaths: Array<number | string> = []
//   for (const n of tree) {
//     const hasChildren = n.children && n.children.length > 0
//     if (hasChildren) {
//       expandedPathsList(n.children)
//     }
//   }
// }



/**
 * @description 创建层级关系
 * @param tree 树
 * @param pathList 每一项的id组成的数组
 * @returns 创建层级关系后的树
 */
export const buildHierarchyTree = (tree: any[], pathList = []): any => {
  if (!Array.isArray(tree)) {
    console.warn('菜单树必须是一个数组')
    return []
  }
  if (!tree || tree.length === 0) return []
  for (const [key, node] of tree.entries()) {
    node.id = key
    node.parentId = pathList.length ? pathList[pathList.length - 1] : null
    node.pathList = [...pathList, node.id]
    const hasChildren = node.children && node.children.length > 0
    if (hasChildren) {
      buildHierarchyTree(node.children, node.pathList)
    }
  }
  return tree
}
