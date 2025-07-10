<template>
  <el-container style="height: 100vh">
    <!-- 左侧菜单 -->
    <el-aside width="200px" style="background: #2d3a4b; color: #fff">
      <div class="logo">📚 书店后台</div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="#409EFF"
        @select="handleMenuSelect"
      >
        <el-menu-item route="/dashboard/books" index="books">📘 图书管理</el-menu-item>
        <el-menu-item route="/dashboard/users" index="users">👥 用户管理</el-menu-item>
        <el-menu-item route="/dashboard/orders" index="orders">🛒 订单管理</el-menu-item>
        <el-menu-item route="/dashboard/stats" index="stats">📈 数据统计</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体内容 -->
    <el-container>
      <el-header style="background: #fff; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div>当前模块：{{ menuTitleMap[activeMenu] }}</div>
        <el-button type="danger" size="small" @click="logout">退出登录</el-button>
      </el-header>
      <el-main>
        <!-- <div v-if="activeMenu === 'books'">📘 图书管理页面（可展示表格）</div>
        <div v-else-if="activeMenu === 'users'">👥 用户管理页面</div>
        <div v-else-if="activeMenu === 'orders'">🛒 订单管理页面</div>
        <div v-else-if="activeMenu === 'stats'">📈 数据统计页面</div> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
definePage({
  name: 'dashboard',
  meta: {
    isPublic: true,
  },
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeMenu = ref('books')

const menuTitleMap = {
  books: '图书管理',
  users: '用户管理',
  orders: '订单管理',
  stats: '数据统计'
}

const handleMenuSelect = (key) => {
  activeMenu.value = key
}

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.logo {
  font-size: 18px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
}
</style>
