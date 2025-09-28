import type { UserInfo } from '@/types'

export const userCenterStore = defineStore('userCenter', () => {
    const userInfo = reactive<UserInfo>({} as UserInfo)

    return { userInfo }
})
