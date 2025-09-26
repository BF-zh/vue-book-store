<script setup lang="ts">
import type { IUserUpdateDTO } from '@/types'
import type { UserInfo } from '@/types/user'
import { AdminApi, UserApi } from '@/api'

definePage({
  name: 'users',
  meta: {
    isPublic: false,
    title: '用户管理',
  },
})
const loading = ref(false)
const users = ref<UserInfo[]>([])
const total = ref(0)

// 分页参数
const pageParams = reactive({
  currentPage: 1,
  pageSize: 10,
  keywords: '',
  userStatus: undefined,
})

// 编辑相关
const editDialogVisible = ref(false)
const editedUser = ref<IUserUpdateDTO>({} as IUserUpdateDTO)

// 获取用户列表
async function loadUsers() {
  loading.value = true
  try {
    const res = await UserApi.getAllUserInfo(pageParams)
    users.value = res.data.records
    total.value = res.data.total
  }
  catch {
    ElMessage.error('获取用户列表失败')
  }
  finally {
    loading.value = false
  }
}

// 处理搜索
function handleSearch() {
  pageParams.currentPage = 1
  loadUsers()
}

// 处理分页大小变化
function handleSizeChange(val: number) {
  pageParams.pageSize = val
  pageParams.currentPage = 1
  loadUsers()
}

// 处理当前页变化
function handleCurrentChange(val: number) {
  pageParams.currentPage = val
  loadUsers()
}

// 打开编辑对话框
function openEditDialog(user: UserInfo) {
  const { password, birthday, imageUrl, isDeleted, createTime, updateTime, ...userInfo } = user
  editedUser.value = userInfo
  editDialogVisible.value = true
}

// 保存编辑
async function saveEdit() {
  try {
    await AdminApi.updateUserInfo(editedUser.value)
    editDialogVisible.value = false
    await loadUsers()
    ElMessage.success('更新成功')
  }
  catch {
    ElMessage.error('更新失败')
  }
}

// 切换用户状态
async function toggleUserStatus(user: UserInfo) {
  try {
    const status = user.userStatus === 1 ? 0 : 1
    await UserApi.updateUserStatus({ userId: user.userId, status })
    const action = status === 1 ? '启用' : '禁用'
    await loadUsers()
    ElMessage.success(`${action}成功`)
  }
  catch {
    ElMessage.error('操作失败')
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div>
    <!-- 搜索和筛选 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-input
          v-model="pageParams.keywords"
          placeholder="请输入用户ID或用户名搜索"
          clearable
          @input="handleSearch"
        />
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="pageParams.userStatus"
          placeholder="请选择用户状态"
          clearable
          style="width: 100%"
          @change="handleSearch"
        >
          <el-option label="全部状态" value="" />
          <el-option label="正常" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
      </el-col>
    </el-row>

    <!-- 用户表格 -->
    <el-table
      v-loading="loading"
      :data="users"
      style="width: 100%"
      border
    >
      <el-table-column prop="userId" label="用户ID" width="80" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="nickname" label="昵称" width="120" />
      <el-table-column prop="userSex" label="性别" width="80">
        <template #default="scope">
          <span>{{ scope.row.userSex === '1' ? '男' : scope.row.userSex === '0' ? '女' : '未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userAge" label="年龄" width="80" />
      <el-table-column prop="userPhone" label="手机号" width="120" />
      <el-table-column prop="userEmail" label="邮箱" width="180" />
      <el-table-column prop="userStatus" label="状态" width="80">
        <template #default="scope">
          <el-tag :type="scope.row.userStatus === 1 ? 'success' : 'danger'">
            {{ scope.row.userStatus === 1 ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="updateTime" label="更新时间" width="180" />

      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">
            编辑
          </el-button>
          <el-button
            :type="scope.row.userStatus === 1 ? 'danger' : 'success'"
            size="small"
            @click="toggleUserStatus(scope.row)"
          >
            {{ scope.row.userStatus === 1 ? '禁用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑用户" width="500px">
      <el-form :model="editedUser" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editedUser.username" disabled />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editedUser.nickname" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editedUser.userSex" placeholder="请选择性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.number="editedUser.userAge" type="number" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editedUser.userPhone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editedUser.userEmail" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="editedUser.userStatus"
            :active-value="1"
            :inactive-value="0"
            active-text="正常"
            inactive-text="禁用"
          />
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
      v-model:current-page="pageParams.currentPage"
      v-model:page-size="pageParams.pageSize"
      :page-sizes="[10, 20, 30, 50]"
      background
      layout="sizes, prev, pager, next"
      :total="total"
      style="margin-top: 20px; justify-content: center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @change="loadUsers"
    />
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
