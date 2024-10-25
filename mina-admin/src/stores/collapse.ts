// Utilities
import { defineStore } from 'pinia'

export const useCollapseStore = defineStore('mi-collapse', {
  state: () => ({
    rail: false
  }),
  actions: {
    handleCollapse(rail: boolean) {
      this.rail = !rail
      return this.rail
    }
  }
})

export function useCollapseStoreHook() {
  return useCollapseStore()
}
