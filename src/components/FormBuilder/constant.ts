import { ElCheckbox, ElCheckboxGroup, ElInput, ElInputNumber, ElOption, ElRadio, ElRadioGroup, ElSelect, ElSwitch } from 'element-plus'

import 'element-plus/theme-chalk/el-input.css'
import 'element-plus/theme-chalk/el-input-number.css'
import 'element-plus/theme-chalk/el-select.css'
import 'element-plus/theme-chalk/el-radio.css'
import 'element-plus/theme-chalk/el-radio-group.css'
import 'element-plus/theme-chalk/el-switch.css'
import 'element-plus/theme-chalk/el-checkbox.css'
import 'element-plus/theme-chalk/el-checkbox-group.css'
import 'element-plus/theme-chalk/el-option.css'

export const ITEM_MAP = {
  input: ElInput,
  select: ElSelect,
  checkboxGroup: ElCheckboxGroup,
  checkbox: ElCheckbox,
  number: ElInputNumber,
  radio: ElRadioGroup,
  switch: ElSwitch,
} as const

export const OPTIONS_MAP = {
  checkboxGroup: ElCheckbox,
  radio: ElRadio,
  select: ElOption,
} as const
