import { defineStore } from "pinia";
import {conversion, imgUpload} from "@/api/system/static";

interface UploadStore {
    imgList: any[]
}
export const useUploadStore = defineStore(
    'upload',
    {
        state: ():UploadStore => ({
            imgList: []
        }),
        actions: {
            async uploadImg(imgList: any[]) {
                const conversionPromiseList = imgList.map(async v => {
                    return await conversion(v.raw)
                })
                const conversionUploadList = [];
                await Promise.all(conversionPromiseList).then(res => {
                    res.map(raw => {
                        conversionUploadList.push({ raw })
                    })
                })
                const promiseList = conversionUploadList.map(async v => {
                    return await imgUpload(v)
                })
                // await Promise.all(promiseList).then(res => {
                //     res.map(img => {
                //         const { url } = img
                //         const obj = route.query.id
                //             ? { id: route.query.id, url: url }
                //             : { url };
                //         resetList.push(obj);
                //     })
                // })
            }
        }
    }
)
