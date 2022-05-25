<template>
  <my-mask>
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ text || 'loading'}}</span>
      </div>
      <p v-if="text" class="text-primary small">{{text}}</p>
    </div>
  </my-mask>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import MyMask from './Mask.vue'
defineProps({
  text: {
    type: String,
    default: ''
  },
  background: {
    type: String,
    default: ''
  }
})
</script>
