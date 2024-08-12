import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CustomParamsSerializer,
} from 'axios'
import { stringify } from 'qs'
import { h } from 'vue'
import * as process from 'process'
import {httpRequestConfig, httpResponse, RequestMethods} from "@/utils/http/types";

const defaultConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    // 设置后端需要的传参类型
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  baseUrl: process.env.VITE_APP_BASE_URL,
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}

class MinaHttp  {
  constructor() {
    this.httpInterceptorsRequest();
  }
  /** 初始化配置对象 */
  private static initConfig: httpRequestConfig = {};
  private static axiosInstance: AxiosInstance = axios.create(defaultConfig);

/** 请求拦截 */
  private httpInterceptorsRequest(): void {
    MinaHttp.axiosInstance.interceptors.request.use(
      async (config: httpRequestConfig): Promise<any> => {
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config);
          return config;
        }
        if (MinaHttp.initConfig.beforeRequestCallback) {
          MinaHttp.initConfig.beforeRequestCallback(config);
          return config;
        }
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
}

/** 响应拦截 */
private httpInterceptorsResponse(): void {
  const instance = MinaHttp.axiosInstance;
  instance.interceptors.response.use(
    (response: httpResponse) => {
      const $config = response.config;

      // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
      if (typeof $config.beforeResponseCallback === "function") {
        $config.beforeResponseCallback(response);
        return response.data;
      }
      if (MinaHttp.initConfig.beforeResponseCallback) {
        MinaHttp.initConfig.beforeResponseCallback(response);
        return response.data;
      }
      return response.data;
    }
  )
}

  /** 通用请求工具函数 */

  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: httpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
  } as httpRequestConfig;
    // 单独处理自定义请求/响应回调
    return new Promise((resolve,reject) => {
      http.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
}

  /** 单独抽离 post 工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: httpRequestConfig
  ): Promise<P> {
    return this.request<P>("post", url, params, config);
  }

  /** 单独抽离 get 工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: httpRequestConfig
  ): Promise<P> {
    return this.request<P>("get, url, params, config);
  }

}

export const http = new MinaHttp()
