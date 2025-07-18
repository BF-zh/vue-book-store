export interface IBooks {
  /* 书的编号 */
  bookId: string

  /* 书的名字 */
  bookName: string

  /* 书的价格 */
  bookMoney: number

  /* 剩余数量 */
  bookNum: number

  /* 书的作者 */
  bookWriter: string

  /* 出版社 */
  bookPress: string

  /* 创建时间 */
  createTime: string

  /* 更新时间 */
  updateTime?: string

  /* 上架情况 */
  bookStatus: 1 | 0
}
