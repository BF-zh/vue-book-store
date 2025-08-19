<script setup lang="ts">
import type { AdminLoginData } from '@/types'
import { Menu, Setting } from '@element-plus/icons-vue'

// definePage({
//   name: 'dashboard',
//   meta: {
//     layout: 'admin',
//     isAdmin: true,
//   },
// })

const adminStore = useAdminStore()

const adminInfo = ref<AdminLoginData>()
onMounted(async () => {
  adminInfo.value = await adminStore.adminInfo() as AdminLoginData
})
const router = useRouter()
const route = useRoute()
const activeMenu = ref<string>('books')

const menuTitleMap = {
  books: '图书管理',
  users: '用户管理',
  orders: '订单管理',
  stats: '数据统计',
}

function handleMenuSelect(key: string) {
  activeMenu.value = key
}

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <el-container style="height: 100vh">
    <!-- 左侧菜单 -->
    <el-aside width="200px" style="background: #001529; color: #bfcbd9">
      <div class="logo">
        📚 书店后台
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
            <el-menu-item route="/dashboard/addBook" index="1-2">
              添加图书
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <!-- <el-menu-item route="/dashboard/bookManager" index="books">
          📘 图书管理
        </el-menu-item> -->
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
          <!-- 当前模块：{{ menuTitleMap[activeMenu] }} -->
          当前模块：{{ route.meta.name }}
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
            <el-button type="danger" size="small" @click="logout">
              退出登录
            </el-button>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- <div v-if="activeMenu === 'books'">📘 图书管理页面（可展示表格）</div>
        <div v-else-if="activeMenu === 'users'">👥 用户管理页面</div>
        <div v-else-if="activeMenu === 'orders'">🛒 订单管理页面</div>
        <div v-else-if="activeMenu === 'stats'">📈 数据统计页面</div> -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>

</style>
