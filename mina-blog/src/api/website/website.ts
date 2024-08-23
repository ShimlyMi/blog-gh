import instance from "@/utils/http/request";
import { WebsiteApi } from "./websiteApi";
import { WebsiteResponse } from './types';


export const getConfig = (): Promise<WebsiteResponse> => {
  return instance.get<any, WebsiteResponse>(WebsiteApi.GET_WEBSITE_CONFIG, {})
}


// export const getConfig = () => {
//   return new Promise<WebsiteResponse>((resolve) => {
//     instance.get("/api/website", {}).then((res) => {
//       resolve(res);
//     })
//   })
// };
