import type { IBooks, ISearchBookParams } from '@/types'

export const useBookStore = defineStore('bookStrore', () => {
  // const books = reactive([
  //   { id: 1, title: 'Vue 3 实战', author: '张三', price: 59 },
  //   { id: 2, title: '深入理解 JavaScript', author: '李四', price: 79 },
  //   { id: 3, title: 'Spring Boot 精讲', author: '王五', price: 69 },
  // ])

  const pageParamsRes = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    records: [] as IBooks[],
  })

  const searchBookParams = reactive<ISearchBookParams>({
    bookId: '',
    bookType: '',
    keywords: '',
    currentPage: 1,
    pageSize: 12,
    bookStatus: 1,
  })

  return { pageParamsRes, searchBookParams }
})
