<script setup lang="ts">
import type { IRegisterData } from '@/types'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
definePage({
  name: 'register',
  meta: {
    isPublic: true,
  },
})
const regForm = reactive<IRegisterData>({
  nickname: '',
  userId: '',
  password: '',
  checkPassword: '',
})

async function handleRegister() {
  if (regForm.nickname === '' || regForm.userId === '' || regForm.password === '' || regForm.checkPassword === '') {
    ElMessage.error('所有字段都是必填的')
    return
  }
  if (regForm.password !== regForm.checkPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  await userStore.register(regForm)
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <h2>注册账号</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-row">
          <label for="name">昵&emsp;&emsp;称</label>
          <input id="name" v-model="regForm.nickname" required>
        </div>

        <div class="form-row">
          <label for="username">账&emsp;&emsp;号</label>
          <input id="username" v-model="regForm.userId" required>
        </div>

        <div class="form-row">
          <label for="password">密&emsp;&emsp;码</label>
          <input id="password" v-model="regForm.password" type="password" required>
        </div>

        <div class="form-row">
          <label for="confirm">确认密码</label>
          <input id="confirm" v-model="regForm.checkPassword" type="password" required>
        </div>

        <button class="login-button" type="submit">
          注册
        </button>
        <p class="switch-link">
          已有账号？<router-link to="/login">
            去登录
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/LoginRegisterCommon.css';
</style>
