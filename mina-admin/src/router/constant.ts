export const REDIRECT_NAME = 'Redirect'
export const PARENT_LAYOUT_NAME = 'ParentLayout'
export const PAGE_NOT_FOUND = 'PageNotFound'
/**
 * @description: default layout
 */
export const layout = () => import('/@/layouts/default.vue')
/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
    return () =>
        new Promise((resolve) => {
            resolve({
                name: PARENT_LAYOUT_NAME,
            })
        })
}
