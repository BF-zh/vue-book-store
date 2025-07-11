import type { ResData } from "../types";
import type { AdminLoginParams } from "../types/admin";
import type { Login, RegisterParams, UserInfo } from "../types/user";
import http from "../utils/request";
const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
}

export const userRegister = async (register: RegisterParams) : Promise<ResData<'' | null>> => {
    return await http.post('/user/register', JSON.stringify(register), {headers})
}

export const userLogin = async (info : Login) : Promise<ResData<UserInfo>>  => {
    return await http.post('/user/login', JSON.stringify({adminId: info.username,password: info.password}), {
         headers
    })
    
}

export const adminLogin = async (info : Login) : Promise<ResData<AdminLoginParams>> => {
    return await http.post('/admin/login', 
        JSON.stringify({adminId: info.username,password: info.password}), 
        { headers }
    )
} 




