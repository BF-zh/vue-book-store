<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus'
import type { IBooks } from '@/types'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import http from '@/utils/request'

const form = reactive<IBooks>({
  bookId: '',
  bookName: '',
  bookMoney: 0,
  bookNum: 0,
  bookWriter: '',
  bookPress: '',
  createTime: new Date().toLocaleString(),
  bookStatus: 1,
})

// const imageUrl = ref('')

// const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
//   imageUrl.value = URL.createObjectURL(uploadFile.raw!)
// }

// const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
// //   if (rawFile.type !== 'image/jpeg') {
// //     ElMessage.error('Avatar picture must be JPG format!')
//   console.log(rawFile)
//   //     return false
//   //   }
//   //   else if (rawFile.size / 1024 / 1024 > 2) {
//   //     ElMessage.error('Avatar picture size can not exceed 2MB!')
//   //     return false
//   //   }
//   // imageUrl.value = URL.createObjectURL(rawFile)

//   return true
// }
// const dialogImageUrl = ref('')
// const dialogVisible = ref(false)

// const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
//   dialogImageUrl.value = uploadFile.url!
//   dialogVisible.value = true
// }
const imagePreview = ref<string[]>() // 图片预览
const fileInput = ref() // 文件输入
const modalVisible = ref(false) // 模态框显示状态

// 触发文件选择
function triggerFileInput() {
  fileInput.value.click()
  console.log(fileInput)
}

// 处理文件选择
function handleFileChange(event: any) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    // 创建图片预览
    // const reader = new FileReader()
    // reader.onload = () => {
    //   imagePreview.value = reader.result
    // }
    // reader.readAsDataURL(file)
    imagePreview.value?.push(file)
  }
  else {
    alert('请上传有效的图片文件')
  }
}
const headers = { 'Content-Type': 'multipart/form-data' }
// 上传图片 (这里只是一个模拟方法，你可以替换为实际的上传逻辑)
function uploadImage() {
  const formData = new FormData()
  formData.append('files', fileInput.value.files[0])
  const res = http.post('/download', formData, { headers })
  console.log(res)

  // alert('图片已上传！')
  // // 清空选择的图片
  // imagePreview.value = null
}

// 打开模态框显示大图
function openModal() {
  modalVisible.value = true
}

// 关闭模态框
function closeModal() {
  modalVisible.value = false
}
</script>

<template>
  <el-form :model="form" style="max-width: 600px; display: flex; flex-direction: column; justify-content: center;" @submit.prevent>
    <el-form-item label="书&emsp;&emsp;名">
      <el-input v-model="form.bookName" />
    </el-form-item>
    <el-form-item label="作&emsp;&emsp;者">
      <el-input v-model="form.bookWriter" />
    </el-form-item>
    <el-form-item label="出&nbsp;&nbsp;版&nbsp;&nbsp;社">
      <el-input v-model="form.bookPress" />
    </el-form-item>
    <el-form-item label="数&emsp;&emsp;量">
      <el-input-number v-model="form.bookNum" />
    </el-form-item>
    <el-form-item label="价&emsp;&emsp;格">
      <el-input-number v-model="form.bookMoney">
        <template #suffix>
          <span>RMB</span>
        </template>
      </el-input-number>
    </el-form-item>
    <el-form-item label="展示图片">
      <div class="image-upload">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          hidden
          @change="handleFileChange"
        >
        <ElButton @click="triggerFileInput">
          选择图片
        </ElButton>

        <div
          v-for=" (items, index) in imagePreview"
          :key="index" class="image-preview h-200px w-150px relative"
        >
          <!-- 点击预览图显示大图 -->
          <img
            :key="index"
            :src="items"
            class="h-full w-full"
            alt="image preview"
            @click="openModal"
          >
          <span class="right-0 top-0 absolute">
            <el-icon>
              <Delete />
            </el-icon>
          </span>
        </div>

        <!-- 模态框显示大图 -->
        <div v-if="modalVisible" class="modal" @click="closeModal">
          <img :src="imagePreview" alt="image preview" class="modal-image">
        </div>

        <button v-if="imagePreview" @click="uploadImage">
          上传图片
        </button>
      </div>
    </el-form-item>
    <el-form-item label="是否上架">
      <el-radio-group v-model="form.bookStatus">
        <el-radio value="1">
          上架
        </el-radio>
        <el-radio value="0">
          不上架
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">
        添加
      </el-button>
      <el-button>
        清空
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
}

.image-preview img:hover {
  transform: scale(1.1);
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
</style>
