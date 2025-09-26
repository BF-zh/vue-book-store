import type { IBookTypeParams, IRes, IResTypeData } from '@/types'
import http from '@/utils/request'

// const headers = {
//   'content-type': 'application/x-www-form-urlencoded'
// }

const baseUrl = '/classification'

export async function bookTypeAdd(bookType: string): Promise<IRes<string>> {
  return await http.post(`${baseUrl}/add`, { bookType })
}

export async function bookTypeUpdate(type: IBookTypeParams): Promise<IRes<string>> {
  return await http.post(`${baseUrl}/update`, type)
}

export async function getAllBookType(keyword: string): Promise<IRes<IResTypeData[]>> {
  return await http.get(`${baseUrl}/getAll?keyword=${keyword}`)
}

export async function delBookType(type: string): Promise<IRes<string>> {
  return await http.delete(`${baseUrl}/${type}`)
}
