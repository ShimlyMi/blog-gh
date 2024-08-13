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
      const dataAxios = response.data;
      const { code, message } = dataAxios;
      switch (code + "") {
          // 给用户一点提示
        case '200':
          VFNotification({
            offset: 60,
            title: "温馨提示",
            message:  message
          });
          break;
      }
      return dataAxios;
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
