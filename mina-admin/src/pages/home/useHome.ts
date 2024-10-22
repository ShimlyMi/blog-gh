import { useUserStoreHook } from "@/stores/user";

const userInfo = useUserStoreHook().getUserInfoAction()
console.log(userInfo)
