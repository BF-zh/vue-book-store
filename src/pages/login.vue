<script setup lang="ts">
import type { ILoginData } from '@/types'
import { omit } from 'lodash'
import { UserApi } from '@/api'
import { defineFormItem } from '@/components/FormBuilder'

definePage({
  name: 'login',
  meta: {
    isPublic: true,
  },
})

const router = useRouter()

const formData = reactive<ILoginData>({
  password: '',
  username: '',
  type: 'users',
})
const { $execute, loading } = UserApi.login(formData)
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
    key: 'password',
    label: '密码',
    placeholder: '请输入密码',
    showPassword: true,
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
    key: 'type',
    label: '身份',
    type: 'select',
    placeholder: '请选择身份',
    defaultFirstOption: true,
    rules: { required: true, message: '身份不能为空' },
    options: [
      {
        label: '用户',
        value: 'users',
      },
      {
        label: '管理员',
        value: 'admin',
      },
    ],
  },
])

const formInstance = useTemplateRef('formRef')

function onSubmit() {
  formInstance.value?.validate()?.then(() => $execute(omit(formData, ['type'])))
}
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <el-card class="max-w-400px">
      <h2 class="mb-sm text-center">
        网上书店商城
      </h2>
      <form-builder ref="formRef" v-model="formData" :items="formItems" label-width="70" label-suffix="：" scroll-to-error />
      <div class="flex justify-between">
        <el-checkbox>记住我</el-checkbox>
        <el-link type="primary">
          忘记密码
        </el-link>
      </div>
      <div class="gap-sm flex flex-col">
        <el-button size="large" :loading="loading" @click="onSubmit">
          登录
        </el-button>
        <el-link type="default" @click="() => router.push('/register')">
          还没有账号？去注册
        </el-link>
      </div>
    </el-card>
  </div>
</template>
