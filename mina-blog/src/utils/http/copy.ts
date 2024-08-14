import axios from "axios";
import VFNotification from "@/utils/VFNotiftcation";
import { showMessage } from "@/utils/http/status";

const http = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: import.meta.env.VITE_APP_BASE_URL
});
/** 请求拦截器 */
http.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做什么
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

/** 响应拦截器 */
http.interceptors.response.use(
  (response: any) => {
    /** 对响应数据做些什么 */
    const res = response.data;
    if (res.code === 200) {
      return res.data;
    } else {
      return Promise.reject({
        message: res.message || 'Error',
        status: res.code
      })
    }
  },
  (error: any) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log("error.response", error.response)
    if (error.response) {
      let { status } = error.response;
      VFNotification({
        message: showMessage(status),
        type: 'error',
        showClose: true, // 开启支持点击关闭
        position: 'top right',
        positionStyle: 'top: 60px', // 定位样式
      })

    }
    return Promise.reject(error);
  }
);

export default http;


import axios, {Method, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import $messageBox from "@/components/MessageBox/index";
// import NProgress from "nprogress";

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;
export type responseType = {
  code?: number;
  message?: string;
}
interface HttpError {
  status: number;
  data?: any
}
interface HttpResponse extends AxiosResponse {
  config: HttpRequestConfig
}
export interface HttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void;
  beforeResponseCallback?: (response: HttpResponse) => void;
}

const defaultConfig: AxiosRequestConfig = {
  timeout: 10000,
  withCredentials: true,
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: import.meta.env.VITE_APP_BASE_URL
};

class HttpRequest {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  private static initConfig: HttpRequestConfig = {}
  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = axios.create(defaultConfig);

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    HttpRequest.axiosInstance.interceptors.request.use(
      async (config: HttpRequestConfig): Promise<any> => {
        // NProgress.start();
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config);
          return config;
        }
        if (HttpRequest.initConfig.beforeRequestCallback) {
          HttpRequest.initConfig.beforeRequestCallback(config);
          return config;
        }
      },
      (error: any) => {
        return Promise.reject(error);
      }
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = HttpRequest.axiosInstance;
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // const $config = response.config;
        // 关闭动画
        // NProgress.done();
        // if (typeof $config.beforeResponseCallback === 'function') {
        //   $config.beforeResponseCallback(response);
        //   return response.data;
        // }
        if (HttpRequest.initConfig.beforeResponseCallback) {
          HttpRequest.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data
      },
      (error: AxiosError<HttpError>) => {
        // const $error = error;
        // $error.isCancelRequest = axios.isCancel($error);
        // NProgress.done();
        console.log(error.response?.status)
        // const { status, data } = error.response;

        switch (error.response?.status) {
          case 403:
            $messageBox.show({
              type: "error",
              message: error.response?.data?.message,
              location: "top"
            })
            break;
          case 404:
            $messageBox.show({
              type: "error",
              message: error.response?.data?.message,
              location: "top"
            })
            break;
          case 500:
            $messageBox.show({
              type: "error",
              message: error.response?.data?.message,
              location: "top"
            })
            break;
          default:
            return;
        }
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject(error);
      }
    )
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as HttpRequestConfig;

    return new Promise<T>((resolve, reject) => {
      HttpRequest.axiosInstance.request(config).then((response: any) => {
        resolve(response);
      }).catch((error: any) => {
        reject(error)
      })
    })
  }
  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: HttpRequestConfig
  ): Promise<P> {
    return this.request<P>("post", url, params, config);
  }
  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: HttpRequestConfig
  ): Promise<P> {
    return this.request<P>("get", url, params, config);
  }
}

export const http = new HttpRequest();
