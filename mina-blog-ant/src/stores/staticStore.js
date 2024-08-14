import { defineStore } from "pinia";

// 可以去看看vueUse怎么使用useDark 这个可以快速切换主题
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark({
    // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
    storageKey: "useDarkKEY",
    // 暗黑class名字
    valueDark: "dark",
    // 高亮class名字
    valueLight: "light",
});
const toggle = useToggle(isDark);

export const staticData = defineStore("staticData", {
    persist: {
        enabled: true, // 数据持久化
        strategies: [{
            // 自定义存储的 key，默认是 store.$id
            key: "staticState",
            // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
            storage: localStorage
        }]
    },
    state: () => {
        return {
            // md 浏览的主题列表
            previewThemeList: ["default", "github", "vuepress", "mk-cute", "smart-blue", "cyanosis"],
            // md 代码主题列表

        }
    }
})
