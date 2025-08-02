import type { IBookTypeParams, IRes, IResTypeData } from '@/types'
import http from '@/utils/request'

// const headers = {
//   'content-type': 'application/x-www-form-urlencoded'
// }

export async function bookTypeAdd(bookType: string): Promise<IRes<string>> {
  return await http.post(`/classification/${bookType}`)
}

export async function bookTypeUpdate(type: IBookTypeParams): Promise<IRes<string>> {
  return await http.post(`/classification/update`, type)
}

export async function getAllBookType(searchKeyword: string): Promise<IRes<IResTypeData[]>> {
  return await http.get(`/classification/getAll?searchKeyword=${searchKeyword}`)
}

export async function delBookType(type: string): Promise<IRes<string>> {
  return await http.get(`/classification/${type}`)
}
