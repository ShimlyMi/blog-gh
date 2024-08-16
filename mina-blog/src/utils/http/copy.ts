import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import $messageBox from "@/components/MessageBox/index";
import {RequestMethods, TResponseData} from "@/utils/http/types";

const requestConfig: AxiosRequestConfig = {
  timeout: 5000,
  withCredentials: true,
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: import.meta.env.VITE_APP_BASE_URL
}

/** 请求拦截 */
class HttpRequest {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  private static axiosInstance: AxiosInstance = axios.create(requestConfig);

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    HttpRequest.axiosInstance.interceptors.request.use(
        (config) => {
          // removePending(config);
          // addPending(config)
          return config;
        },
        (error: any) => {
          return Promise.reject(error)
        }
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = HttpRequest.axiosInstance;
    instance.interceptors.response.use(
        (res) => {
          // removePending(res.config);
          let { status, data } = res;
          if (status === 200) {
            return data;
          } else {
            console.error("🚀~请求错误啦~")
          }
        },
        (error) => {
          let { status, data } = error.response;
          switch (status) {
            case 403:
              $messageBox.show({
                type: 'error',
                message: data.message || '无权访问',
                location: "top"
              })
              break;
            case 404:
              $messageBox.show({
                type: 'error',
                message: data.message || '请求地址不存在',
                location: "top"
              })
              break;
            case 500:
              $messageBox.show({
                type: 'error',
                message: data.message || '服务器请求错误',
                location: "top"
              })
              break;
            default:
              return "网络出现问题";
          }
          // 所有的响应异常 区分来源为取消请求/非取消请求
          console.log("请求报错啦",error);
          return Promise.reject(error);
        }
    )
  }
  // request<T>(params: customRequest): Promise<T>
  // request<T>(...args: any[]): Promise<T>
  //对部分接口的进行拦截配置
  async request<T = any>(
      method: RequestMethods,
      url: string,
      params?: AxiosRequestConfig,
      axiosConfig?: AxiosRequestConfig
  ): Promise<TResponseData<T>> {
    let config = {
      method, url, ...params, ...axiosConfig
    }
    return HttpRequest.axiosInstance.request<TResponseData<T>, TResponseData<T>>(config)
  }
  // async request<T = any>(
  //     method: RequestMethods,
  //     url: string,
  //     param?: AxiosRequestConfig,
  // ): Promise<T> {
  //     let config = {
  //         method, url, ...param
  //     } as AxiosRequestConfig
  //    return new Promise((resolve, reject) => {
  //        HttpRequest.axiosInstance.request(config).then(res => {
  //            resolve(res);
  //        }).catch(error => {
  //            reject(error)
  //        })
  //    })
  // }
  /** 单独抽离的post工具函数 */

}

export function post(url: string, params: Record<string, any>): Promise<any> {
  return new Promise((resolve, reject) => {
    HttpRequest.
  })
}

// const pendingMap = new Map()

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
// function addPending(config: AxiosRequestConfig) {
//     const pendingKey = getPendingKey(config)
//     config.cancelToken =
//         config.cancelToken ||
//         new axios.CancelToken((cancel) => {
//             if (!pendingMap.has(pendingKey)) {
//                 pendingMap.set(pendingKey, cancel)
//             }
//         })
// }


/**
 * 删除重复的请求
 * @param {*} config
 */
// function removePending(config: AxiosRequestConfig) {
//     const pendingKey = getPendingKey(config)
//     if (pendingMap.has(pendingKey)) {
//         const cancelToken = pendingMap.get(pendingKey)
//         // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
//         cancelToken(pendingKey)
//         pendingMap.delete(pendingKey)
//     }
// }

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
// function getPendingKey(config: AxiosRequestConfig) {
//     let {url, method, params, data} = config
//     if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
//     return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
// }


export const http = new HttpRequest();

import { AxiosResponse, AxiosRequestConfig} from 'axios'
import {Method} from "axios";

export type RequestMethods = Extract<
    Method,
    "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;
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
