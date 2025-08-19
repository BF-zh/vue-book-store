<script setup lang="ts">
import { BookApi } from '@/api'

definePage({
  name: 'book-type', // 路由名字 留空将以路由地址作为名字
  meta: {

  },
})
const type = ref<string>('') // 当前分类类型
const editForm = reactive({
  oldType: '',
  newType: '',
})
const keywords = ref<string>('')
const { execute } = BookApi.addBookType(type)
const { execute: handleSearch, data } = BookApi.getBookType()
const { $execute: handleUpdate } = BookApi.updateBookType()
const [dialogVisible, toggleVisible] = useToggle<boolean>(false)
const [dialogEditVisible, toggleEditVisible] = useToggle<boolean>(false)
onMounted(() => {
  handleSearch({ params: {
    searchKeyword: '',
  } })
})
function handleSubmit() {
  handleSearch({ params: {
    searchKeyword: keywords.value,
  } })
}
function handleEdit(row: any) {
  editForm.oldType = row.bookType
  toggleEditVisible()
}
function handleDelete(row: any) {
  BookApi.deleteBookType(row.bookType)
}
async function handleAdd() {
  if (!type.value)
    return ElMessage.error('图书分类不能为空')
  await execute()
  type.value = ''
  // 这里可以添加逻辑来处理添加分类的操作
  // 比如打开一个对话框让用户输入分类名称等
  // 这里暂时只是打印日志
  // 实际应用中可以使用 API 调用来添加分类 d
}
</script>

<template>
  <el-table
    :data="data?.data"
    style="width: 100%; margin-top: 20px"
  >
    <el-table-column
      prop="bookType"
      label="分类名称"
      width="auto"
    />

    <el-table-column
      label="操作"
      width="500"
    >
      <template #header>
        <div class="gap-sm flex items-center justify-between">
          <el-input
            v-model="keywords"
            placeholder="请输入类型后回车搜索"
            clearable
            size="small"
            @keyup.enter="handleSubmit"
          />
          <el-button
            type="primary"
            size="small"
            @click="() => toggleVisible(true)"
          >
            添加分类
          </el-button>
        </div>
      </template>
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          @click="handleEdit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogEditVisible"
    title="编辑分类"
    width="30vw"
    align-center
  >
    <el-input v-model="editForm.newType" placeholder="新的分类名称" />

    <template #footer>
      <el-button @click="toggleEditVisible(false)">
        取消
      </el-button>
      <el-button
        type="primary" @click="() => handleUpdate(editForm)"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogVisible"
    title="添加分类"
    width="30vw"
    align-center
  >
    <el-input v-model="type" placeholder="请输入分类名称" />

    <template #footer>
      <el-button @click="toggleVisible(false)">
        取消
      </el-button>
      <el-button
        type="primary" @click="handleAdd"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
