<script setup lang="ts">
definePage({
  name: 'address',
  meta: {
    name: '地址管理',
  },
})

// 地址数据
const addresses = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '朝阳路88号',
    isDefault: true,
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '陆家嘴金融中心',
    isDefault: false,
  },
])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

// 地址表单
const addressForm = ref({
  id: 0,
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  isDefault: false,
})

const formRef = ref()

const rules = {
  name: [
    { required: true, message: '请输入收货人姓名', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  province: [
    { required: true, message: '请选择省份', trigger: 'change' },
  ],
  city: [
    { required: true, message: '请选择城市', trigger: 'change' },
  ],
  district: [
    { required: true, message: '请选择区/县', trigger: 'change' },
  ],
  detail: [
    { required: true, message: '请输入详细地址', trigger: 'blur' },
  ],
}

// 添加地址
function addAddress() {
  dialogTitle.value = '添加地址'
  isEdit.value = false
  addressForm.value = {
    id: 0,
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false,
  }
  dialogVisible.value = true
}

// 编辑地址
function editAddress(address: any) {
  dialogTitle.value = '编辑地址'
  isEdit.value = true
  addressForm.value = { ...address }
  dialogVisible.value = true
}

// 保存地址
async function saveAddress() {
  try {
    await formRef.value.validate()

    if (isEdit.value) {
      // 编辑地址逻辑
      const index = addresses.value.findIndex(item => item.id === addressForm.value.id)
      if (index !== -1) {
        addresses.value[index] = { ...addressForm.value }
      }
    }
    else {
      // 添加地址逻辑
      addressForm.value.id = Date.now()
      addresses.value.push({ ...addressForm.value })
    }

    dialogVisible.value = false
    ElMessage.success(isEdit.value ? '地址更新成功' : '地址添加成功')
  }
  catch (err) {
    console.error('保存地址失败:', err)
  }
}

// 删除地址
function deleteAddress(id: number) {
  ElMessageBox.confirm('确定要删除这个地址吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    addresses.value = addresses.value.filter(item => item.id !== id)
    ElMessage.success('地址删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 设置默认地址
function setDefault(id: number) {
  addresses.value.forEach((item) => {
    item.isDefault = item.id === id
  })
  ElMessage.success('默认地址设置成功')
}
</script>

<template>
  <div class="address-page">
    <el-card class="content-card">
      <template #header>
        <div class="card-header">
          <span>地址管理</span>
          <el-button type="primary" @click="addAddress">
            添加地址
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
              <div class="address-name">
                {{ address.name }}
              </div>
              <div class="address-phone">
                {{ address.phone }}
              </div>
              <el-tag v-if="address.isDefault" type="primary" effect="dark">
                默认
              </el-tag>
            </div>
            <div class="address-actions">
              <el-button type="primary" link @click="editAddress(address)">
                编辑
              </el-button>
              <el-button type="danger" link @click="deleteAddress(address.id)">
                删除
              </el-button>
            </div>
          </div>
          <div class="address-detail">
            {{ address.province }} {{ address.city }} {{ address.district }} {{ address.detail }}
          </div>
          <div class="address-footer">
            <el-button
              v-if="!address.isDefault"
              size="small"
              @click="setDefault(address.id)"
            >
              设为默认
            </el-button>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 地址编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="addressForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addressForm.name" />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addressForm.phone" />
        </el-form-item>

        <el-form-item label="所在地区" required>
          <el-col :span="8">
            <el-form-item prop="province">
              <el-select v-model="addressForm.province" placeholder="省">
                <el-option label="北京市" value="北京市" />
                <el-option label="上海市" value="上海市" />
                <el-option label="广东省" value="广东省" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="city">
              <el-select v-model="addressForm.city" placeholder="市">
                <el-option label="北京市" value="北京市" />
                <el-option label="上海市" value="上海市" />
                <el-option label="广州市" value="广州市" />
                <el-option label="深圳市" value="深圳市" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="district">
              <el-select v-model="addressForm.district" placeholder="区">
                <el-option label="朝阳区" value="朝阳区" />
                <el-option label="浦东新区" value="浦东新区" />
                <el-option label="天河区" value="天河区" />
                <el-option label="南山区" value="南山区" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="详细地址" prop="detail">
          <el-input v-model="addressForm.detail" type="textarea" />
        </el-form-item>

        <el-form-item label="设为默认">
          <el-switch v-model="addressForm.isDefault" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveAddress">
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.address-page {
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
  margin-bottom: 10px;
}

.address-footer {
  text-align: right;
}

:deep(.el-card__header) {
  background-color: #f5f7fa;
  font-weight: bold;
  padding: 15px 20px;
}

:deep(.el-dialog) {
  border-radius: 8px;
}

:deep(.el-form-item) {
  margin-bottom: 18px;
}
</style>
