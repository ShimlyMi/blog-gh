import { defineStore } from "pinia";
import { userType, userInfoType } from "@/stores/types";
import {DataInfo, sessionKey} from "@/utils/auth";

export const useUserStore = defineStore(
  "user",
    {
        state: (): userType => ({
            user_name: "",
            blog_avatar: "",
            avatar: "",
            role: 0,
            nick_name: "",
            id: 0
        }),
        getters: {
            getBlogAvatar(): any {
                return (this.blog_avatar)
            }
        },
        actions: {
            /** 存储用户名 */
            // SET_USERNAME(user_name: string) {
            //     this.user_name = user_name;
            // },
            // /** 存储角色 */
            // SET_ROLES(role: number) {
            //     this.role = role;
            // },
            // SET_TOKEN(token: string) {
            //     this.token = token;
            // },
            SET_BLOG_AVATAR(blog_avatar: string) {
                this.blog_avatar = blog_avatar;
            },
            SET_AVATAR(avatar: string) {
                this.avatar = avatar;
            },
            // SET_NICKNAME(nick_name: string) {
            //     this.nick_name = nick_name;
            // },
            // SET_ID(id: number) {
            //     this.id = id;
            // },
        }

    }
)
