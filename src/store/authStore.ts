import type { IRes, IToken } from '../types'
import type { Login, RegisterParams, UserInfo } from '../types/user'
import { ElMessage } from 'element-plus'
import { getAdminInfo, getUserInfo } from '../api/requestGet'
import { adminLogin, userLogin, userRegister } from '../api/requestPost'
import router from '../router'

export const useUserStore = defineStore('userAuth', () => {
  const registerInfo = ref<IRes<string>>()
  // 用户注册
  const register = async (info: RegisterParams) => {
    if (info.nickname == null || info.userId == null || info.password == null || info.checkPassword == null) {
      return ElMessage.error('不能为空')
    }
    registerInfo.value = await userRegister(info)
    if (registerInfo.value.code !== 200) {
      ElMessage.error(registerInfo.value.message)
      return
    }
    ElMessage.success(registerInfo.value.message)
    setTimeout(() => {
      router.push('/Login')
    }, 1500)
  }

  const userData = ref<IRes<IToken>>()
  // 用户登录
  const login = async (form: Login) => {
    if (form.username == null || form.password == null)
      return ElMessage.error('不能为空')

    userData.value = await userLogin(form)
    if (userData.value.code !== 200) {
      ElMessage.error(userData.value.message)
      return
    }
    const token = userData.value.data.token
    localStorage.setItem('token', token)
    ElMessage.success('登录成功')
    setTimeout(() => {
      router.push('/Home')
    }, 1500)
  }
  // 获取用户信息
  const userInfo = async (): Promise<UserInfo> => {
    const res = await getUserInfo()
    if (res.code !== 200) {
      // ElMessage.error(res.message)
      localStorage.removeItem('token')
      // return
    }

    return res.data
  }
  return { register, login, registerInfo, userInfo }
})

export const useAdminStore = defineStore('adminAuth', () => {
  const login = async (form: Login) => {
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
