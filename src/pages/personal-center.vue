<script setup lang="ts">
import type { UserInfo } from '@/types/user'
import { Camera, Clock, Document, HomeFilled, Location, Star, User } from '@element-plus/icons-vue'
import { getUserInfo } from '@/api/requestGet'

definePage({
  name: 'personal-center',
  meta: {
    name: '个人中心',
  },
})

const router = useRouter()

// 用户信息
const userInfo = ref<UserInfo>({
  userId: '',
  username: '',
  password: '',
  nickname: '',
  userSex: '',
  userAge: undefined,
  userEmail: '',
  userPhone: undefined,
  birthday: undefined,
  imageUrl: '',
  userStatus: null,
})

// 模拟地址数据
const addresses = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '东城区',
    address: '王府井大街1号',
    isDefault: true,
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    address: '陆家嘴金融中心2号',
    isDefault: false,
  },
])

// 模拟浏览记录数据
const browsingHistory = ref([
  {
    id: 1,
    title: 'Vue.js设计与实现',
    author: '霍春阳',
    price: 99.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-05-15',
  },
  {
    id: 2,
    title: 'JavaScript高级程序设计',
    author: 'Nicholas C. Zakas',
    price: 129.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-05-10',
  },
  {
    id: 3,
    title: '你不知道的JavaScript',
    author: 'Kyle Simpson',
    price: 79.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-05-01',
  },
])

// 模拟收藏数据
const favorites = ref([
  {
    id: 1,
    title: '深入浅出Vue.js',
    author: '刘博文',
    price: 89.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-04-20',
  },
  {
    id: 2,
    title: 'React实战',
    author: '陈天',
    price: 95.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-04-15',
  },
  {
    id: 3,
    title: 'Node.js实战',
    author: 'Mike Cantelon',
    price: 109.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-04-10',
  },
])

// 模拟订单数据
const orders = ref([
  {
    id: '20230515001',
    date: '2023-05-15',
    status: '已发货',
    total: 99.00,
    items: [
      { title: 'Vue.js设计与实现', price: 99.00, quantity: 1 },
    ],
  },
  {
    id: '20230510002',
    date: '2023-05-10',
    status: '已完成',
    total: 208.00,
    items: [
      { title: 'JavaScript高级程序设计', price: 129.00, quantity: 1 },
      { title: '你不知道的JavaScript', price: 79.00, quantity: 1 },
    ],
  },
])

const activeTab = ref('profile')
const loading = ref(false)
const isEditing = ref(false)
const avatarLoading = ref(false)

// 获取用户信息
async function fetchUserInfo() {
  try {
    loading.value = true
    const res = await getUserInfo()
    if (res.code === 200) {
      userInfo.value = res.data
    }
    else {
      ElMessage.error(res.message || '获取用户信息失败')
    }
  }
  catch (error) {
    ElMessage.error('获取用户信息时发生错误')
  }
  finally {
    loading.value = false
  }
}

// 编辑信息
function editInfo() {
  isEditing.value = true
}

// 保存信息
function saveInfo() {
  ElMessageBox.confirm('确定要保存修改的信息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    // 这里应该调用保存用户信息的API
    // 暂时模拟保存成功
    ElMessage.success('保存成功')
    isEditing.value = false
  }).catch(() => {
    ElMessage.info('已取消保存')
  })
}

// 取消编辑
function cancelEdit() {
  isEditing.value = false
  // 重新获取用户信息以恢复原状
  fetchUserInfo()
}

// 设置默认地址
function setDefaultAddress(id: number) {
  addresses.value.forEach((addr) => {
    addr.isDefault = addr.id === id
  })
  ElMessage.success('默认地址设置成功')
}

// 删除地址
function deleteAddress(id: number) {
  ElMessageBox.confirm('确定要删除该地址吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    addresses.value = addresses.value.filter(addr => addr.id !== id)
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 删除浏览记录
function deleteHistory(id: number) {
  browsingHistory.value = browsingHistory.value.filter(item => item.id !== id)
  ElMessage.success('删除成功')
}

// 清空浏览记录
function clearHistory() {
  ElMessageBox.confirm('确定要清空所有浏览记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    browsingHistory.value = []
    ElMessage.success('浏览记录已清空')
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

// 删除收藏
function deleteFavorite(id: number) {
  favorites.value = favorites.value.filter(item => item.id !== id)
  ElMessage.success('已取消收藏')
}

// 取消订单
function cancelOrder(id: string) {
  ElMessageBox.confirm('确定要取消该订单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    const order = orders.value.find(o => o.id === id)
    if (order) {
      order.status = '已取消'
      ElMessage.success('订单已取消')
    }
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

// 返回主页
function goHome() {
  router.push('/')
}

// 处理头像上传
function handleAvatarSuccess(response: any, uploadFile: any) {
  avatarLoading.value = false
  // 这里应该处理实际的上传响应
  // 模拟更新头像URL
  userInfo.value.imageUrl = URL.createObjectURL(uploadFile.raw)
  ElMessage.success('头像更新成功')
}

// 上传前检查
function beforeAvatarUpload(rawFile: any) {
  avatarLoading.value = true
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过 2MB!')
    avatarLoading.value = false
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
</script>

<template>
  <div class="personal-center">
    <div class="header">
      <h1>个人中心</h1>
      <p>管理您的个人信息和订单</p>
    </div>

    <div v-loading="loading" class="content">
      <el-row :gutter="20">
        <!-- 侧边栏 -->
        <el-col :span="6">
          <div class="sidebar">
            <el-card class="user-info-card">
              <div class="user-avatar-container">
                <el-avatar
                  :size="80"
                  :src="userInfo.imageUrl || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                  class="user-avatar"
                />
                <div class="avatar-overlay" @click="triggerFileInput">
                  <el-icon><Camera /></el-icon>
                  <span>更改头像</span>
                </div>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="beforeAvatarUpload"
                >
              </div>
              <div class="user-name">
                {{ userInfo.nickname || '用户' }}
              </div>
              <div class="user-id">
                ID: {{ userInfo.userId }}
              </div>
            </el-card>

            <el-menu
              :default-active="activeTab"
              class="sidebar-menu"
              @select="activeTab = $event"
            >
              <el-menu-item index="profile">
                <el-icon><User /></el-icon>
                <span>个人信息</span>
              </el-menu-item>
              <el-menu-item index="address">
                <el-icon><Location /></el-icon>
                <span>地址管理</span>
              </el-menu-item>
              <el-menu-item index="history">
                <el-icon><Clock /></el-icon>
                <span>浏览记录</span>
              </el-menu-item>
              <el-menu-item index="favorites">
                <el-icon><Star /></el-icon>
                <span>我的收藏</span>
              </el-menu-item>
              <el-menu-item index="orders">
                <el-icon><Document /></el-icon>
                <span>我的订单</span>
              </el-menu-item>
              <el-menu-item @click="goHome">
                <el-icon><HomeFilled /></el-icon>
                <span>返回主页</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>

        <!-- 主内容区 -->
        <el-col :span="18">
          <div class="main-content">
            <!-- 个人信息 -->
            <div v-show="activeTab === 'profile'" class="tab-content">
              <el-card class="content-card">
                <template #header>
                  <div class="card-header">
                    <span>基本信息</span>
                    <div v-if="!isEditing">
                      <el-button type="primary" @click="editInfo">
                        编辑信息
                      </el-button>
                    </div>
                    <div v-else>
                      <el-button type="success" @click="saveInfo">
                        保存
                      </el-button>
                      <el-button @click="cancelEdit">
                        取消
                      </el-button>
                    </div>
                  </div>
                </template>

                <el-form label-width="100px" :model="userInfo" class="profile-form">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="用户昵称">
                        <span v-if="!isEditing">{{ userInfo.nickname }}</span>
                        <el-input
                          v-else
                          v-model="userInfo.nickname"
                          placeholder="请输入昵称"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="用户账号">
                        <span>{{ userInfo.userId }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="性别">
                        <span v-if="!isEditing">{{ userInfo.userSex || '未设置' }}</span>
                        <el-select
                          v-else
                          v-model="userInfo.userSex"
                          placeholder="请选择性别"
                          style="width: 100%"
                        >
                          <el-option label="男" value="男" />
                          <el-option label="女" value="女" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="年龄">
                        <span v-if="!isEditing">{{ userInfo.userAge || '未设置' }}</span>
                        <el-input-number
                          v-else
                          v-model="userInfo.userAge"
                          :min="1"
                          :max="120"
                          placeholder="请输入年龄"
                          style="width: 100%"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="邮箱">
                        <span v-if="!isEditing">{{ userInfo.userEmail || '未设置' }}</span>
                        <el-input
                          v-else
                          v-model="userInfo.userEmail"
                          placeholder="请输入邮箱"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="电话">
                        <span v-if="!isEditing">{{ userInfo.userPhone || '未设置' }}</span>
                        <el-input
                          v-else
                          v-model="userInfo.userPhone"
                          placeholder="请输入电话"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="出生日期">
                        <span v-if="!isEditing">{{ userInfo.birthday ? new Date(userInfo.birthday).toLocaleDateString() : '未设置' }}</span>
                        <el-date-picker
                          v-else
                          v-model="userInfo.birthday"
                          type="date"
                          placeholder="请选择出生日期"
                          style="width: 100%"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>

              <el-card class="content-card security-card">
                <template #header>
                  <div class="card-header">
                    <span>安全设置</span>
                  </div>
                </template>

                <div class="security-content">
                  <el-button type="warning">
                    修改密码
                  </el-button>
                  <el-button type="danger">
                    注销账户
                  </el-button>
                </div>
              </el-card>
            </div>

            <!-- 地址管理 -->
            <div v-show="activeTab === 'address'" class="tab-content">
              <el-card class="content-card">
                <template #header>
                  <div class="card-header">
                    <span>收货地址</span>
                    <el-button type="primary">
                      新增地址
                    </el-button>
                  </div>
                </template>

                <div class="address-list">
                  <div
                    v-for="address in addresses"
                    :key="address.id"
                    class="address-item"
                    :class="{ 'default-address': address.isDefault }"
                  >
                    <div class="address-header">
                      <div class="address-info">
                        <span class="address-name">{{ address.name }}</span>
                        <span class="address-phone">{{ address.phone }}</span>
                        <el-tag v-if="address.isDefault" type="success" size="small">
                          默认
                        </el-tag>
                      </div>
                      <div class="address-actions">
                        <el-button
                          v-if="!address.isDefault"
                          type="primary"
                          size="small"
                          @click="setDefaultAddress(address.id)"
                        >
                          设为默认
                        </el-button>
                        <el-button type="danger" size="small" @click="deleteAddress(address.id)">
                          删除
                        </el-button>
                      </div>
                    </div>
                    <div class="address-detail">
                      {{ address.province }}{{ address.city }}{{ address.district }}{{ address.address }}
                    </div>
                  </div>
                </div>
              </el-card>
            </div>

            <!-- 浏览记录 -->
            <div v-show="activeTab === 'history'" class="tab-content">
              <el-card class="content-card">
                <template #header>
                  <div class="card-header">
                    <span>浏览记录</span>
                    <el-button type="danger" @click="clearHistory">
                      清空记录
                    </el-button>
                  </div>
                </template>

                <div class="history-list">
                  <div
                    v-for="item in browsingHistory"
                    :key="item.id"
                    class="history-item"
                  >
                    <div class="book-cover">
                      <el-image
                        :src="item.cover"
                        fit="cover"
                        :preview-src-list="[item.cover]"
                        class="cover-image"
                      />
                    </div>
                    <div class="book-info">
                      <div class="book-title">
                        {{ item.title }}
                      </div>
                      <div class="book-author">
                        {{ item.author }}
                      </div>
                      <div class="book-price">
                        ¥{{ item.price }}
                      </div>
                    </div>
                    <div class="history-date">
                      {{ item.date }}
                    </div>
                    <div class="history-actions">
                      <el-button type="primary" size="small">
                        再次查看
                      </el-button>
                      <el-button type="danger" size="small" @click="deleteHistory(item.id)">
                        删除
                      </el-button>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>

            <!-- 我的收藏 -->
            <div v-show="activeTab === 'favorites'" class="tab-content">
              <el-card class="content-card">
                <template #header>
                  <div class="card-header">
                    <span>我的收藏</span>
                  </div>
                </template>

                <div class="favorites-list">
                  <div
                    v-for="item in favorites"
                    :key="item.id"
                    class="favorite-item"
                  >
                    <div class="book-cover">
                      <el-image
                        :src="item.cover"
                        fit="cover"
                        :preview-src-list="[item.cover]"
                        class="cover-image"
                      />
                    </div>
                    <div class="book-info">
                      <div class="book-title">
                        {{ item.title }}
                      </div>
                      <div class="book-author">
                        {{ item.author }}
                      </div>
                      <div class="book-price">
                        ¥{{ item.price }}
                      </div>
                    </div>
                    <div class="favorite-date">
                      {{ item.date }}
                    </div>
                    <div class="favorite-actions">
                      <el-button type="primary" size="small">
                        加入购物车
                      </el-button>
                      <el-button type="danger" size="small" @click="deleteFavorite(item.id)">
                        取消收藏
                      </el-button>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>

            <!-- 我的订单 -->
            <div v-show="activeTab === 'orders'" class="tab-content">
              <el-card class="content-card">
                <template #header>
                  <div class="card-header">
                    <span>我的订单</span>
                  </div>
                </template>

                <div class="orders-list">
                  <div
                    v-for="order in orders"
                    :key="order.id"
                    class="order-item"
                  >
                    <div class="order-header">
                      <div class="order-id">
                        订单号：{{ order.id }}
                      </div>
                      <div class="order-date">
                        {{ order.date }}
                      </div>
                      <div class="order-status">
                        <el-tag
                          :type="order.status === '已完成' ? 'success' : order.status === '已取消' ? 'info' : 'primary'"
                        >
                          {{ order.status }}
                        </el-tag>
                      </div>
                    </div>
                    <div class="order-items">
                      <div
                        v-for="(item, index) in order.items"
                        :key="index"
                        class="order-item-detail"
                      >
                        <div class="item-info">
                          {{ item.title }}
                        </div>
                        <div class="item-price">
                          ¥{{ item.price }} x {{ item.quantity }}
                        </div>
                      </div>
                    </div>
                    <div class="order-footer">
                      <div class="order-total">
                        总计：¥{{ order.total }}
                      </div>
                      <div class="order-actions">
                        <el-button size="small" type="primary">
                          查看详情
                        </el-button>
                        <el-button
                          v-if="order.status === '待发货' || order.status === '已发货'"
                          size="small"
                          type="danger"
                          @click="cancelOrder(order.id)"
                        >
                          取消订单
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.personal-center {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  margin-bottom: 20px;
}

.header h1 {
  font-size: 28px;
  color: #303133;
  margin-bottom: 5px;
}

.header p {
  color: #909399;
  font-size: 14px;
}

.sidebar {
  position: sticky;
  top: 20px;
}

.user-info-card {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.user-avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
}

.user-avatar {
  display: block;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
}

.avatar-overlay:hover {
  opacity: 1;
}

.avatar-overlay .el-icon {
  font-size: 20px;
  margin-bottom: 5px;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.user-id {
  color: #909399;
  font-size: 14px;
}

.sidebar-menu {
  border: none;
  border-radius: 8px;
  overflow: hidden;
}

.sidebar-menu :deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  background-color: #ecf5ff;
  color: #409eff;
}

.content-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-form {
  padding: 10px 0;
}

.security-card {
  margin-bottom: 0;
}

.security-content {
  display: flex;
  gap: 15px;
}

/* 地址管理样式 */
.address-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.address-item {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 15px;
  transition: all 0.3s;
}

.address-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.default-address {
  border-color: #409eff;
  background-color: #ecf5ff;
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.address-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.address-name {
  font-weight: 600;
}

.address-phone {
  color: #909399;
}

.address-detail {
  color: #606266;
}

/* 浏览记录样式 */
.history-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  transition: all 0.3s;
}

.history-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.book-cover {
  width: 60px;
  height: 80px;
  margin-right: 15px;
}

.cover-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.book-info {
  flex: 1;
  margin-right: 15px;
}

.book-title {
  font-weight: 600;
  margin-bottom: 5px;
}

.book-author {
  color: #909399;
  font-size: 14px;
  margin-bottom: 5px;
}

.book-price {
  color: #fa541c;
  font-weight: 600;
}

.history-date {
  color: #909399;
  margin-right: 15px;
  width: 100px;
}

.history-actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 120px;
}

/* 收藏样式 */
.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.favorite-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  transition: all 0.3s;
}

.favorite-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.favorite-date {
  color: #909399;
  margin-right: 15px;
  width: 100px;
}

.favorite-actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 120px;
}

/* 订单样式 */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  overflow: hidden;
}

.order-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.order-id {
  flex: 1;
  font-weight: 600;
}

.order-date {
  margin: 0 20px;
  color: #909399;
}

.order-items {
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
}

.order-item-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-item-detail:last-child {
  margin-bottom: 0;
}

.item-info {
  flex: 1;
}

.item-price {
  color: #909399;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.order-total {
  font-weight: 600;
  color: #fa541c;
}

.order-actions {
  display: flex;
  gap: 10px;
}

:deep(.el-card__header) {
  background-color: #f5f7fa;
  font-weight: bold;
  padding: 15px 20px;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .el-col {
    width: 100%;
  }

  .history-item,
  .favorite-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .history-date,
  .favorite-date,
  .history-actions,
  .favorite-actions {
    width: 100%;
    margin: 10px 0 0 0;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .order-date {
    margin: 0;
  }

  .order-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
