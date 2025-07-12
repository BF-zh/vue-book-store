import type { ResData } from '../types'
import type { AdminLoginParams } from '../types/admin'
import type { UserInfo } from '../types/user'
import http from '../utils/request'

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded',
}

// 获取用户信息
export async function getUserInfo(): Promise<ResData<UserInfo>> {
  return await http.get('/users/getUserinfo', { headers })
}

// 获取管理员信息
export async function getAdminInfo(): Promise<ResData<AdminLoginParams>> {
  return await http.get('/admin/getAdminInfo', { headers })
}
