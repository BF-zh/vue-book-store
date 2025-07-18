import type { CheckboxGroupProps, CheckboxProps, FormItemRule, FormProps, InputNumberProps, InputProps, RadioProps, SelectProps } from 'element-plus'
import type { Component, Events } from 'vue'
import type { ITEM_MAP } from './constant'
import type { Arrayable, Expand } from '@/types/typeing'

export type TFormRule = Partial<Record<string, Arrayable<FormItemRule>>>

export interface IOptions {
  label: string
  value: any
}

interface BaseItem {
  key: string
  hidden?: boolean
  label?: string
  span?: number
  rules?: Arrayable<FormItemRule>
}

//  生成工具类型
type GenerateProps<K extends keyof typeof ITEM_MAP, P, O extends boolean = false> = (O extends true
  ? {
    readonly type?: `${K}`
    props?: Expand<Partial<P & Events>>
    options: IOptions[]

  }
  : {
    readonly type?: `${K}`
    props?: Expand<Partial<P & Events>>
  }) & Expand<Partial<P & Events>>

type InputItem = GenerateProps<'input', InputProps>

type SelectItem = GenerateProps<'select', SelectProps, true>

type RadioItem = GenerateProps<'radio', RadioProps, true>

type CheckboxItem = GenerateProps<'checkbox', CheckboxProps>

type CheckboxGroupItem = GenerateProps<'checkboxGroup', CheckboxGroupProps, true>

type NumberItem = GenerateProps<'number', InputNumberProps>

interface ComponentItem {
  type: Component
}

export type IFormProps = {
  items: TFormItem[]
} & Partial<Omit<FormProps, 'model'>>

export type TFormItem = Expand<BaseItem & (InputItem | SelectItem | RadioItem | CheckboxItem | NumberItem | ComponentItem | CheckboxGroupItem)>
