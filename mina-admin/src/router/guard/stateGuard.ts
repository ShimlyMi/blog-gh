import { Router } from "vue-router";
import {BasicPageEnum} from "@/enums/pageEnum";
import { useUserStore } from "@/stores/user";
import { usePermissionStore } from "@/stores/permission";

export function createStateGuard(router: Router) {
  router.afterEach(to => {
   if (to.path === BasicPageEnum.BASE_LOGIN) {
     const userStore = useUserStore()
     const permissionStore = usePermissionStore()
     permissionStore.resetState()
     userStore.RESET_STATE()
   }
  })
}
