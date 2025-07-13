<script setup lang="ts">
// import { computed, ref } from 'vue'

const books = ref([
  { id: 1, title: 'Vue 3 实战', author: '张三', price: 59 },
  { id: 2, title: '深入理解 JavaScript', author: '李四', price: 79 },
  { id: 3, title: 'Spring Boot 精讲', author: '王五', price: 69 },
])

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = 10

const filteredBooks = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()
  if (!keyword)
    return books.value
  return books.value.filter(
    book =>
      book.title.toLowerCase().includes(keyword)
      || book.author.toLowerCase().includes(keyword),
  )
})

// 添加逻辑
const addDialogVisible = ref(false)
const newBook = ref({ title: '', author: '', price: 0 })

function openAddDialog() {
  newBook.value = { title: '', author: '', price: 0 }
  addDialogVisible.value = true
}

function addBook() {
  const nextId = books.value.length ? Math.max(...books.value.map(b => b.id)) + 1 : 1
  books.value.push({ id: nextId, ...newBook.value })
  addDialogVisible.value = false
}

// 删除逻辑
function deleteBook(index) {
  books.value.splice(index, 1)
}

// 编辑逻辑
const editDialogVisible = ref(false)
const editedBook = ref({})

function openEditDialog(book) {
  editedBook.value = { ...book }
  editDialogVisible.value = true
}

function saveEdit() {
  const index = books.value.findIndex(b => b.id === editedBook.value.id)
  if (index !== -1) {
    books.value[index] = { ...editedBook.value }
  }
  editDialogVisible.value = false
}
</script>

<template>
  <div>
    <!-- 搜索和添加 -->
    <el-input
      v-model="searchKeyword"
      placeholder="请输入书名或作者"
      clearable
      style="width: 300px; margin-bottom: 16px"
      @input="filterBooks"
    />
    <el-button type="primary" style="margin-left: 10px; margin-bottom: 16px" @click="openAddDialog">
      ➕ 添加图书
    </el-button>

    <!-- 图书表格 -->
    <el-table :data="filteredBooks" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="书名" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="price" label="价格" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="deleteBook(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加弹窗 -->
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
        <el-button type="primary" @click="addBook">
          添加
        </el-button>
      </template>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑图书">
      <el-form :model="editedBook" label-width="60px">
        <el-form-item label="书名">
          <el-input v-model="editedBook.title" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="editedBook.author" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editedBook.price" type="number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveEdit">
          保存
        </el-button>
      </template>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      style="margin-top: 16px"
      background
      :page-sizes="[10, 20, 30, 50]"
      layout="prev, pager, next"
      :total="filteredBooks.length"
      :page-size="pageSize"
      current-page.sync="currentPage"
    />
    <!-- <el-affix position="bottom" :offset="20" style="float: right;">
        <el-pagination background layout="prev, pager, next" :total="1000" />
  </el-affix> -->
  </div>
</template>
