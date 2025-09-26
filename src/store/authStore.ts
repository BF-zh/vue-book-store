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
