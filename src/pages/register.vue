<script setup lang="ts">
import type { IRegisterData } from '@/types'
import { UserApi } from '@/api'
import { defineFormItem } from '@/components/FormBuilder'

definePage({
  meta: {
    isPublic: true,
  },
})

const router = useRouter()

const formData = reactive<IRegisterData>({
  password: '',
  username: '',
  nickname: '',
  checkPassword: '',
})
const { $execute, loading } = UserApi.register()
const formItems = defineFormItem(() => [
  {
    key: 'username',
    label: '账号',
    placeholder: '请输入账号',
    rules: [
      {
        required: true,
        message: '账号不能为空',
      },
    ],
  },
  {
    key: 'nickname',
    label: '昵称',
    placeholder: '请输入昵称',
    rules: [
      {
        required: true,
        message: '昵称不能为空',
      },
    ],
  },
  {
    key: 'password',
    label: '密码',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '密码不能为空',
      },
      {
        min: 6,
        max: 16,
        message: '账号长度为6-16位',
      },
    ],
  },
  {
    key: 'checkPassword',
    label: '确认密码',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '密码不能为空',
      },
      {
        validator: (_,val,handleError) => {
          if (formData.password !== val) {
           return handleError("两次密码不一致")
          }
          return true
        },
      },
    ],
  },
])

const formInstance = useTemplateRef('formRef')

function onSubmit() {
  formInstance.value?.validate()?.then(()=>$execute(formData))
}
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <el-card class="max-w-400px">
      <h2 class="mb-sm text-center">
        注册账号
      </h2>
      <form-builder ref="formRef" v-model="formData" :items="formItems" label-width="100" label-suffix="：" scroll-to-error :onsubmit="()=>console.log('submit')"  />
      <div class="gap-sm flex flex-col">
        <el-button size="large" :loading="loading" @click="onSubmit">
          注册账号
        </el-button>
        <el-link type="default" @click="() => router.push('/login')">
          已有账号？去登录
        </el-link>
      </div>
    </el-card>
  </div>
</template>
