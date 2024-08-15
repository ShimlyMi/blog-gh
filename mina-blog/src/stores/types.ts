export type userType = {
    user_name?: string;
    role?: number;
    verifyCode?: string;
    currentPage?: number;
    avatar: string;
    nick_name: string;
    id: number;
    blog_avatar?: string;
};

export type userInfoType = {
    nick_name: string;
    avatar: string;
    id?: number;
};
