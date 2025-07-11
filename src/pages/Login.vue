<script setup lang="ts">
import type { Login, UserInfo } from '../types/user'
import { reactive, ref } from 'vue'
import { userLogin } from '../api/request'
import { useAdminStore } from '../store/auth'

definePage({
  name: 'login',
  meta: {
    isPublic: true,
  },
})
const adminAuth = useAdminStore()
const form = reactive<Login>({
  username: '',
  password: '',
})

const value = ref('0')
const options = [
  {
    value: '0',
    label: '用户',
  },
  {
    value: '1',
    label: '管理员',
  },
]
const rememberMe = ref(false)

async function handleLogin() {
  if (value.value) {
    await adminAuth.login(form)
    return
  }
  const userInfo: UserInfo = await userLogin(form)
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <h2>书店管理系统</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-row">
          <label for="username">用户名</label>
          <input id="username" v-model="form.username" required>
        </div>

        <div class="form-row">
          <label for="password">密&emsp;码</label>
          <input id="password" v-model="form.password" type="password" required>
        </div>
        <div class="form-row">
          <label for="">身&emsp;份</label>
          <el-select v-model="value" filterable placeholder="Select" style="width: 240px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="options">
          <label><input v-model="rememberMe" type="checkbox"> 记住我</label>
          <a href="#">忘记密码？</a>
        </div>

        <button class="login-button" type="submit">
          登录
        </button>
        <p class="switch-link">
          还没有账号？<router-link to="/register">
            去注册
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/LoginRegisterCommon.css';
</style>
