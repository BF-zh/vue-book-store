import type { IAdminInfoVo, IRes, IUserUpdateDTO } from '@/types'
import http from '@/utils/request'

const baseUrl = 'admin'
export async function updateUserInfo(params: IUserUpdateDTO): Promise<IRes<string>> {
    return await http.post(`/users/${baseUrl}/updateUserInfo`, params)
}

export async function getAdminInfo(): Promise<IRes<IAdminInfoVo>> {
    return http.get(`/${baseUrl}/getAdminInfo`)
}
