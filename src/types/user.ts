// 登录的需要的参数
export interface ILoginData {
  /** 账号 */
  username: string
  /** 密码 */
  password: string
  type: 'users' | 'admin'
}

export interface IToken {
  token: string
}

// 用户信息
export interface UserInfo {
  /* 用户id */
  userId: number

  /* 用户账号 */
  username: string

  /* 用户密码 */
  password: string

  /* 用户昵称 */
  nickname: string

  /* 用户性别 */
  userSex?: string

  /* 用户昵称 */
  userAge?: number

  /* 用户昵称 */
  userEmail?: string

  /* 用户电话 */
  userPhone?: number

  /* 用户出生日期 */
  birthday?: Date

  /* 用户头像地址 */
  imageUrl?: string

  /* 标记 */
  userStatus: 1 | 0 | undefined

  /* 创建时间 */
  createTime: string

  /* 更新时间 */
  updateTime: string

  /* 删除状态 */
  isDeleted?: number
}

// 注册需要的参数
export interface IRegisterData {
  /* 昵称 */
  nickname: string

  /* 用户账号 */
  username: string

  /* 用户密码 */
  password: string

  /* 确认密码 */
  checkPassword: string
}

export interface AdminLoginData {
  /* 管理员账号 */
  adminId: string

  /* 管理员密码 */
  password: string

  /* 管理员名字 */
  adminName: string
}

export interface IGetAllUserInfoParams {
  /* 当前页码 */
  currentPage?: number

  /* 每页显示的条数 */
  pageSize?: number

  /* 搜索关键词 */
  keywords?: string

  /* 用户状态 */
  userStatus?: 1 | 0 | undefined
}
