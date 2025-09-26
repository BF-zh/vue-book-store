<script setup lang="ts">
import type { UserInfo } from '@/types/user'
import {
  Camera,
  // ClockFilled,
  // DocumentFilled,
  Edit,
  HomeFilled,
  LocationFilled,
  StarFilled,
  UserFilled,
} from '@element-plus/icons-vue'
import { UserApi } from '@/api'
import { userCenterStore } from '@/store/userCenter'

definePage({
  name: 'personal-center',
  meta: {
    name: '个人中心',
  },
})

const router = useRouter()
const useUserCenterStore = userCenterStore()

// 用户信息
const userInfo = ref<UserInfo>({
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
const activeTab = ref('profile')

// 获取用户信息
async function fetchUserInfo() {
  try {
    loading.value = true
    const res = await UserApi.getUserInfo()
    userInfo.value = res.data as UserInfo
    useUserCenterStore.userInfo = res.data
  }
  catch {
    ElMessage.error('获取用户信息时发生错误,请重新登录')
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }
  finally {
    loading.value = false
  }
}

// 返回主页
function goHome() {
  router.push('/')
}

// 处理头像上传
function handleAvatarSuccess(response: any, uploadFile: any) {
  // 这里应该处理实际的上传响应
  // 模拟更新头像URL
  userInfo.value.imageUrl = URL.createObjectURL(uploadFile.raw)
  ElMessage.success('头像更新成功')
}

// 上传前检查
function beforeAvatarUpload(rawFile: any) {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过 2MB!')
    return false
  }
  return true
}

// 触发文件选择
function triggerFileInput() {
  const fileInput = document.getElementById('avatar-upload')
  if (fileInput) {
    fileInput.click()
  }
}

const menuItems = [
  {
    id: 'profile',
    name: '个人信息',
    icon: UserFilled,
    route: '/personal-center/user-info',
  },
  {
    id: 'address',
    name: '地址管理',
    icon: LocationFilled,
    route: '/personal-center/address',
  },
  {
    id: 'orders',
    name: '我的订单',
    // icon: DocumentFilled,
    route: '/personal-center/orders',
  },
  {
    id: 'favorites',
    name: '我的收藏',
    icon: StarFilled,
    route: '/personal-center/favorites',
  },
  {
    id: 'history',
    name: '浏览记录',
    // icon: ClockFilled,
    route: '/personal-center/history',
  },
  {
    id: 'home',
    name: '返回主页',
    icon: HomeFilled,
    action: goHome,
  },
]

onMounted(() => {
  // fetchUserInfo()
})
</script>

<template>
  <div class="personal-center">
    <div class="header-section">
      <div class="header-content">
        <h1>个人中心</h1>
        <p>管理您的个人信息和订单</p>
      </div>
    </div>

    <div v-loading="loading" class="content-wrapper">
      <el-row :gutter="24" class="main-row">
        <!-- 侧边栏 -->
        <el-col :span="24" :md="7" :lg="6" class="sidebar-col">
          <div class="sidebar-container">
            <div class="user-card">
              <div class="avatar-wrapper">
                <el-avatar
                  :size="80"
                  :src="userInfo.imageUrl || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                  class="user-avatar"
                />
                <div class="avatar-overlay" @click="triggerFileInput">
                  <el-icon><Camera /></el-icon>
                </div>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="beforeAvatarUpload"
                >
              </div>
              <div class="user-info">
                <h2 class="user-name">
                  {{ userInfo.nickname || '用户' }}
                </h2>
                <p class="user-id">
                  ID: {{ userInfo.userId }}
                </p>
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="router.push('/personal-center/user-info')"
                >
                  <el-icon><Edit /></el-icon>
                  编辑资料
                </el-button>
              </div>
            </div>

            <el-menu
              :default-active="$route.name"
              class="sidebar-menu"
              router
            >
              <el-menu-item
                v-for="item in menuItems"
                :key="item.id"
                :index="item.id"
                :route="item.route"
                class="menu-item"
                @click="item.action && item.action()"
              >
                <el-icon><component :is="item.icon" /></el-icon>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>

        <!-- 主内容区 -->
        <el-col :span="24" :md="17" :lg="18" class="content-col">
          <div class="main-content">
            <router-view />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.personal-center {
  padding: 0;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 40px;
  color: white;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.header-content h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.header-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.content-wrapper {
  padding: 0 30px 30px;
  width: 100%;
}

.main-row {
  margin: 0;
}

.sidebar-col {
  padding-left: 0;
  padding-right: 12px;
}

.content-col {
  padding-left: 12px;
  padding-right: 0;
}

.sidebar-container {
  position: sticky;
  top: 30px;
}

.user-card {
  background: white;
  border-radius: 16px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  transition: all 0.3s ease;
  width: 100%;
}

.user-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.user-avatar {
  display: block;
  border: 3px solid #e0e6ed;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.avatar-overlay:hover {
  opacity: 1;
}

.avatar-overlay .el-icon {
  font-size: 24px;
}

.user-info .user-name {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 10px 0 5px;
  color: #303133;
}

.user-info .user-id {
  color: #909399;
  margin: 0 0 15px;
  font-size: 0.9rem;
}

.sidebar-menu {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: none;
  width: 100%;
}

.menu-item {
  height: 56px;
  line-height: 56px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: #f0f5ff;
  color: #409eff;
}

.menu-item.is-active {
  background-color: #ecf5ff;
  color: #409eff;
  font-weight: 500;
}

.main-content {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  min-height: 600px;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 992px) {
  .sidebar-col,
  .content-col {
    padding-left: 12px;
    padding-right: 12px;
  }

  .sidebar-container {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .header-section {
    padding: 20px;
    border-radius: 0 0 15px 15px;
  }

  .header-content h1 {
    font-size: 1.8rem;
  }

  .content-wrapper {
    padding: 0 15px 20px;
  }

  .user-card {
    padding: 20px 15px;
  }

  .main-content {
    padding: 20px;
  }

  .sidebar-container {
    margin-bottom: 24px;
  }

  .sidebar-col,
  .content-col {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
