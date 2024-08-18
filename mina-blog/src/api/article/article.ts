import Request from "@/utils/http/request";
// import { PageArticle } from "@/api/article/types/request";

/** 分页获取文章 按照置顶和发布时间倒序排序 */
export const homeGetArticleList = (current: number, size: number) => {
  return Request.post(`/api/article/blogHomeGetArticleList/${current}/${size}`, {})
}

/** 分页获取文章归档 */
export const getTimeLineArticleList = (current: number, size: number) => {
    return Request.post(`/api/article/blogTimeLineGetArticleList/${current}/${size}`, {})
}

export const blogGetArticleListByMonth = (current: number, size: number) => {
    return  Request.post(`/api/article/blogGetArticleListByMonth/${current}/${size}`, {})
}

/** 获取当前文章详情 */
export const getArticleById = (id?: number) => {
    return  Request.post(`/api/article/getArticleById/${id}/`, {})
}

/** 分页获取该 分类 下的文章简略信息 */
export const getArticleListByCId = (params?: object) => {
    return Request.post("/api/article/getArticleListByCategoryId", params)
}

/** 分页获取该 标签 下的文章简略信息 */
export const getArticleListByTId = (params?: object) => {
    return Request.post("/api/article/getArticleListByTagId", params)
}

/** 分页获取上下一篇文章 和 推荐文章 */
export const getRecommendArticleById = (id?: number) => {
    return Request.post(`/api/article/getRecommendArticleById/${id}/`, {})
}

/** 全局搜索 */
export const getArticleListByContent = (content?: any) => {
    return Request.post(`/api/article/getRecommendArticleById/${content}/`, {})
}

// 获取热门文章
export const getHotArticle = (data?: any) => {
    return Request.post("/api/article/getHotArticle", {data})
}

/** 文章点赞 */
export const articleLike = (id?: number) => {
    return Request.post(`/api/article/like/${id}/`, {})
}

/** 取消文章点赞 */
export const cancelArticleLike = (id?: number) => {
    return Request.post(`/api/article/cancelLike/${id}/`, {})
}

/** 增加文章阅读时长 */
export const addReadingDuration = (data?: any) => {
    return Request.post("/api/article/addReadingDuration", {data})
}
