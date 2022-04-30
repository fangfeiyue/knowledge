<template>
  <div @click="onClick">{{ name }}</div>
  <div></div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  name: String
})
const emit = defineEmits(['change-name'])
const onClick = () => {
  emit('change-name', props.name)
}
</script>
