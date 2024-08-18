import axios from 'axios';
import type { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import { Result } from "@/utils/http/types";
import { messageError } from "@/utils/messgeBox";

// 导出Request，可以用来自定义传递配置来创建实例
export class Request {
    // axios 实例
    instance: AxiosInstance
    // 基础配置，url和超时时间
    baseConfig: AxiosRequestConfig = {
        baseURL: import.meta.env.VITE_APP_BASE_URL,
        timeout: 5000,
        withCredentials: true,
        headers: {
            // 设置后端需要的传参类型
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    }

    constructor(config: AxiosRequestConfig) {
        // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
        this.instance = axios.create(Object.assign(this.baseConfig, config))
        /** 请求拦截器 */
        this.instance.interceptors.request.use(
            (config) => {
                return config;
            },
            (error: any) => {
                return Promise.reject(error)
            }
        )

        /** 响应拦截器 */
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                // 直接返回res，当然你也可以只返回res.data
                // 系统如果有自定义code也可以在这里处理
                let { status, data } = res;
                if (status === 200) {
                    return data;
                } else {
                    console.error("🚀~请求错误啦~")
                }
            },
            (error: any) => {
                let { status, data } = error.response;
                switch (status) {
                    case 403:
                      messageError(data.message || '无权访问');
                      break;
                    case 404:
                      messageError(data.message || '请求地址不存在');
                        break;
                    case 500:
                      messageError(data.message || '服务器请求错误')
                        break;
                    default:
                      messageError(`连接出错(${status})`)
                        break;
                }
                // 所有的响应异常 区分来源为取消请求/非取消请求
                // 这里错误消息可以使用全局弹框展示出来
                // 比如element plus 可以使用 ElMessage
                // ElMessage({
                //   showClose: true,
                //   message: `${message}，请检查网络或联系管理员！`,
                //   type: "error",
                // });
                // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
                console.log("请求报错啦",error);
                return Promise.reject(error);
            }
        )

    }

    // 定义请求方法
    public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.instance.request(config)
    }

    public get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.get(url, config);
    }

    public post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.post(url, data, config);
    }

    public put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.put(url, data, config);
    }

    public delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.delete(url, config);
    }
}

// 默认导出Request实例
export default new Request({})




