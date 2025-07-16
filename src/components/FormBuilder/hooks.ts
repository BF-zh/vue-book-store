import type { FunctionalComponent } from 'vue'
import type { IFormProps, TFormItem, TFormRule } from './types'
import { computed, h } from 'vue'
import FormBuilder from './FormBuilder.vue'

export function defineFormItem(item: () => TFormItem[]): TFormItem[]
export function defineFormItem(item: TFormItem[] | (() => TFormItem[])): TFormItem[] | ComputedRef<TFormItem[]> {
  if (typeof item === 'function')
    return computed(item)
  return item as TFormItem[]
}
export function defineFormRules(rules: TFormRule): TFormRule
export function defineFormRules(rules: () => TFormRule): ComputedRef<TFormRule>
export function defineFormRules(rules: TFormRule | (() => TFormRule)): TFormRule | ComputedRef<TFormRule> {
  if (typeof rules === 'function')
    return computed(rules)
  return rules
}
export function useFormBuilder(props: IFormProps) {
  const formRef = ref()
  const component: FunctionalComponent = (_, { slots }) => {
    return h(FormBuilder, { ...props, ref: formRef }, slots)
  }
  return {
    component,
    defineFormItem,
  }
}
