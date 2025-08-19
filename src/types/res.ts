import type { IBooks } from './books'

export interface IRes<T> {
  /* 响应数据码 */
  code: number

  /* 响应数据消息 */
  message: string

  /* 响应数据 */
  data: T
}

export interface IPageParamsRes {
  /* 当前页码 */
  pageNum: number

  /* */
  pageSize: number

  /* */
  total: number

  /* */
  records: IBooks[]
}
