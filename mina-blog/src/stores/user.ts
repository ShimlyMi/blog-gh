import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  {
    persist: {
      enabled: true,
      strategies: [{
        key: "userState",
        storage: localStorage,
      }]
    },
    /** 管理用户数据 */
    state: () => {
      return {
        blogAvatar: "",
      }
    },
    getters: {
      getBlogAvatar() {
        return this.blogAvatar
      }
    },
    actions: {
      setBlogAvatar(avatar) {
        this.blogAvatar = avatar
      }
    }
  }
)
