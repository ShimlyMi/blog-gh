import Request from "@/utils/http/request";


/** 分页获取文章 按照置顶和发布时间倒序排序 */
export const homeGetArticle = (current: number, size: number) => {
    return new Promise((resolve) => {
        Request.post(`/api/article/blogHomeGetArticleList/${current}/${size}`, {})
            .then((res: any) => {
            resolve(res);
        })
    })
}

/** 分页获取文章归档 */
export const getTimeLineArticleList = (current: number, size: number) => {
    return new Promise((resolve) => {
        Request.post(`/api/article/blogTimeLineGetArticleList/${current}/${size}`, {})
            .then((res: any) => {
                resolve(res);
            })
    })
}

export const blogGetArticleListByMonth = (current: number, size: number) => {
    return new Promise((resolve) => {
        Request.post(`/api/article/blogGetArticleListByMonth/${current}/${size}`, {})
            .then((res: any) => {
                resolve(res);
            })
    })
}

/** 获取当前文章详情 */
export const getArticleById = (id?: number) => {
    return new Promise((resolve) => {
        Request.post(`/api/article/getArticleById/${id}/`, {})
            .then((res: any) => {
                resolve(res);
            })
    })
}

/** 分页获取该 分类 下的文章简略信息 */
export const getArticleListByCId = (params?: object) => {
    return new Promise((resolve) => {
        Request.post("/api/article/getArticleListByCategoryId", params)
            .then((res: any) => {
                resolve(res);
            })
    })
}

/** 分页获取该 标签 下的文章简略信息 */
export const getArticleListByTId = (params?: object) => {
    return new Promise((resolve) => {
        Request.post("/api/article/getArticleListByTagId", params)
            .then((res: any) => {
                resolve(res);
            })
    })
}

/** 分页获取上下一篇文章 和 推荐文章 */
export const getRecommendArticleById = (id?: number) => {
    return new Promise((resolve) => {
        Request.post(`/api/article/getRecommendArticleById/${id}/`, {})
            .then((res: any) => {
                resolve(res);
            })
    })
}

/** 全局搜索 */
export const getArticleListByContent = (content?: any) => {
    return new Promise((resolve) => {
        Request.post(`/api/article/getRecommendArticleById/${content}/`, {})
            .then((res: any) => {
                resolve(res);
            })
    })
}

// 获取热门文章
export const getHotArticle = (data?: any) => {
    return new Promise((resolve) => {
        Request.post("/api/article/getHotArticle", {data})
            .then((res: any) => {
                resolve(res);
            })
    })
}

/** 文章点赞 */
export const articleLike = (id?: number) => {
    return new Promise((resolve) => {
        Request.post(`/api/article/like/${id}/`, {})
            .then((res: any) => {
                resolve(res);
            })
    })
}

/** 取消文章点赞 */
export const cancelArticleLike = (id?: number) => {
    return new Promise((resolve) => {
        Request.post(`/api/article/cancelLike/${id}/`, {})
            .then((res: any) => {
                resolve(res);
            })
    })
}

/** 增加文章阅读时长 */
export const addReadingDuration = (data?: any) => {
    return new Promise((resolve) => {
        Request.post("/api/article/addReadingDuration", {data})
            .then((res: any) => {
                resolve(res);
            })
    })
}
