export interface IRes<T> {
  /* 响应数据码 */
  code: number

  /* 响应数据消息 */
  message: string

  /* 响应数据 */
  data: T
}

export interface IPageParamsRes<T> {
  /* 当前页码 */
  currentPage: number

  /* */
  pageSize: number

  /* */
  total: number

  /* */
  records: T
}
