import { ElMessage } from "element-plus"
import { adminLogin } from "../api/request"
import type { ResData } from "../types"
import type { AdminLoginParams } from "../types/admin"
import type { Login } from "../types/user"
import router from "../router"

export const useUserStore = defineStore('userAuth', () => {
    

})
export const useAdminStore = defineStore('adminAuth', () => {
    let adminData = ref<ResData<AdminLoginParams> | null>()
    const login = async (form: Login) => {
        if(form.username == null || form.password == null) return ElMessage.error("不能为空")
            
        adminData.value = await adminLogin(form)
        if(adminData.value.code != 200){
            ElMessage.error(adminData.value.message)
            return;
        }
        ElMessage.success("登录成功")
        setTimeout(() => {
            router.push("/Dashboard")
            
        }, 2000);
    }
    return {adminData, login}
})
