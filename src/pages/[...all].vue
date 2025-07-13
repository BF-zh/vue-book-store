<script setup lang="ts">
import type { IRes, UserInfo } from '@/types'

// const { data, status, loading, execute, refresh } = GetUserInfo()
// onMounted(() => {
//   execute()
// })

const url = ref('/users/getUserinfo')

const { data, status, loading } = useRequest<IRes<UserInfo>>(url, {
  immediate: true,
  watch: true,
})
</script>

<template>
  <div>
    <input v-model="url" type="text">
    <h1>{{ status }}</h1>
    <h1>{{ loading ? '正在加载' : '加载完成' }}</h1>
    <h1>{{ data }}</h1>
  </div>
</template>

<style scoped lang="scss"></style>
