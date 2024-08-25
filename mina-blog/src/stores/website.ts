import { defineStore } from "pinia";
import { WebsiteResponse } from "@/api/website/types";
import {getConfig} from "@/api/website";

export const useWebsiteStore = defineStore(
  "websiteStore",
  {
    persist: {
      storage: localStorage,
      paths: ['websiteState']
    },
    state: () => {
      return {
        websiteState: {} as WebsiteResponse,
        // blogName: '',
        // avatarBg: '',
        // blogAvatar: '',
        // blogNotice: '',
        // personalSignature: '',
      }
    },
    getters: {
      getWebsite(): WebsiteResponse {
        // console.log('get', this.websiteState)
        return this.websiteState

      }
    },
    actions: {
      async sendWebsiteConfig(): Promise<WebsiteResponse> {
        const websiteData = await getConfig()
        return Promise.resolve(websiteData)
      },

      setWebsiteConfig(data: WebsiteResponse) {
        this.websiteState = data
        // console.log('set',data)
      }
    }
  }
)
