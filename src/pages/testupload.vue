<script setup lang="ts">
import Modal from '@/components/Modal.vue'

import http from '@/utils/request'
// import CloudUploadIcon from './icons/CloudUploadIcon.vue'
// import EyeIcon from './icons/EyeIcon.vue'
// import PlusIcon from './icons/PlusIcon.vue'
// import TrashIcon from './icons/TrashIcon.vue'

interface UploadFile {
  id: string
  raw: File
  preview: string
  progress: number
}

// 暴露事件
const emit = defineEmits<{
  (e: 'upload-success', urls: string[]): void
}>()
// 响应式数据
const fileInput = ref<HTMLInputElement | null>(null)
const files = ref<UploadFile[]>([])
const dragOver = ref(false)
const isUploading = ref(false)
const uploadedCount = ref(0)
const showPreview = ref(false)
const currentPreview = ref('')

// 打开文件选择器
function openFilePicker() {
  fileInput.value?.click()
}

// 处理文件选择
function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) {
    addFiles(Array.from(input.files))
    input.value = '' // 重置以允许重复选择相同文件
  }
}

// 处理拖放文件
function handleDrop(e: DragEvent) {
  dragOver.value = false
  if (e.dataTransfer?.files) {
    addFiles(Array.from(e.dataTransfer.files))
  }
}

// 添加文件到列表
function addFiles(newFiles: File[]) {
  const validFiles = newFiles.filter((file) => {
    const isImage = file.type.startsWith('image/')
    const isSizeValid = file.size <= 5 * 1024 * 1024 // 5MB
    return isImage && isSizeValid
  })

  validFiles.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      files.value.push({
        id: crypto.randomUUID(),
        raw: file,
        preview: e.target?.result as string,
        progress: 0,
      })
    }
    reader.readAsDataURL(file)
  })
}

// 移除文件
function removeFile(index: number) {
  files.value.splice(index, 1)
}

// 预览图片
function previewImage(url: string) {
  currentPreview.value = url
  showPreview.value = true
}

// 上传文件
async function uploadFiles() {
  if (files.value.length === 0)
    return

  isUploading.value = true
  uploadedCount.value = 0

  try {
    const formData = new FormData()

    // 添加所有文件
    files.value.forEach((file) => {
      formData.append('files', file.raw)
    })

    // 添加额外参数
    formData.append('userId', '123') // 实际项目中从store获取
    formData.append('category', 'products')

    // 上传配置
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          )
          // 更新所有文件进度
          files.value.forEach((file) => {
            file.progress = progress
          })
        }
      },
    }

    // 发送请求
    const response = await http.post(
      'http://your-java-api/upload/multiple',
      formData,
      config,
    )

    if (response.data.success) {
      console.log('上传成功:', response.data.urls)
      // 触发成功事件
      emit('upload-success', response.data.urls)
    }
    else {
      console.error('上传失败:', response.data.message)
    }
  }
  catch (error) {
    console.error('上传出错:', error)
  }
  finally {
    isUploading.value = false
  }
}

// 初始化
onMounted(() => {
  // 可以添加初始化逻辑
})

// const selectedFile = ref<Blob[]>()
// function onFileChange($event: any) {
//   selectedFile.value = Array.from($event.target.files)
//   console.log(selectedFile)
// }
// function uploadImage() {
//   const formData = new FormData()
//   selectedFile.value?.forEach((k) => {
//     formData.append('files', k)
//   })
//   //   formData.append('files', selectedFile.value as [])
//   //   const res = http.post('download', formData)
//   console.log(formData.get('files'))

// //   console.log(res)
// }
</script>

<template>
  <!-- <input type="file" multiple accept="image/*" @change="onFileChange($event)">
  <button :disabled="!selectedFile" @click="uploadImage">
    上传图片
  </button> -->
  <div class="multi-upload-container">
    <!-- 拖拽上传区域 -->
    <div
      class="dropzone"
      :class="{ 'drag-active': dragOver }"
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="handleDrop"
    >
      <div v-if="files.length === 0" class="empty-state">
        <CloudUploadIcon class="icon" />
        <p>拖拽图片到这里或点击选择</p>
        <p class="hint">
          支持JPG、PNG格式，每张不超过5MB
        </p>
        <button class="select-btn" @click="openFilePicker">
          选择文件
        </button>
      </div>

      <!-- 预览区域 -->
      <div v-else class="preview-grid">
        <div
          v-for="(file, index) in files"
          :key="file.id"
          class="preview-item"
          :style="{ 'background-image': `url(${file.preview})` }"
        >
          <div class="preview-overlay">
            <button class="icon-btn" @click.stop="removeFile(index)">
              <TrashIcon />
            </button>
            <button class="icon-btn" @click.stop="previewImage(file.preview)">
              <EyeIcon />
            </button>
          </div>
          <div v-if="file.progress < 100" class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: `${file.progress}%` }"
            />
          </div>
        </div>

        <!-- 添加更多按钮 -->
        <div class="add-more" @click="openFilePicker">
          <PlusIcon />
        </div>
      </div>

      <!-- 隐藏的文件输入 -->
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        class="hidden-input"
        @change="handleFileSelect"
      >
    </div>

    <!-- 上传按钮 -->
    <button
      :disabled="files.length === 0 || isUploading"
      class="upload-btn"
      @click="uploadFiles"
    >
      <span v-if="!isUploading">上传 {{ files.length }} 张图片</span>
      <span v-else>
        上传中... {{ uploadedCount }}/{{ files.length }}
      </span>
    </button>

    <!-- 预览模态框 -->
    <Modal v-model:show="showPreview" @close="showPreview = false">
      <img :src="currentPreview" alt="预览" class="preview-image">
    </Modal>
  </div>
</template>

<style scoped>
.multi-upload-container {
  font-family: 'Inter', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.dropzone {
  min-height: 200px;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  transition: all 0.2s ease;
  margin-bottom: 16px;
}

.dropzone.drag-active {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.empty-state {
  text-align: center;
  color: #64748b;
}

.icon {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  color: #94a3b8;
}

.hint {
  font-size: 14px;
  color: #94a3b8;
  margin-top: 4px;
}

.select-btn {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.select-btn:hover {
  background-color: #2563eb;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  width: 100%;
}

.preview-item {
  position: relative;
  aspect-ratio: 1/1;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  overflow: hidden;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.2s;
}

.preview-item:hover .preview-overlay {
  opacity: 1;
}

.icon-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
}

.progress-fill {
  height: 100%;
  background-color: #3b82f6;
  transition: width 0.3s;
}

.add-more {
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
  color: #94a3b8;
  transition: all 0.2s;
}

.add-more:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.hidden-input {
  display: none;
}

.upload-btn {
  width: 100%;
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.upload-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.preview-image {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  margin: 0 auto;
}
</style>
