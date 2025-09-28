<script setup lang="ts">
import type { IAdminInfoVo } from '@/types'
import { Menu, Setting } from '@element-plus/icons-vue'
import { AdminApi } from '@/api'

const { logout } = useAuthStore()

// definePage({
//   name: 'dashboard',
//   meta: {
//     layout: 'admin',
//     isAdmin: true,
//   },
// })

const adminInfo = ref<IAdminInfoVo>({} as IAdminInfoVo)
const router = useRouter()
const route = useRoute()
const activeMenu = ref<string>('')

function handleMenuSelect(key: string) {
  sessionStorage.setItem('activeMenu', key)
  const active = sessionStorage.getItem('activeMenu') as string
  activeMenu.value = active
}
function handleLogout() {
  // localStorage.removeItem('__USER_AUTH__')
  logout()
  router.push('/login')
}
onMounted(async () => {
  activeMenu.value = sessionStorage.getItem('activeMenu') || 'dashboard'
  try {
    const res = await AdminApi.getAdminInfo()
    adminInfo.value = res.data
  }
  catch (error: any) {
    ElMessage.error(error.message)
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }
})

onBeforeUnmount(() => {
  sessionStorage.removeItem('activeMenu')
  localStorage.removeItem('__USER_AUTH__')
})

router.beforeEach((to, from, next) => {
  const __USER_AUTH__: { isAdmin: boolean, token: string } = JSON.parse(localStorage.getItem('__USER_AUTH__') as string)
  if (!__USER_AUTH__) {
    ElMessage.error('请先登录')
    router.push('/login')
    return
  }
  if (!__USER_AUTH__.isAdmin) {
    ElMessage.error('无权限访问')
    router.push('/')
    return
  }
  next()
})
</script>

<template>
  <el-container style="height: 100vh">
    <!-- 左侧菜单 -->
    <el-aside width="200px" style="background: #001529; color: #bfcbd9">
      <div class="logo">
        <h3 style="color: white; text-align: center; line-height: 60px; font-weight: bold; font-size: 20px;">
          📚 书店后台
        </h3>
      </div>
      <el-menu
        router
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        @select="handleMenuSelect"
      >
        <el-sub-menu index="1">
          <template #title>
            📘
            <span> 图书管理</span>
          </template>
          <el-menu-item-group>
            <template #title />
            <el-menu-item route="/dashboard/bookManager" index="books">
              图书列表
            </el-menu-item>
            <el-menu-item route="/dashboard/addBook" index="add-book">
              添加图书
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item route="/dashboard/users" index="users">
          👥 用户管理
        </el-menu-item>
        <el-menu-item route="/dashboard/classify" index="classify">
          <el-icon><Menu /></el-icon> 分类管理
        </el-menu-item>
        <el-menu-item route="/dashboard/orders" index="orders">
          🛒 订单管理
        </el-menu-item>
        <el-menu-item route="/dashboard/stats" index="stats">
          📈 数据统计
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体内容 -->
    <el-container>
      <el-header style="background: #F0F8FF; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div>
          当前模块：{{ route.meta.title }}
        </div>
        <!-- <el-button type="danger" size="small" @click="logout">
          退出登录
        </el-button> -->
        <el-dropdown>
          <span class="el-dropdown-link">
            管理员{{ adminInfo?.adminName }}你好!
            <el-icon class="el-icon--right">
              <!-- <ArrowDown /> -->
              <Setting />
            </el-icon>
          </span>
          <template #dropdown>
            <!-- <el-dropdown-menu>
            </el-dropdown-menu> -->
            <el-button type="danger" size="small" @click="handleLogout()">
              退出登录
            </el-button>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>

</style>
