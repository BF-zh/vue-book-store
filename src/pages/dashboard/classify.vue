<script setup lang="ts">
import { classifyApi } from '@/api'

definePage({
  name: 'classify',
  meta: {
    title: '分类管理',
  },
})

const searchKeyword = ref('')
const editDialogVisible = ref(false)
const addDialogVisible = ref(false)
interface IFilteredType {
  id: number
  bookType: string
}
const filteredType = ref<IFilteredType[]>([] as IFilteredType[])
const editedType = reactive({
  oldType: '',
  newType: '',
})
function openEditDialog(row: any) {
  editDialogVisible.value = true
  editedType.newType = ''
  editedType.oldType = row.bookType
}

async function search() {
  const type = await classifyApi.getAllBookType(searchKeyword.value)
  filteredType.value = []
  let i = 1
  type.data.forEach((k: { bookType: string }) => {
    filteredType.value?.push({ id: i++, bookType: k.bookType })
  })
}
async function saveEdit() {
  const res = await classifyApi.bookTypeUpdate(editedType)
  if (res.code !== 200 || !res) {
    ElMessage.error(res.message)
    return
  }
  ElMessage.success('修改成功')
  editDialogVisible.value = false
  bookTypeLoad()
}
async function saveAdd() {
  try {
    await classifyApi.bookTypeAdd(editedType.newType)
    ElMessage.success('添加成功')
    addDialogVisible.value = false
    bookTypeLoad()
  }
  catch (error: any) { ElMessage.error(error.message) }
}

async function deleteBookType(type: string) {
  // eslint-disable-next-line no-alert
  if (confirm('确认删除?')) {
    try {
      await classifyApi.delBookType(type)
      ElMessage.success('删除成功')
      bookTypeLoad()
    }
    catch (error: any) { ElMessage.error(error.message) }
  }
}
async function bookTypeLoad() {
  try {
    const type = await classifyApi.getAllBookType('')
    filteredType.value = []
    let i = 1
    type.data.forEach((k: { bookType: string }) => {
      filteredType.value?.push({ id: i++, bookType: k.bookType })
    })
  }
  catch (error: any) { ElMessage.error(error.message) }
}
function handleError() {
  searchKeyword.value = ''
  bookTypeLoad()
}

onMounted(() => {
  bookTypeLoad()
})
</script>

<template>
  <el-input
    v-model="searchKeyword"
    placeholder="请输入类型"
    clearable
    style="width: 300px; margin-bottom: 16px"
  />
  <el-button type="primary" style="margin-left: 10px; margin-bottom: 16px" @click="search">
    搜索
  </el-button>
  <el-button type="primary" style="margin-left: 10px; margin-bottom: 16px" @click="handleError()">
    重置
  </el-button>
  <el-button type="primary" style="margin-left: 10px; margin-bottom: 16px" @click="addDialogVisible = true; editedType.newType = ''">
    添加类型
  </el-button>
  <el-table :data="filteredType">
    <el-table-column prop="id" label="序号" />
    <el-table-column prop="bookType" label="类型" />
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <el-button size="small" @click="openEditDialog(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" size="small" @click="deleteBookType(scope.row.bookType)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="editDialogVisible" title="编辑图书类型">
    <el-form :model="editedType" label-width="60px" @submit.prevent>
      <el-form-item label="原类型">
        <el-input v-model="editedType.oldType" />
      </el-form-item>
      <el-form-item label="新类型">
        <el-input v-model="editedType.newType" />
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
  <el-dialog v-model="addDialogVisible" title="添加图书类型">
    <el-form :model="editedType" label-width="60px" @submit.prevent>
      <el-form-item label="新类型">
        <el-input v-model="editedType.newType" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="addDialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="saveAdd">
        保存
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
