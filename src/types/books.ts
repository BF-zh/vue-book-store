import type { UploadFile } from 'element-plus'

export interface IBooks {
  id: number
  /* 书的编号 */
  bookId: string

  /* 书的名字 */
  bookName: string

  /* 书的价格 */
  bookPrice: number // bookPrice

  /* 剩余数量 */
  bookNum: number //

  /* 书的作者 */
  bookAuthor: string // bookAuthor

  /* 出版社 */
  bookPress: string

  /* 书的类型 */
  bookType: string

  /* 封面图片 */
  bookImage: string

  /* 创建时间 */
  createTime: string

  /* 更新时间 */
  updateTime?: string

  /* 上架情况 */
  bookStatus: 1 | 0 | '上架' | '下架'
}

export interface IAddBookParams {
  /* 书的名字 */
  bookName: string

  /* 书的价格 */
  bookPrice: number

  /* 剩余数量 */
  bookNum: number

  /* 书的作者 */
  bookAuthor: string

  /* 出版社 */
  bookPress: string

  /* 书的类型 */
  types: IBookType[]

  /* 封面图片 */
  files: []

  /* 上架情况 */
  bookStatus: 1 | 0
}

export interface IUpdateBookParams {
  /* 书的编号 */
  bookId: string

  /* 书的名字 */
  bookName: string

  /* 书的价格 */
  bookPrice?: number

  /* 剩余数量 */
  bookNum?: number

  /* 书的作者 */
  bookAuthor: string

  /* 出版社 */
  bookPress: string

  /* 书的类型 */
  bookType: string

  /* 封面图片 */
  file?: Blob

  /* 上架情况 */
  bookStatus: 1 | 0

  /** 分类 */
  types: string[]

  /* 封面图片 */
  files: UploadFile[]
}

export interface IBookType {
  type: string
}
export interface ISearchBookParams {
  /* 书编号 */
  bookId?: string

  /* 书类型 */
  bookType?: string

  /* 搜索关键词 */
  keywords?: string

  /* 当前页码 */
  currentPage: number

  /* 每页数量 */
  pageSize: number

  /* 书的状态 */
  bookStatus: 1 | 0 | undefined
}

// export type TBookData = Omit<IAddBookParams, 'bookId' | 'createTime' | 'updateTime'>
export type TBookData = IAddBookParams
