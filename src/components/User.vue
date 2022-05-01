<template>
  <div @click="onClick">{{ user.name }}</div>
  <div></div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
interface IUser {
  name: string
}
const props = defineProps<{user: IUser}>()

interface IEvent {
  (e: 'change-name', name: string): void
}
const emit = defineEmits<IEvent>()

const onClick = () => {
  emit('change-name', props.user.name)
}
</script>
