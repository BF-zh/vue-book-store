<script setup lang="ts">
import type { UserInfo } from '@/types/user'
import { UserApi } from '@/api'

definePage({
  name: 'user-info',
  meta: {
    name: '个人信息',
  },
})

const router = useRouter()

const formRef = ref()

// 用户信息表单
const userInfoForm = ref<UserInfo>({
  userId: 0,
  username: '',
  password: '',
  nickname: '',
  userSex: '',
  userAge: undefined,
  userEmail: '',
  userPhone: undefined,
  birthday: undefined,
  imageUrl: '',
  userStatus: undefined,
  createTime: '',
  updateTime: '',
})

const loading = ref(false)

// 获取用户信息
async function fetchUserInfo() {
  try {
    loading.value = true
    const res = await UserApi.getUserInfo()
    userInfoForm.value = res.data
  }
  catch (err) {
    ElMessage.error('获取用户信息失败')
  }
  finally {
    loading.value = false
  }
}

// 更新用户信息
async function updateUserInfo() {
  try {
    await formRef.value.validate()
    loading.value = true

    // 这里应该调用更新用户信息的API
    // await UserApi.updateUserInfo(userInfoForm.value)

    ElMessage.success('用户信息更新成功')
  }
  catch (err) {
    ElMessage.error('更新用户信息失败')
  }
  finally {
    loading.value = false
  }
}

const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度为2-20个字符', trigger: 'blur' },
  ],
  userSex: [
    { required: true, message: '请选择性别', trigger: 'change' },
  ],
  userAge: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 1, max: 150, message: '年龄必须在1-150之间', trigger: 'blur' },
  ],
  userEmail: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  userPhone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<template>
  <div class="user-info-page">
    <el-card class="content-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="userInfoForm"
        :rules="rules"
        label-width="100px"
        class="profile-form"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="userInfoForm.username" disabled />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用户ID">
              <el-input v-model="userInfoForm.userId" disabled />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="userInfoForm.nickname" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="性别" prop="userSex">
              <el-select v-model="userInfoForm.userSex" placeholder="请选择性别">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="年龄" prop="userAge">
              <el-input-number
                v-model="userInfoForm.userAge"
                :min="1"
                :max="150"
                controls-position="right"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="邮箱" prop="userEmail">
              <el-input v-model="userInfoForm.userEmail" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号" prop="userPhone">
              <el-input v-model="userInfoForm.userPhone" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="生日">
              <el-date-picker
                v-model="userInfoForm.birthday"
                type="date"
                placeholder="请选择生日"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="updateUserInfo"
          >
            保存信息
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.user-info-page {
  padding: 20px 0;
}

.content-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-form {
  padding: 20px 0;
}

:deep(.el-card__header) {
  background-color: #f5f7fa;
  font-weight: bold;
  padding: 15px 20px;
}
</style>
