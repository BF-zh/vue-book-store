import type { ILoginData, IRegisterData, IRes, IToken } from '@/types'

//  用户登录 type = user 即普通用户 admin 即管理员
export function login({ type }: ILoginData) {
  const { execute: send, loading, data } = useRequest<IRes<IToken>, Omit<ILoginData, 'type'>>(`/${type}/login`, {
    method: 'POST',
  })

  const execute = async (data: Omit<ILoginData, 'type'>) => {
    const { code, data: { token }, message } = await send({ data })
    if (code !== 200)
      return ElMessage.error(message)
  }

  return {
    data,
    loading,
    execute
  }
}

// 用户注册
export function register(data: IRegisterData) {
  return useRequest<Partial<IToken>>('user/register', {
    method: 'POST',
    data,
  })
}
