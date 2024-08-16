import Request from "@/utils/http/request";

export const getCategoryDic = () => {
    return new Promise((resolve) => {
        Request.get("/api/utils/getCategoryDictionary", {}).then((res: any) => {
            resolve(res);
        })
    })
};
