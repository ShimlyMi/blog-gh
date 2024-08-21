import Request from "@/utils/http/request";

export const getConfig = (data?: object) => {
    return new Promise((resolve) => {
        Request.post("/api/website", {params: data}).then((res) => {
            resolve(res.data);
        })
    })
};
