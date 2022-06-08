<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag === 'input'"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': input.err }"
      :value="input.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
      autocomplete="new-password">
    <textarea
      v-else
      class="form-control"
      :class="{'is-invalid': input.err}"
      :value="input.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    ></textarea>
    <span
      v-if="input.err"
      class="invalid-feedback"
    >
      {{ input.msg }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { reactive, PropType, onMounted, defineProps, defineEmits, defineExpose } from 'vue'
import { emitter } from '../bus/index'
export interface IRuleProp {
  type: 'required' | 'email' | 'range' | 'password' | 'custom',
  msg?: string | '',
  min?: {
    msg: string,
    length: number
  },
  max?: {
    msg: string,
    length: number
  },
  validator?: ()=>boolean
}
export type RulesProp = IRuleProp[]
export type TagType = 'input' | 'textarea'
const props = defineProps({
  rules: Array as PropType<RulesProp>,
  modelValue: String,
  tag: {
    type: String as PropType<TagType>,
    default: 'input'
  }
})
const input = reactive({
  val: props.modelValue || '',
  err: false,
  msg: ''
})
const validateInput = () => {
  const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const { rules } = props
  const allPassed = rules && rules.every(rule => {
    let passed = false
    input.msg = rule.msg || ''
    const val = input.val
    switch (rule.type) {
      case 'required':
        passed = val.trim() !== ''
        break
      case 'email':
        passed = emailReg.test(val)
        break
      case 'custom':
        passed = rule.validator?.() || true
        break
      default:
        break
    }
    return passed
  })
  input.err = !allPassed
  return allPassed
}

interface IEvent {
  (e: 'update:modelValue', val: string): void
}
const emit = defineEmits<IEvent>()
onMounted(() => {
  emitter.emit('form-item-created', validateInput)
})
const updateValue = (e: Event) => {
  // Property 'value' does not exist on type 'EventTarget'.
  // const val = e.target?.value

  // Object is possibly 'null'.
  // const val = e.target.value

  const val = (e.target as HTMLInputElement).value
  input.val = val
  emit('update:modelValue', val)
}
defineExpose({
  validateInput
})
</script>
<!-- <script lang="ts">
export default {
  inheritAttrs: false
}
</script> -->
