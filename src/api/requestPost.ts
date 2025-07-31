import type { IRes, IToken } from '../types'
import type { IAdminLoginData, IRegisterData, IUserLoginData } from '../types/user'
import http from '../utils/request'

export async function userRegister(register: IRegisterData): Promise<IRes<''>> {
  return await http.post('/users/register', register)
}

export async function userLogin(info: IUserLoginData): Promise<IRes<IToken>> {
  return await http.post('/users/login', info)
}

export async function adminLogin(info: IAdminLoginData): Promise<IRes<IToken>> {
  return await http.post('/admin/login', info,
  )
}
