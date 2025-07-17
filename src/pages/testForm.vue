<script setup lang="ts">
import { ElCheckbox } from 'element-plus'
import { defineFormItem, defineFormRules } from '@/components/FormBuilder'
import FormBuilder from '@/components/FormBuilder/FormBuilder.vue'

const form = reactive({
  username: '',
  password: '',
  //   rememberMe: false,
  type: '',
})

const formItems = defineFormItem(() => ([
  {
    key: 'username',
    label: '账号',
    placeholder: '请输入账号',
    type: 'input',
    rules: [
      { required: true, message: '请输入账号' },
      { max: 20, message: '账号长度不能超过20' },
      { min: 6, message: '账号长度不能小于6' },
    ],
  },
  {
    key: 'password',
    label: '密码',
    placeholder: '请输入密码',
    type: 'input',
    rules: [
      { required: true, message: '请输入密码' },
      { max: 20, message: '密码长度不能超过20' },
      { min: 6, message: '密码长度不能小于6' },
    ],
  },
  {
    key: 'type',
    label: '身份',
    type: 'select',
    placeholder: '请选择身份',
    rules: [{ required: true, message: '请选择身份' }],
    options: [
      { label: '学生', value: '0' },
      { label: '管理员', value: '1' },
    ],
  },
  {
    type: () => h(ElCheckbox, { label: '记住我', size: 'large' }),
    key: 'remember',
    span: 12,
  },
  {
    type: () => h('div', { class: 'flex  w-full justify-end' }, [
      h(ElLink, { href: '', type: 'primary', underline: 'never' }, () => '忘记密码'),
    ]),
    key: 'register',
    span: 12,
  },
]))
const rules = defineFormRules(() => ({
  username: [{ required: true, message: '请输入账号' }, { min: 6, message: '账号长度不能小于6' }, { max: 20, message: '账号长度不能超过20' }],
  password: [{ required: true, message: '请输入密码' }, { max: 20, message: '密码长度不能超过20' }, { min: 6, message: '密码长度不能小于6' }],
  type: [{ required: true, message: '请选择身份' }],
}))
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <el-card class="w-sm">
      <h2 style="text-align: center; margin-bottom: 24px; color: #2c3e50;">
        网上书店商城
      </h2>
      <FormBuilder v-model="form" :items="formItems" :rules="rules" />
      <el-button @click="handleSubmit">
        验证
      </el-button>
      <el-button @click="formInstance?.resetFields">
        重置
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>

</style>
