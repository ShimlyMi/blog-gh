import http from "@/utils/http/request";

export type SiteResult = {
    code: number;
    message: string;
    result: any;
};

export const getConfigDetail = () => {
    return http.request<SiteResult>("get", "/api/config/detail", {});
};
