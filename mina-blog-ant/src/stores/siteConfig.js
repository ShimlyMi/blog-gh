import { defineStore } from 'pinia';

export const useConfigStore = defineStore("config", {
    persist: {
        enabled: true, // 数据持久化
        strategies: [{
            // 自定义存储的 key，默认是 store.$id
            key: "detailStore",
            // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
            storage: sessionStorage,
            // state 中的字段名，按组打包储存
            // paths: ["foo", "bar"]
        }]
    },
    state: () => {
        return {
            webDetail: {}
        }
    },
    actions: {
        setWebDetail(webDetail) {
            this.webDetail = webDetail
        }
    },
    getters: {
        getWebDetail() {
            return this.webDetail
        }
    }
})
