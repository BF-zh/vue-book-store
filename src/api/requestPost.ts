import type { IRes, IToken } from '../types'
import type { Login, RegisterParams } from '../types/user'
import http from '../utils/request'

export async function userRegister(register: RegisterParams): Promise<IRes<''>> {
  return await http.post('/users/register', register)
}

export async function userLogin(info: Login): Promise<IRes<IToken>> {
  return await http.post('/users/login', { userId: info.username, password: info.password })
}

export async function adminLogin(info: Login): Promise<IRes<IToken>> {
  return await http.post('/admin/login', { adminId: info.username, password: info.password },
  )
}
