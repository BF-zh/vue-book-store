<!-- src/components/Header.vue -->
<script setup lang="ts">
const activeMenu = ref('home')
const router = useRouter()
async function navigateTo(path: string) {
  router.push({ path })
}
</script>

<template>
  <el-header class="header #f5f5f5">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="4" />
      <!-- 左侧Logo -->
      <el-col :span="4">
        <div class="logo">
          <!-- <img src="/path/to/logo.png" alt="书店Logo"> -->
          网上书店商城
        </div>
      </el-col>

      <!-- 中间菜单 -->
      <el-col :span="12">
        <el-menu mode="horizontal" router :default-active="activeMenu" class="menu">
          <el-menu-item index="home" route="/home/indexPage">
            首页
          </el-menu-item>
          <el-menu-item index="books" @click="navigateTo('books')">
            书籍
          </el-menu-item>
          <el-menu-item index="cart" @click="navigateTo('cart')">
            购物车
          </el-menu-item>
          <el-menu-item index="personalCenter" @click="navigateTo('cart')">
            个人中心
          </el-menu-item>
          <!-- <el-menu-item index="contact" @click="navigateTo('contact')">
            联系我们
          </el-menu-item> -->
        </el-menu>
      </el-col>

      <!-- 右侧登录/注册 -->
      <el-col :span="4">
        <div class="auth-links">
          <el-button size="small" @click="navigateTo('/login')">
            登录
          </el-button>
          <el-button size="small" type="primary" @click="navigateTo('/register')">
            注册
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <hr>
</template>

<style scoped>
.header {
  background-color: #ffffff;
  /* padding: 0 20px; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo img {
  width: 120px;
}

.menu {
  border-bottom: none;
}

.auth-links {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
