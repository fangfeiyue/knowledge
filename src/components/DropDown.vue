<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" style="display:block;" v-show="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
defineProps({
  title: {
    type: String,
    required: true
  }
})
const dropdownRef = ref(null)
const isOpen = ref(false)
const isClickOutside = useClickOutside(dropdownRef)
const toggleOpen = () => (isOpen.value = !isOpen.value)
watch(isClickOutside, () => {
  if (isOpen.value && isClickOutside.value) isOpen.value = false
})
</script>
