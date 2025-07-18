import type { ILoginData, IRegisterData, IToken } from '@/types'

//  用户登录 type = user 即普通用户 admin 即管理员
export function login({ type, ...data }: ILoginData) {
  return useRequest<IToken>(`/${type}/login`, {
    method: 'POST',
    data,
  })
}

// 用户注册
export function register(data: IRegisterData) {
  return useRequest<Partial<IToken>>('user/register', {
    method: 'POST',
    data,
  })
}
