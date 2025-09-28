import type { IBooks, ISearchBookParams } from '@/types'

export const useBookStore = defineStore('bookStrore', () => {
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
