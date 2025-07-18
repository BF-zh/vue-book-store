<script setup lang="ts">
import { useBookStore } from '@/store/bookStore'

const { books, newBook, addDialogVisible } = toRefs(useBookStore())

// const books = useBook.$state.books
// const newBook = useBook.$state.newBook
function addBook() {
  const nextId = books.value.length ? Math.max(...books.value.map(b => b.id)) + 1 : 1
  books.value.push({ id: nextId, ...newBook })
  addDialogVisible.value = false
}
</script>

<template>
  <el-dialog v-model="addDialogVisible" title="添加图书">
    <el-form :model="newBook" label-width="60px">
      <el-form-item label="书名">
        <el-input v-model="newBook.title" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="newBook.author" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="newBook.price" type="number" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="addDialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="addBook()">
        添加
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
