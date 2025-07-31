<script setup lang="ts">
import type { FormInstance, FormItemRule } from 'element-plus'
import type { IFormProps, IOptions, TFormItem, TFormRule } from './types'
import { omit } from 'lodash-es'
import { ITEM_MAP, OPTIONS_MAP } from './constant'

const props = defineProps<IFormProps>()
const modelValue = defineModel<Record<string, any>>({ default: {} })

const formProps = computed(() => {
  return omit(Object.fromEntries(Object.entries(props).filter(([_, val]) => val)), ['modelValue', 'items'])
})

const rootKey = ['key', 'type', 'label', 'props'] as const
function getItemProps(item: TFormItem) {
  if (item.type && typeof item.type !== 'string') {
    return
  }
  return { ...item.props, ...omit(item, rootKey) }
}
const formInstance = useTemplateRef<FormInstance>('formRef')
defineExpose({
  validate: (...args: Parameters<FormInstance['validate']>) => formInstance.value?.validate(...args),
  resetFields: () => formInstance.value?.resetFields(),
  clearValidate: () => formInstance.value?.clearValidate(),
  validateField: (prop: string) => formInstance.value?.validateField(prop),
})
function getComponent(item: TFormItem) {
  const { type } = item
  if (type && typeof type !== 'string') {
    return type
  }
  return ITEM_MAP[type as keyof typeof ITEM_MAP || 'input']
}
function getOptions(item: TFormItem) {
  const { type } = item
  if (type && typeof type !== 'string') {
    return type
  }
  return OPTIONS_MAP[type as keyof typeof OPTIONS_MAP || 'select']
}
function getOptionsData(item: TFormItem) {
  const { type, options = [], props } = item as TFormItem & { options: IOptions[], props: { options: IOptions[] } }
  if (type && typeof type !== 'string') {
    return []
  }
  return [...(props?.options || []), ...options]
}

const mergedRules = computed(() => {
  const result: TFormRule = { ...props.rules }
  const { items } = props

  const extractRuleKeys = (rule: FormItemRule) => {
    // 排除非“关键校验字段”，可扩展
    return Object.keys(rule).filter(key =>
      ['required', 'min', 'max', 'type', 'pattern', 'validator', 'len'].includes(key),
    )
  }

  for (const { key, rules } of items) {
    if (!rules || (Array.isArray(rules) && rules.length === 0))
      continue

    const existing = result[key]
    const existingArr = Array.isArray(existing) ? [...existing] : (existing ? [existing] : [])
    const incomingArr = Array.isArray(rules) ? [...rules] : [rules]

    // 将 props.rules 里重复的规则（与 item.rules 同字段）去掉
    const filteredExisting = existingArr.filter((erule) => {
      const eKeys = extractRuleKeys(erule)
      return !incomingArr.some((irule) => {
        const iKeys = extractRuleKeys(irule)
        // 如果两者有相同的关键字段（如都包含 'required'），就认为重复
        return eKeys.some(k => iKeys.includes(k))
      })
    })

    // 合并去重后，item.rules 优先
    result[key] = [...filteredExisting, ...incomingArr]
  }

  return result
})
</script>

<template>
  <el-form ref="formRef" :model="modelValue" v-bind="{ ...formProps, rules: mergedRules }">
    <el-row :gutter="24" justify="space-between">
      <el-col v-for="item in props.items" :key="item.key" :gutter="24" :span="item.span || 24">
        <el-form-item v-if="!item.hidden" :label="item.label" :prop="item.key">
          <slot :name="item.key" :data="modelValue[item.key]" :props="getItemProps(item)" :item="item">
            <component :is="getComponent(item)" v-bind="getItemProps(item)" v-model="modelValue[item.key]">
              <Component :is="getOptions(item)" v-for="option in getOptionsData(item)" :key="option.value" :label="option.label" :value="option.value" />
            </component>
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
