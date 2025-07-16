import { ElCheckbox, ElCheckboxGroup, ElInput, ElInputNumber, ElOption, ElRadio, ElRadioGroup, ElSelect } from 'element-plus'

export const ITEM_MAP = {
  input: ElInput,
  select: ElSelect,
  checkboxGroup: ElCheckboxGroup,
  checkbox: ElCheckbox,
  number: ElInputNumber,
  radio: ElRadioGroup,
} as const

export const OPTIONS_MAP = {
  checkboxGroup: ElCheckbox,
  radio: ElRadio,
  select: ElOption,
} as const
