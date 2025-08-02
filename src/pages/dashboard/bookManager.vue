<script setup lang="ts">
import AddBook from '@/components/AddBook.vue'
import { useBookStore } from '@/store/bookStore'

const useBook = useBookStore()

const books = useBook.books

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const url = ref('http://localhost:8080/api/d1f51447-fd2f-4a09-b676-78f63e556fa0-屏幕截图 2025-07-10 233515.png')

const filteredBooks = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()
  if (!keyword)
    return books
  return books.filter(
    book =>
      book.title.toLowerCase().includes(keyword)
      || book.author.toLowerCase().includes(keyword),
  )
})
// 添加逻辑
// const newBook = ref({ title: '', author: '', price: 0 })
const newBook = ref(useBook.$state.newBook)

function openAddDialog() {
  newBook.value = { title: '', author: '', price: 0 }
  useBook.addDialogVisible = true
}

// function addBook() {
//   const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1
//   books.push({ id: nextId, ...newBook.value })
//   addDialogVisible.value = false
// }
// 删除逻辑
function deleteBook(index) {
  books.splice(index, 1)
}

// 编辑逻辑
const editDialogVisible = ref(false)
const editedBook = ref({})

function openEditDialog(book) {
  editedBook.value = { ...book }
  editDialogVisible.value = true
}

function saveEdit() {
  const index = books.findIndex(b => b.id === editedBook.value.id)
  if (index !== -1) {
    books[index] = { ...editedBook.value }
  }
  editDialogVisible.value = false
}
onMounted(() => {
  console.log(books)
})
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
      <!-- ➕ 添加图书 -->
      搜索
    </el-button>

    <!-- 图书表格 -->
    <el-table
      :data="filteredBooks"

      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="1" label="展示图片">
        <template #default="scope">
          <!-- <img src="http://localhost:8080/api/d1f51447-fd2f-4a09-b676-78f63e556fa0-屏幕截图 2025-07-10 233515.png" alt="" srcset=""> -->
          <el-image
            style="width: 100%; height: 100%"
            :src="url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            show-progress
            :initial-index="4"
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="书名" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="price" label="价格" width="80" />
      <el-table-column prop="1" label="余量" />
      <el-table-column prop="1" label="出版社" />
      <el-table-column prop="1" label="状态" />
      <el-table-column prop="1" label="创建时间" />
      <el-table-column prop="1" label="更新时间" />

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
    <!-- <el-dialog v-model="addDialogVisible" title="添加图书">
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
    </el-dialog> -->
    <!-- <AddBook /> -->
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
    <el-affix position="bottom" :offset="20" style="float: right;">
      <el-pagination
        v-model:page-size="pageSize"
        v-model:current-page.sync="currentPage"
        style="margin-top: 20px;"
        :page-sizes="[10, 20, 30, 50]"
        background
        layout="sizes, prev, pager, next"
        :total="filteredBooks.length"
      />
    </el-affix>

    <!-- <el-affix position="bottom" :offset="20" style="float: right;">
        <el-pagination background layout="prev, pager, next" :total="1000" />
  </el-affix> -->
  </div>
</template>
