import Request from "@/utils/http/request";

export const getConfig = () => {
    return new Promise((resolve) => {
        Request.get("/api/website", {}).then((res) => {
            resolve(res);
        })
    })
};
