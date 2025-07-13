<script setup lang="ts">
const route = useRoute('/user/[id]')
</script>

<template>
  <div class="bg-red">
    {{ route.params }}
    <h1>用户管理子页面二级路由</h1>
  </div>
</template>

<style scoped lang="scss"></style>
