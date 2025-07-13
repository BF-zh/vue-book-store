export interface IRes<T> {
  /* 响应数据码 */
  code: number

  /* 响应数据消息 */
  message: string

  /* 响应数据 */
  data: T
}

export interface IToken {
  token: string
}
