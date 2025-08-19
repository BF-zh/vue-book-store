<script setup lang="ts">
definePage({
  name: 'dashboard',
  meta: {
    layout: 'admin',
    isAdmin: true,
  },
})
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
