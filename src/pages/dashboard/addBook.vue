<script setup lang="ts">
import type { UploadUserFile } from 'element-plus'
import type { TBookData } from '@/types'
import { defineFormItem } from '@/components/FormBuilder'

definePage({
  name: 'add-book',
  meta: {
    // isPublic: true,
  },
})

const formData = reactive<TBookData>({
  bookName: '',
  bookMoney: 0,
  bookWriter: '',
  bookPress: '',
  bookStatus: 1,
  bookNum: 0,
  files: [],
})

const formInstance = useTemplateRef('formRef')

const formItem = defineFormItem(() => [
  {
    key: 'bookName',
    label: '书名',
    rules: [
      {
        required: true,
        message: '书名不能为空',
      },
    ],
  },
  {
    key: 'bookWriter',
    label: '作者',
    rules: [{
      required: true,
      message: '作者不能为空',
    }],
  },
  {
    key: 'bookPress',
    label: '出版社',
    rules: [{
      required: true,
      message: '出版社不能为空',
    }],
  },
  {
    key: 'bookNum',
    type: 'number',
    label: '数量',
    rules: [{
      required: true,
      message: '数量不能为空',
    }],
  },
  {
    key: 'bookMoney',
    type: 'number',
    label: '价格',
    rules: [{
      required: true,
      message: '价格不能为空',
    }],
  },
  {
    key: 'bookStatus',
    label: '是否上架',
    type: 'switch',
    activeValue: 1,
    inactiveValue: 0,
  },
  {
    key: 'files',
    label: '展示图片',
    rules: [
      {
        validator(_, value: UploadUserFile[], callback) {
          if (value && value.length >= 1)
            return callback()
          callback('请选择图片')
        },
        required: true,
        message: '请选择展示图片',
      },
    ],
  },
])
async function submitUpload() {
  try {
    await formInstance.value?.validate()
    const { files } = formData
    const fd = new FormData()
    files.forEach(({ raw }) => {
      raw && fd.append('files', raw)
    })
    fd.append('bookName', formData.bookName)
    fd.append('bookMoney', String(formData.bookMoney))
    fd.append('bookWriter', formData.bookWriter)
    fd.append('bookPress', formData.bookPress)
    fd.append('bookStatus', String(formData.bookStatus))
    fd.append('bookNum', String(formData.bookNum))
  }
  catch {
    console.log('error')
  }
}
</script>

<template>
  <FormBuilder ref="formRef" v-model="formData" label-width="100" scroll-to-error :items="formItem" label-suffix="：" class="w-lg">
    <template #files>
      <el-upload
        v-model:file-list="formData.files"
        :auto-upload="false"
        drag
        accept="image/*"
        multiple
        class="w-full"
      >
        <div>
          <i class="i-ep:upload-filled c-gray size-2em" />
          <div>
            Drop file here or <em>click to upload</em>
          </div>
        </div>

        <template #tip>
          <div class="text-center">
            jpg/png 格式的文件 且大小不超过 5M
          </div>
        </template>
      </el-upload>
    </template>
  </FormBuilder>
  <div>
    <el-button @click="() => submitUpload()">
      提交
    </el-button>
  </div>
</template>
