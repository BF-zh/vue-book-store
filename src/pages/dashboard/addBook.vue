<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import type { IBooks } from '@/types'
import { Plus } from '@element-plus/icons-vue'

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

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
//   if (rawFile.type !== 'image/jpeg') {
//     ElMessage.error('Avatar picture must be JPG format!')
//     console.log(rawFile)
//     return false
//   }
//   else if (rawFile.size / 1024 / 1024 > 2) {
//     ElMessage.error('Avatar picture size can not exceed 2MB!')
//     return false
//   }
  return true
}
</script>

<template>
  <el-form :model="form" style="max-width: 600px; display: flex; flex-direction: column; justify-content: center;">
    <el-form-item label="书&emsp;&emsp;名">
      <el-input v-model="form.bookName" />
    </el-form-item>
    <el-form-item label="作&emsp;&emsp;者">
      <el-input v-model="form.bookWriter" />
    </el-form-item>
    <el-form-item label="出&emsp;版&emsp;社">
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
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
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
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
