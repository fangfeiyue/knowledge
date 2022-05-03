<template>
  <li class="dropdown-option" :class="{'is-disabled': disabled}">
    <slot></slot>
  </li>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="css" scoped>
 .dropdown-option:slotted(.is-disabled *) {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
