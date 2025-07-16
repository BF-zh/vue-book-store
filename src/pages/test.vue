<script setup lang="ts">
import { ElCheckbox, ElLink } from 'element-plus'
import { defineFormItem, defineFormRules } from '@/components/FormBuilder'

const formData = reactive({
  username: '',
  password: '',
  remember: false,
  type: '',
})
const formItems = defineFormItem(() => ([
  {
    key: 'username',
    label: '账号',
    placeholder: '请输入账号',
    type: 'input',
    rules: [
      { required: true, message: '请输入账号在登录' },
      { max: 20, message: '账号长度不能超过20' },
      { min: 6, message: '账号长度不能小于6' },
    ],
  },
  {
    type: 'number',
    key: 'age',
    label: '年龄',
    placeholder: '请输入年龄',
    props: {
      min: 1,
      max: 100,
    },
  },
  {
    type: 'select',
    key: 'type',
    label: '身份',
    placeholder: '请选择身份',
    rules: [{ required: true, message: '请选择身份' }],
    options: [
      { label: '学生', value: '1' },
      { label: '教师', value: '2' },
      { label: '管理员', value: '3' },
    ],
  },
  {
    key: 'password',
    type: 'input',
    label: '密码',
    placeholder: '请输入密码',
    hidden: formData.username === '123',
    rules: [
      { required: true, message: '请输入密码' },
    ],
  },
  {
    type: () => h(ElCheckbox, { label: '记住我', size: 'large' }),
    key: 'remember',
    span: 12,
  },
  {
    type: () => h('div', { class: 'flex  w-full justify-end' }, [
      h(ElLink, { href: '', type: 'primary', underline: 'never' }, () => '立即注册'),
    ]),
    key: 'register',
    span: 12,
  },
]))

const rules = defineFormRules(() => ({
  username: [{ required: true, message: '请输入账号' }, { min: 6, message: '账号长度不能小于6' }],
  type: [{ required: true, message: '请选择身份' }],
  // password: [{ required: true, message: '请输入密码' }],
}))

const formInstance = useTemplateRef('formRef')
async function handleSubmit() {
  await formInstance.value?.validate()
  console.log(formData)
}
</script>

<template>
  <div class="flex h-full w-full items-center justify-center" :onClick="handleSubmit">
    <el-card class="w-sm">
      <FormBuilder ref="formRef" v-model="formData" :items="formItems" :rules="rules" />
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
