import type { IRes } from '../types'
import type { AdminLoginParams } from '../types/admin'
import type { Login, RegisterParams, UserInfo } from '../types/user'
import http from '../utils/request'

export async function userRegister(register: RegisterParams): Promise<IRes<'' | null>> {
  return await http.post('/user/register', register)
}

export async function userLogin(info: Login): Promise<IRes<UserInfo>> {
  return await http.post('/user/login', { adminId: info.username, password: info.password })
}

export async function adminLogin(info: Login): Promise<IRes<AdminLoginParams>> {
  return await http.post('/admin/login', { adminId: info.username, password: info.password })
}
