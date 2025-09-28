export interface IUserUpdateDTO {
    /* 用户id */
    userId: number

    /* 用户账号 */
    username: string

    /* 用户密码 */
    password?: string

    /* 用户昵称 */
    nickname?: string

    /* 用户性别 */
    userSex?: string

    /* 用户昵称 */
    userAge?: number

    /* 用户昵称 */
    userEmail?: string

    /* 用户电话 */
    userPhone?: number

    /* 标记 */
    userStatus?: 1 | 0
}

export interface IAdminInfoVo {
    /* 管理员账号 */
    adminId: string

    /* 管理员密码 */
    password: string

    /* 管理员名字 */
    adminName: string
}
