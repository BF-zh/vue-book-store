<script setup lang="ts">
// 虚拟数据：模拟商品分类
const categories = ref([
  { name: '图书' },
  { name: '电子书' },
  { name: '教育' },
  { name: '小说' },
  { name: '青春文学' },
  { name: '漫画' },
  { name: '人文社科' },
  { name: '文艺' },
  { name: '生活' },
  { name: '科技' },
  { name: '计算机' },
  { name: '成功' },
  { name: '摄影' },
  { name: '动漫' },
])
</script>

<template>
  <el-menu
    default-active="文学艺术"
    class="category-menu"
    router
  >
    <el-menu-item v-for="category in categories" :key="category.name" :index="category.name">
      <template #title>
        <span>{{ category.name }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.category-menu {
  width: 200px; /* 设置侧边栏宽度 */
  min-height: 400px;
  border-right: none; /* 移除右侧边框 */
  background-color: #f7f7f7;
}

.category-menu .el-menu-item {
  color: #666;
  font-weight: bold;
}

.category-menu .el-menu-item.is-active {
  background-color: #5d9a58;
  color: #fff;
  border-right: none;
}
</style>
