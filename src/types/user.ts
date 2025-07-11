export interface Login{
    username:string
    password:string
}

export interface UserInfo {

}
export interface RegisterParams {
  /* 昵称 */
  nickname: string;

  /* 用户账号 */
  userId: string;

  /* 用户密码 */
  password: string;

  /* 确认密码 */
  checkPassword: string;
}


