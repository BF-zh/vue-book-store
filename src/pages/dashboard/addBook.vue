<script setup lang="ts">
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus'
import type { IOptions } from '@/components/FormBuilder'
import type { IRes, IResTypeData, TBookData } from '@/types'
import { genFileId } from 'element-plus'
import { addBook } from '@/api/book'
import { getAllBookType } from '@/api/classify'
import { defineFormItem } from '@/components/FormBuilder'

definePage({
  name: 'add-book',
  meta: {
    // isPublic: true,
    title: '添加图书',
  },
})
const types = ref<IRes<IResTypeData[]>>()
const formData = reactive<TBookData>({
  bookName: '',
  bookPrice: 0,
  bookAuthor: '',
  bookPress: '',
  bookStatus: 1,
  bookNum: 0,
  files: [],
  types: [],
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
    key: 'bookAuthor',
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
    type: 'select',
    key: 'types',
    label: '分类',
    rules: [{
      required: true,
      message: '请选择分类',
    }],
    options: types.value?.data.map(v => ({
      label: v.bookType,
      value: v.bookType,
    } as IOptions)) || [],
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
    key: 'bookPrice',
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
    // const { files } = formData
    const fd = new FormData()
    formData.files.forEach(({ raw }: { raw: Blob }) => {
      raw && fd.append('files', raw)
    })
    fd.append('bookName', formData.bookName)
    fd.append('bookPrice', String(formData.bookPrice))
    fd.append('bookAuthor', formData.bookAuthor)
    fd.append('bookPress', formData.bookPress)
    fd.append('bookStatus', String(formData.bookStatus))
    fd.append('bookNum', String(formData.bookNum))
    fd.append('bookType', String(formData.types))
    console.log('提交数据') // 这里可以调用 API 上传数据
    // await uploadBook(fd) // 假设有一个 uploadBook 函数来处理上传
    await addBook(fd)
    formData.files = [] // 清空已上传的文件
    formInstance.value?.resetFields() // 重置表单
    // console.log('上传成功')
    ElMessage.success('添加成功')
  }
  catch {
    console.log('error')
  }
}
const upload = useTemplateRef<UploadInstance>('upload')
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

onMounted(async () => {
  types.value = await getAllBookType('')
})
</script>

<template>
  <FormBuilder ref="formRef" v-model="formData" label-width="100" scroll-to-error :items="formItem" label-suffix="：" class="w-lg">
    <template #files>
      <el-upload
        ref="upload"
        v-model:file-list="formData.files"
        :on-exceed="handleExceed"
        :auto-upload="false"
        drag
        accept="image/*"
        :limit="1"
        class="w-full"
      >
        <div>
          <i class="i-ep:upload-filled c-gray size-2em" />
          <div>
            在此拖放文件或 <em>点击上传 </em>
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
