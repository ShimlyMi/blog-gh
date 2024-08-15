import { http } from "@/utils/http/request";

export type SiteResult = {
  code: number;
  message: string;
  result: any
};

export const getConfig = () => {
    return http.request<SiteResult>({
        url: "/api/utils/detail",
        method: "get",
    });
};
