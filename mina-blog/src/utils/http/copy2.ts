import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { showMessage } from "@/utils/http/status";
import VFNotification from "@/utils/VFNotiftcation";

interface Result<T = any> {
    code: number | string;
    message?: string;
    data?: T;
    total?: number;
};

class HttpRequest {
    baseUrl: string;
    timeout: number;

    constructor() {
        this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
        this.timeout = 10000;
    }

    request<T = any>(options: AxiosRequestConfig): Promise<Result<T>> {
        const instance: AxiosInstance = axios.create()
        this.setInterceptors(instance)
        const opts = this.mergeOptions(options)
        return instance(opts)
    }

    get<T = any>(url: string, data?: any, outHeaders = {}): Promise<Result<T>> {
        return this.request<T>({
            method: 'get',
            url,
            params: { ...data }, // get参数可以直接展开
            headers: {}
        })
    }
    post<T = any>(url: string, body = {}, outHeaders = {}):Promise<Result<T>> {
        let data = {
            body,
            header: {}
        }
        return this.request<T>({
            method: 'post',
            url,
            data, // post 要求必须传入data属性
        })
    }
    mergeOptions(options: AxiosRequestConfig) {
        console.log("合并参数", options)
        return {
            baseUrl: this.baseUrl,
            timeout: this.timeout,
            ...options
        }
    }
    /** 设置拦截器 */
    setInterceptors(instance: AxiosInstance) {
        /** 请求拦截器 */
        instance.interceptors.request.use((config: any) => {
                return config;
            },
            (error: any) => {
                console.log(error);
                return Promise.reject(error)
            });

        /** 响应拦截器 */
        instance.interceptors.response.use(
            (res: AxiosResponse) => {
                console.log("🚀 ~ res:", res)
                //res为AxiosResponse类型，含有config\data\headers\request\status\statusText属性
                let { status, data } = res;
                if (status === 200) {
                    return data;
                } else {
                    VFNotification({
                        message: showMessage(res.status),
                        type: 'error',
                        showClose: true, // 开启支持点击关闭
                        position: 'top right',
                        positionStyle: 'top: 60px', // 定位样式
                    });
                }
            },
            (error: any) => {
                console.log('axios报错', error)
                return Promise.reject(error)
            }

        )
    }
}
export const http = new HttpRequest();
