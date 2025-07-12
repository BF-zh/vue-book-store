<script setup lang="ts">
import type { UserInfo } from '../types/user'

const userInfo = ref<UserInfo>()

definePage({
  name: 'home',
  meta: {
    isPublic: true,
  },
})

onUnmounted(async () => {
  // userInfo.value = await getUserInfo()
})
</script>

<template>
  <div>{{ userInfo }}</div>
</template>

<style scoped>

</style>
