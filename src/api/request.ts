import type { UserLogin } from "../types/user";
import http from "../utils/request";


export const login = async (info : UserLogin)  => {
    return await http.get('/login', {data:{...info}})
    
}
