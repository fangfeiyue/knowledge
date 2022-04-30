<template>
  <user :name="name" @change-name="changeName"/>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import User from './components/User.vue'
const name = ref('f')
const changeName = (val:string) => {
  name.value = val + 'y'
}
</script>
