import { defineStore } from "pinia";

export const useBarrageStore = defineStore('barrage',
    {
        state: () => {
            return {
                barrageList: []
            }
        },
        getters: {
            getBarrageList() {
                return this.barrageList
            }
        },
        actions: {
            setBarrageList(message) {
                this.barrageList.push(message);
            }
        }
    });
