<template>
  <div class="login-page">
    <div class="login-box">
      <h2>书店管理系统</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-row">
          <label for="username">用户名</label>
          <input id="username" v-model="userForm.username" required />
        </div>

        <div class="form-row">
          <label for="password">密&emsp;码</label>
          <input id="password" type="password" v-model="userForm.password" required />
        </div>
        <div class="form-row">
          <label for="">身&emsp;份</label>
          <el-select v-model="value" filterable placeholder="Select" style="width: 240px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="options">
          <label><input type="checkbox" v-model="rememberMe" /> 记住我</label>
          <a href="#">忘记密码？</a>
        </div>

        <button class="login-button" type="submit">登录</button>
        <p class="switch-link">还没有账号？<router-link to="/register">去注册</router-link></p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePage({
  name: 'login',
  meta: {
    isPublic: true,
  },
})

import { ref, reactive } from 'vue'
import { login } from '../api/request'
import type { UserInfo, UserLogin } from '../types/user'
const userForm = reactive<UserLogin>({
  username: '',
  password: ''
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
  }
]
const rememberMe = ref(false)

const handleLogin = async () => {
  console.log(value);

  const userInfo: UserInfo = await login(userForm)
}
</script>

<style scoped>
@import '../assets/css/LoginRegisterCommon.css';
</style>
