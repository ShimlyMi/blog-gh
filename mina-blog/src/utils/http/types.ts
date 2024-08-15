// import { AxiosResponse, AxiosRequestConfig} from 'axios'
// import {Method} from "axios";

// export type RequestMethods = Extract<
//     Method,
//     "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
// >;
// 后端统一返回数据模型
export type TResponseData<T> = {
    code: 0 | number // 0 => ok
    message: string
    result: T
}

// 后端分页数据模型
export type PageData<T = any> = {
    total: 0 | number
    records: Array<T>
}

// export interface HttpResponse extends AxiosResponse {
//     config: HttpRequestConfig;
// }
//
// export interface HttpRequestConfig extends AxiosRequestConfig {
//     beforeRequestCallback?: (request: HttpRequestConfig) => void;
//     beforeResponseCallback?: (response: HttpResponse) => void;
// }
//
// export default class HttpRequest {
//     request<T>(
//         method: RequestMethods,
//         url: string,
//         param?: AxiosRequestConfig,
//         axiosConfig?: HttpRequestConfig
//     ): Promise<T>;
// }
