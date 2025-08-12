import type { ILoginData, IRegisterData, IRes, IToken } from '@/types'
//  用户登录 type = user 即普通用户 admin 即管理员
export function login(_data: ILoginData) {
  const url = computed(() => `/${_data.type}/login`)
  const isAdmin = computed(() => _data.type === 'admin')
  const router = useRouter()
  const { setToken } = useAuthStore()
  return useRequest<IRes<IToken>, Omit<ILoginData, 'type'>>(url, {
    method: 'POST',
    success({ data, code, message }) {
      if (code !== 200)
        return ElMessage.error(message)
      ElMessage.success(message)
      setToken(data.token, isAdmin.value ? 'admin' : 'user')
      setTimeout(() => {
        router.push(isAdmin.value ? '/dashboard' : '')
      }, 500)
    },
  })
}

// 用户注册
export function register() {
  const router = useRouter()
  const { setToken } = useAuthStore()
  return useRequest<IRes<IToken>, IRegisterData>('/users/register', {
    method: 'POST',
    success({ code, data, message }) {
      if (code !== 200)
        return ElMessage.error(message)
      ElMessage.success(message)
      setToken(data.token, 'user')
      setTimeout(() => {
        router.push('/user')
      }, 500)
    },
  })
}
