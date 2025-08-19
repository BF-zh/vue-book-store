<script setup lang="ts">
import type { IBooks } from '@/types'
import { deleteBook, getAllBooks } from '@/api/book'
import { useBookStore } from '@/store/bookStore'
import { getAllBookType } from '@/api/classify'

definePage({
  meta: {
    isPublic: true,
    name: '图书列表',
  },
})

const useBook = useBookStore()

const books = useBook.books
const loading = ref(true)
// const currentPage = ref(1)
// const pageSize = ref(10)
const url = 'http://localhost:8080/api/images/book/'
const pageParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keyWords: '',
  bookType: '',
})
// const filteredBooks = computed(() => {
//   const keyword1 = keyword.value.trim().toLowerCase()
//   if (!keyword1)
//     return books
//   return books.filter(
//     book =>
//       book.title.toLowerCase().includes(keyword)
//       || book.author.toLowerCase().includes(keyword),
//   )
// })

function delBook(row: IBooks) {
  const str = row.bookStatus === '下架' ? '上架' : '下架'
  ElMessageBox.confirm(
    `是否?${str}?`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    },
  )
    .then(async () => {
      await deleteBook(row.bookId)
      await loadBook()
      ElMessage.success(`${str}成功`)
      // location.reload()
    })
    .catch(() => {
      ElMessage.info(`取消${str}`)
    })
}
// function open() {

//   ElMessageBox.confirm(
//     `是否?${}`,
//     '警告',
//     {
//       confirmButtonText: 'OK',
//       cancelButtonText: 'Cancel',
//       type: 'warning',
//       center: true,
//     },
//   )
//     .then(() => {
//       ElMessage({
//         type: 'success',
//         message: 'Delete completed',
//       })
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: 'Delete canceled',
//       })
//     })
// }

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

async function loadBook() {
  const res = await getAllBooks(pageParams)
  res.data.records.forEach((k) => {
    k.bookImage = url + k.bookImage
    k.bookStatus = k.bookStatus ? '上架' : '下架'
  })
  useBook.pageParamsRes = res.data
}

const type = ref('全部')
const options = ref([
  // { label: '全部' },
])

async function changeHandler(){
  console.log(type.value);
  // pageParams.bookType = type.value
  // await getAllBooks(pageParams)
}

onMounted(async () => {
  await loadBook()
  loading.value = false

  const res = await getAllBookType('')
  res.data.forEach(k => options.value.push({label: k.bookType}))
})
</script>

<template>
  <div>
    <!-- 搜索和添加 -->
    <el-input
      v-model="pageParams.keyWords"
      placeholder="请输入ID或书名或作者搜索"
      clearable
      style="width: 300px; "
      @input="loadBook()"
    />
    <!-- 分类：
    <el-select
      v-model="type"
      value-key="id"
      placeholder="选择"
      style="width: 240px;"
      :change="changeHandler()"
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.label"
        :value="item"
      />
    </el-select> -->
    <!-- <el-button type="primary" style="margin-left: 10px; margin-bottom: 16px" @click="openAddDialog">
      ➕ 添加图书
      搜索
    </el-button> -->

    <!-- 图书表格 -->
    <el-table
      v-loading="loading"
      :data="useBook.pageParamsRes.records"
      style="width: 100%"
    >
      <el-table-column fixed prop="bookId" label="ID" width="200" />
      <el-table-column prop="bookImage" label="展示图片">
        <template #default="scope">
          <!-- <img src="http://localhost:8080/api/d1f51447-fd2f-4a09-b676-78f63e556fa0-屏幕截图 2025-07-10 233515.png" alt="" srcset=""> -->
          <el-image
            style="width: 100%; height: 100%"
            :src="scope.row.bookImage"
            :preview-src-list="scope"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            show-progress
            :initial-index="4"
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column prop="bookName" label="书名" />
      <el-table-column prop="bookAuthor" label="作者" />
      <el-table-column prop="bookPrice" label="价格" width="80" />
      <el-table-column prop="bookNum" label="余量" />
      <el-table-column prop="bookPress" label="出版社" />
      <el-table-column prop="bookType" label="分类" />
      <el-table-column prop="bookStatus" label="状态" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />

      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="delBook(scope.row)">
            {{ scope.row.bookStatus === '下架' ? '上架' : '下架' }}
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
        v-model:page-size="pageParams.pageSize"
        v-model:current-page.sync="pageParams.pageNum"
        style="margin-top: 20px;"
        :page-sizes="[10, 20, 30, 50]"
        background
        layout="sizes, prev, pager, next"
        :total="useBook.pageParamsRes.total"
      />
    </el-affix>
  </div>
</template>
