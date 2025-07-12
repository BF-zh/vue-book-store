import type { ResData, Token } from '../types'
import type { Login, RegisterParams } from '../types/user'
import http from '../utils/request'

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
}

export async function userRegister(register: RegisterParams): Promise<ResData<''>> {
  return await http.post('/users/register', JSON.stringify(register), { headers })
}

export async function userLogin(info: Login): Promise<ResData<Token>> {
  return await http.post('/users/login', JSON.stringify({ userId: info.username, password: info.password }), {
    headers,
  })
}

export async function adminLogin(info: Login): Promise<ResData<Token>> {
  return await http.post('/admin/login', JSON.stringify({ adminId: info.username, password: info.password }), { headers },
  )
}
