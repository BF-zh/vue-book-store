<script setup>
import { Delete, Plus } from '@element-plus/icons-vue'

const imagePreview = ref(null) // 单张图片预览
const fileInput = ref(null) // 文件输入
const modalVisible = ref(false) // 模态框显示状态
const modalImage = ref(null) // 模态框显示的大图

// 触发文件选择
function triggerFileInput() {
  fileInput.value.click()
}

// 处理文件选择
function handleFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    // 创建图片预览
    const reader = new FileReader()
    reader.onload = () => {
      imagePreview.value = reader.result
    }
    reader.readAsDataURL(file)

    // 清空文件输入框以便下次选择图片
    fileInput.value.value = ''
  }
  else {
    alert('请上传有效的图片文件')
  }
}

// 上传图片 (这里只是一个模拟方法，你可以替换为实际的上传逻辑)
function uploadImage() {
  alert('图片已上传！')
  // 清空选择的图片
  imagePreview.value = null
}

// 打开模态框显示大图
function openModal() {
  modalImage.value = imagePreview.value
  modalVisible.value = true
}

// 关闭模态框
function closeModal() {
  modalVisible.value = false
}
</script>

<template>
  <div class="image-upload">
    <!-- 单张图片选择 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      hidden
      @change="handleFileChange"
    >
    <button @click="triggerFileInput">
      选择图片
    </button>

    <div v-if="imagePreview" class="image-preview pos-relative">
      <img
        :src="imagePreview"
        alt="image preview"
        @click="openModal"
      >
      <span class="absolute" style="top: 0;right: 0;">
        <el-icon>
          <Delete />
        </el-icon>
      </span>
    </div>

    <!-- 模态框显示大图 -->
    <div v-if="modalVisible" class="modal" @click="closeModal">
      <img :src="modalImage" alt="image preview" class="modal-image">
    </div>

    <button v-if="imagePreview" @click="uploadImage">
      上传图片
    </button>
  </div>
</template>

<style scoped>
.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.image-preview img {
  max-width: 300px;
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
