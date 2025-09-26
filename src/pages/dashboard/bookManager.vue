<script setup lang="ts">
import type { UploadFile, UploadUserFile } from 'element-plus'
import type { IBooks } from '@/types'
import { BookApi, classifyApi } from '@/api'

definePage({
  name: 'books',
  meta: {
    isPublic: true,
    title: '图书列表',
  },
})

const useBook = useBookStore()

const loading = ref(true)
const pageParams = reactive({
  currentPage: 1,
  pageSize: 10,
  keywords: '',
  bookType: '',
  bookId: '',
  bookStatus: undefined,
})

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
      await BookApi.deleteBook(row.bookId)
      await loadBook()
      ElMessage.success(`${str}成功`)
      // location.reload()
    })
    .catch(() => {
      ElMessage.info(`取消${str}`)
    })
}

// 编辑逻辑
const edit = reactive({
  dialogVisible: false,
  book: {} as Omit<IBooks, 'id'>,
})

const uploadRef = ref()
const tempFileList = ref<UploadUserFile[]>([])

function openEditDialog(book: IBooks) {
  edit.book = { ...book }
  edit.dialogVisible = true
}

function handleFileChange(file: UploadFile) {
  // 将图片转换为预览URL
  const reader = new FileReader()
  reader.onload = (e) => {
    edit.book.bookImage = e.target?.result as string
  }
  if (file.raw) {
    reader.readAsDataURL(file.raw)
  }
}

async function saveEdit() {
  const fd = new FormData()
  edit.book.bookStatus = edit.book.bookStatus === '上架' ? 1 : 0
  fd.append('bookId', edit.book.bookId)
  fd.append('bookName', edit.book.bookName)
  fd.append('bookAuthor', edit.book.bookAuthor)
  fd.append('bookPrice', edit.book.bookPrice.toString())
  fd.append('bookStatus', edit.book.bookStatus.toString())
  fd.append('bookNum', edit.book.bookNum.toString())
  fd.append('bookPress', edit.book.bookPress)
  fd.append('bookType', edit.book.bookType)
  tempFileList.value[0] && fd.append('file', tempFileList.value[0].raw as Blob)
  try {
    await BookApi.updateBook(fd)
    tempFileList.value = []
  }
  catch (e: any) {
    ElMessage.error(e.message || '编辑图书失败')
  }
  await loadBook()
  setTimeout(() => {
    ElMessage.success('修改成功')
  }, 800)
  edit.dialogVisible = false
}

async function loadBook() {
  try {
    const res = await BookApi.getBook(pageParams)
    let i = 1
    useBook.pageParamsRes.records = []
    res.data.records.forEach((k) => {
      useBook.pageParamsRes.records.push({ id: i++, ...k })
    })
    useBook.pageParamsRes.currentPage = res.data.currentPage
    useBook.pageParamsRes.pageSize = res.data.pageSize
    useBook.pageParamsRes.total = res.data.total
    useBook.pageParamsRes.records.forEach((k) => {
      k.bookStatus = k.bookStatus ? '上架' : '下架'
    })
  }
  catch (e: any) {
    ElMessage.error(e.message || '获取图书列表失败')
  }
}

async function handlePageChange() {
  await loadBook()
}

const type = ref('全部')
const options = ref<{ label: string, value: string }[]>([
  { label: '全部', value: '' },
])

async function changeHandler() {
  pageParams.bookType = type.value === '全部' ? '' : type.value
  await loadBook()
}

onMounted(async () => {
  await loadBook()
  loading.value = false
  try {
    const res = await classifyApi.getAllBookType('')
    res.data.forEach(k => options.value.push({ label: k.bookType, value: k.bookType }))
  }
  catch (e: any) {
    ElMessage.error(e.message || '获取图书分类失败')
  }
})
</script>

<template>
  <div>
    <!-- 搜索和添加 -->
    <el-input
      v-model="pageParams.keywords"
      placeholder="请输入ID或书名或作者搜索"
      clearable
      style="width: 300px; "
      @input="loadBook()"
    />
    分类：
    <el-select
      v-model="type"
      value-key="id"
      placeholder="选择"
      style="width: 240px;"
      clearable
      @change="changeHandler()"
    >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <!-- 图书表格 -->
    <el-table
      v-loading="loading"
      :data="useBook.pageParamsRes.records"
      style="width: 100%"
    >
      <el-table-column fixed prop="id" label="ID" />
      <el-table-column prop="bookImage" label="展示图片">
        <template #default="scope">
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
      <el-table-column prop="bookName" label="书名" width="240" />
      <el-table-column prop="bookAuthor" label="作者" />
      <el-table-column prop="bookPrice" label="价格" />
      <el-table-column prop="bookNum" label="余量" />
      <el-table-column prop="bookPress" label="出版社" width="150" />
      <el-table-column prop="bookType" label="分类" />
      <el-table-column prop="bookStatus" label="状态" />
      <el-table-column prop="createTime" label="创建时间" width="200" />
      <el-table-column prop="updateTime" label="更新时间" width="200" />

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
    <!-- 编辑弹窗 -->
    <el-dialog v-model="edit.dialogVisible" title="编辑图书" width="500px">
      <el-form :model="edit.book" label-width="80px">
        <el-form-item label="书名">
          <el-input v-model="edit.book.bookName" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="edit.book.bookAuthor" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model.number="edit.book.bookPrice" type="number" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model.number="edit.book.bookNum" type="number" />
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="edit.book.bookPress" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="edit.book.bookType" placeholder="请选择分类">
            <el-option
              v-for="item in options.filter(opt => opt.value !== '')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="edit.book.bookStatus"
            active-value="上架"
            inactive-value="下架"
            active-text="上架"
            inactive-text="下架"
          />
        </el-form-item>
        <el-form-item label="图书图片">
          <el-upload
            ref="uploadRef"
            v-model:file-list="tempFileList"
            class="avatar-uploader"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleFileChange"
            accept="image/*"
          >
            <div class="image-upload-container">
              <img v-if="edit.book.bookImage" :src="edit.book.bookImage" class="book-image">
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
              <div class="image-overlay">
                <span>{{ edit.book.bookImage ? '点击更换图片' : '点击上传图片' }}</span>
              </div>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="edit.dialogVisible = false">
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
        v-model:current-page.sync="pageParams.currentPage"
        style="margin-top: 20px;"
        :page-sizes="[10, 20, 30, 50]"
        background
        layout="sizes, prev, pager, next"
        :total="useBook.pageParamsRes.total"
        @change="handlePageChange"
      />
    </el-affix>
  </div>
</template>

<style scoped>
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader .avatar-uploader-icon:hover {
  border-color: #409eff;
}

.book-image {
  width: 120px;
  height: 120px;
  display: block;
  object-fit: cover;
}

.image-upload-container {
  position: relative;
  display: inline-block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 6px;
  cursor: pointer;
}

.image-upload-container:hover .image-overlay {
  opacity: 1;
}
</style>
