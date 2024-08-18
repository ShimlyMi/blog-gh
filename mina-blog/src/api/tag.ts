import Request from "@/utils/http/request";

export const getTagDic = () => {
    return new Promise((resolve) => {
        Request.get("/api/utils/getTagDictionary", {}).then((res: any) => {
            resolve(res);
        })
    })
};


