<script setup lang="ts">
import http from '@/utils/request'

const file = ref()
const headers = {
  'content-type': 'multipart/form-data',
}
function handler() {
  const formData = new FormData()
  formData.append('files', file.value.files[0])
  formData.append('bookId', '123456')
  const res = http.post('uploadTest', formData, { headers })
  console.log(res)
}
</script>

<template>
  <div>
    <!-- <h1 class="bg-blue">
    <!-- <h1 class="bg-blue">
      用户管理
    </h1>
    <router-view /> -->
    <!-- <test /> -->
    <input ref="file" type="file">
    <button @click="handler()">
      提交
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
