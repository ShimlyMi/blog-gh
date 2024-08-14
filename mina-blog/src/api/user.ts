import { http } from "@/utils/http/request";

// export type UserResult = {
//   code: number;
//   message: String;
//   result: {
//     /** 用户名 */
//     user_name: string;
//     /** 当前登陆用户的角色 */
//     role: number;
//     /** `token` */
//     token: string;
//     id: number; // 用户id
//     nick_name: string;
//   };
// };

export type Result = {
  code: number;
  message: string;
  result: any;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request("post", "/api/users/login", { data });
};
/** 注册 */
export const registerUser = (data?: object) => {
  return http.request("post", "/api/users/register", { data });
};

/** 获取当前登录人的信息 */
export const getUserInfo = () => {
  return http.request("get", "/api/users/info", {});
};
/** 根据ID获取用户信息 */
export const getUserInfoById = (id: number) => {
  return http.request("get", `/api/users/getUserInfoById/${id}`);
};
