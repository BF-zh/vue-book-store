<script setup lang="ts">
import type { ConfigProviderContext } from 'element-plus'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const config: ConfigProviderContext = {
  button: {
    autoInsertSpace: true,
    type: 'primary',
  },
  link: {
    underline: 'never',
  },
  locale: zhCn,
}
</script>

<template>
  <ElConfigProvider v-bind="config">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped>
</style>
