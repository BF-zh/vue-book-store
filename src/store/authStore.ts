
import type { ILoginData } from '../types/user'
import { ElMessage } from 'element-plus'
import { getAdminInfo } from '../api/requestGet'
import { adminLogin } from '../api/requestPost'
import router from '../router'

const __USER_AUTH__ = '__USER_AUTH__'

interface ITokens {
  admin: string
  user: string
}

export const useAuthStore = defineStore('userAuth', () => {
  const tokens = reactive<ITokens>({
    user: '',
    admin: '',
  })

  const isAdmin = ref(false)

  const setToken = (token: string, type: keyof ITokens) => {
    isAdmin.value = type === 'admin'
    tokens[type] = token
  }

  const token = ref('')
  const cToken = computed(() => {
    return isAdmin.value ? tokens.admin : tokens.user
  })

  watch(cToken, (val) => {
    token.value = val
  })
  const isAuthenticated = computed(() => !!token.value)
  return {
    setToken,
    isAdmin,
    token,
    isAuthenticated,
  }
}, {
  persist: {
    key: __USER_AUTH__,
    pick: ['isAdmin', 'token'],
    storage: localStorage,
  },
})

export const useAdminStore = defineStore('adminAuth', () => {
  const login = async (form: ILoginData) => {
    if (form.username == null || form.password == null) {
      ElMessage.error('不能为空')
      return
    }
    const adminData = await adminLogin(form)
    if (adminData.code !== 200) {
      ElMessage.error(adminData.message)
      return
    }
    const token = adminData.data.token
    localStorage.setItem('token', token)
    ElMessage.success('登录成功')
    setTimeout(() => {
      router.push('/Dashboard')
    }, 1500)
  }

  const adminInfo = async () => {
    const res = await getAdminInfo()
    if (res.code === 200) {
      return res.data
    }
    ElMessage.error(res.message)
    // setTimeout(() => {
    //   router.push('/Login')
    // }, 1000);
  }

  return { login, adminInfo }
})
