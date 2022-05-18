<template>
  <form class="validate-form-container" @submit.prevent="submitForm">
    <slot></slot>
    <!-- <div class="submit-area" @click.prevent="submitForm"> -->
    <div class="submit-area">
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
