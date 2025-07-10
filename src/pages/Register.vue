<template>
  <div class="login-page">
    <div class="login-box">
      <h2>注册账号</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-row">
          <label for="name">昵&emsp;&emsp;称</label>
          <input id="name" v-model="name" required />
        </div>

        <div class="form-row">
          <label for="username">用&nbsp;户&nbsp;名</label>
          <input id="username" v-model="username" required />
        </div>

        <div class="form-row">
          <label for="password">密&emsp;&emsp;码</label>
          <input id="password" type="password" v-model="password" required />
        </div>

        <div class="form-row">
          <label for="confirm">确认密码</label>
          <input id="confirm" type="password" v-model="confirm" required />
        </div>

        <button class="login-button" type="submit">注册</button>
        <p class="switch-link">已有账号？<router-link to="/login">去登录</router-link></p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePage({
  name: 'register',
  meta: {
    isPublic: true,
  },
})
import { ref } from 'vue'

const name = ref('')
const username = ref('')
const password = ref('')
const confirm = ref('')

const handleRegister = () => {
  if (password.value !== confirm.value) {
    alert('两次密码不一致！')
    return
  }
  alert(`注册成功：${name.value} (${username.value})`)
}
</script>

<style scoped>
@import '../assets/css/LoginRegisterCommon.css';
</style>
