import type { IAddBookParams, IBooks, IBookType, IGetAllBooksParams, IPageParamsRes, IRes, IUpdateBookParams } from '@/types'
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

// 获取图书详情
export async function getBookDetail(bookId: string): Promise<IRes<IBooks>> {
  return await http.get(`/books/${bookId}`)
}

export function addBookType(type: Ref<string>) {
  const url = computed(() => `classification/${type.value}`)
  return useRequest<IRes<string>>(url, {
    method: 'POST',
    success({ code, message, data }) {
      if (code !== 200)
        return ElMessage.error(message)
    },
  })
}

export function getBookType() {
  return useRequest<IRes<IBookType[]>, { searchKeyword: string }>('/classification/getAll', {
    success({ code, message, data }) {
      if (code !== 200)
        return ElMessage.error(message)
    },
    params: {
      searchKeyword: '',
    },
  })
}
export function updateBookType() {
  return useRequest<IRes<string>, {
    oldType: string
    newType: string
  }>('/classification/update', {
    success({ code, message, data }) {
      if (code !== 200)
        return ElMessage.error(message)
    },
    method: 'post',
  })
}
export function deleteBookType(type: string) {
  return useRequest<IRes<string>>(`classification/${type}`, {
    success({ code, message, data }) {
      if (code !== 200)
        return ElMessage.error(message)
    },
    immediate: true,
  })
}
