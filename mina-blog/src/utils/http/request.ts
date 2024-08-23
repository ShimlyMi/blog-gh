import axios, {AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from "axios";
import { messageError } from "@/utils/messgeBox";

interface ApiResponse<T> {
  code: number,
  message: string,
  data?: T
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 3000,
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  error => {
    messageError("请求错误", "🚀~请求错误啦~ 请检查网络连接或联系网站管理员!")
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const status: number = response.status
    // console.log("response.data", response.data)
    if (status === 200) {
      const result: ApiResponse<any> = response.data;
      // console.log("result",result)
      return result.data
      // console.log("result.data", result.data)
      // if (result.code === 0) {
      //   return result.data
      // }
    }
  },
  (error: AxiosError) => {
    if (error.response) {
      const status: number = error.response?.status
      let message: string;
      switch (status) {
        case 400:
          message = '输入信息无效，请检查并重新输入!';
          break
        case 403:
          message = '禁止访问，您的权限被偷走啦~'
          break
        case 404:
          message = '您访问的页面出走啦ㄒoㄒ'
          break
        case 500:
          message = '服务器出错啦，请稍后重试!'
          break
        case 502:
          message = '网关错误，请检查网络是否可用!'
          break
        default:
          message = '请求报错啦，请稍后重试!'
          break
      }
      messageError('🚀~出错啦~', `${message}`)
    } else if (error.request) {
      messageError('🚀~网络错误', '无法链接服务器，请检查网络链接')
    } else {
      messageError('🚀~未知错误', error.message)
    }
    return Promise.reject(error)
  }
)

export default instance;
