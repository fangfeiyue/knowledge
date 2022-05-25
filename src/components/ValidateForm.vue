<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script setup lang="ts">
import { defineEmits, onMounted } from 'vue'
import { emitter, ValidateFunc } from '../bus/index'
const funcArr:ValidateFunc[] = []

const callback = (func: ValidateFunc) => {
  funcArr.push(func)
}
emitter.on('form-item-created', callback)
onMounted(() => {
  emitter.off('form-item-created', callback)
})
const emit = defineEmits(['form-submit'])
const submitForm = () => {
  const res = funcArr.map(func => func()).every(res => res)
  emit('form-submit', res)
}
</script>
