import type { AdminLoginParams, IRes, UserInfo } from '@/types'
import http from '../utils/request'

// const headers = {
//   'X-Requested-With': 'XMLHttpRequest',
//   'Content-Type': 'application/x-www-form-urlencoded',
// }

// 获取用户信息
export async function getUserInfo(): Promise<IRes<UserInfo>> {
  return await http.get('/users/getUserinfo')
}

// 获取管理员信息
export async function getAdminInfo(): Promise<IRes<AdminLoginParams>> {
  return await http.get('/admin/getAdminInfo')
}

// GetUserInfo
export function GetUserInfo() {
  return useRequest<IRes<UserInfo>>('/users/getUserinfo', {
    // immediate: true,
    method: 'GET',
  })
}
