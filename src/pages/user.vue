<script setup lang="ts">
import http from '@/utils/request'

const file = ref()
const headers = {
  'content-type': 'multipart/form-data',
}
const update = { bookId: '1950853094566805506', bookName: '我的名字', bookPrice: 30, bookNum: 50, bookAuthor: '作者名字', bookPress: '出版社名字', bookType: '法学', file: '', bookStatus: 0 }
const books = { bookName: '书名', bookPrice: 100, bookNum: 10, bookAuthor: '作者', bookPress: '出版社', bookType: '哲学', file: '1111', bookStatus: 1 }
function handler() {
  const formData = new FormData()
  formData.append('file', file.value.files[0])
  formData.append('bookName', books.bookName)
  formData.append('bookPrice', JSON.stringify(books.bookPrice))
  formData.append('bookNum', JSON.stringify(books.bookNum))
  formData.append('bookAuthor', books.bookAuthor)
  formData.append('bookType', books.bookType)
  formData.append('bookStatus', JSON.stringify(books.bookStatus))
  formData.append('bookPress', books.bookPress)
  // formData.append('books', JSON.stringify(books))
  const res = http.post('/books/add', formData)
  console.log(res)
}
function updatehandler() {
  const formData = new FormData()
  if (file.value.files[0]) {
    formData.append('file', file.value.files[0])
  }
  formData.append('bookId', update.bookId)
  formData.append('bookName', update.bookName)
  formData.append('bookPrice', JSON.stringify(update.bookPrice))
  formData.append('bookNum', JSON.stringify(update.bookNum))
  formData.append('bookAuthor', update.bookAuthor)
  formData.append('bookType', update.bookType)
  formData.append('bookStatus', JSON.stringify(update.bookStatus))
  formData.append('bookPress', update.bookPress)
  const res = http.post('/books/update', formData)
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
    <button @click="updatehandler()">
      修改
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
