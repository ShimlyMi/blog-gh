import {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type responseType = {
  code?: string,
  message?: string
}

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export interface httpError extends AxiosError {
  isCancelRequest?: boolean;
  response?: {
    data?: responseType;
    status?: string
  }
}

export interface httpResponse extends AxiosResponse {
  config: httpRequestConfig
}

export interface httpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: httpRequestConfig) => void;
  beforeResponseCallback?: (request: httpResponse) => void;
}

export default class http {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: httpRequestConfig
  ): Promise<T>;

  post<T,P>(
    url: string,
    params?: T,
    config?: httpRequestConfig
  ): Promise<P>;

  post<T,P>(
    url: string,
    params?: T,
    config?: httpRequestConfig
  ): Promise<P>;

}
