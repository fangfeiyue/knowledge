<template>
  <teleport to="body">
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject" v-if="isVisible">
      <span>{{ msg }}</span>
      <button type="button" class="btn-close" aria-label="Close" @click.prevent="close"></button>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref } from 'vue'
export type MsgType = 'error' | 'success' | 'default'
const props = defineProps({
  msg: String,
  type: {
    type: String as PropType<MsgType>,
    default: 'default'
  }
})
const isVisible = ref(true)
const classObject = {
  'alert-success': props.type === 'success',
  'alert-danger': props.type === 'error',
  'alert-primary': props.type === 'default'
}
const close = () => {
  isVisible.value = false
}
</script>
