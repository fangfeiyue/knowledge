<template>
  <div class="validate-input-container pb-3">
    <input type="text" class="form-control" :class="{ 'is-invalid': input.err }" v-model="input.val"
      @blur="validateInput">
      {{ input.err && input.msg }}
  </div>
</template>
<script setup lang="ts">
import { reactive, PropType, defineProps } from 'vue'
export interface IRuleProp {
  type: 'required' | 'email' | 'range',
  msg: string
}
export type RulesProp = IRuleProp[]
const props = defineProps({
  rules: Array as PropType<RulesProp>
})
const input = reactive({
  val: '',
  err: false,
  msg: ''
})
const validateInput = () => {
  const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const { rules } = props
  const allPassed = rules && rules.every(rule => {
    let passed = false
    input.msg = rule.msg
    const val = input.val
    const len = val.length
    switch (rule.type) {
      case 'required':
        passed = val.trim() !== ''
        break
      case 'email':
        passed = emailReg.test(val)
        break
      case 'range':
        console.log(len)
        passed = len >= 5 && len <= 12
        console.log('passed', passed)
        break
      default:
        break
    }
    console.log(passed)
    return passed
  })
  input.err = !allPassed
}
</script>
