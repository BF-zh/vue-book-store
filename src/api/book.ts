import type { IAddBookParams, IGetAllBooksParams, IPageParamsRes, IRes, IUpdateBookParams } from '@/types'
import http from '@/utils/request'

export async function getAllBooks(params: IGetAllBooksParams): Promise<IRes<IPageParamsRes>> {
  return await http.post(`/books/getAll`, params)
}

export async function addBook(params: IAddBookParams): Promise<IRes<''>> {
  return await http.post(`/books/add`, params)
}

export async function updateBook(params: IUpdateBookParams): Promise<IRes<''>> {
  return await http.post(`/books/update`, params)
}

export async function deleteBook(bookId: string): Promise<IRes<''>> {
  return await http.delete(`/books/${bookId}`)
}
