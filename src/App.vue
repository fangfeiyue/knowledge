<template>
  <User :user="user" @change-name="changeName"/>
  <ColumnList/>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import User from './components/User.vue'
import ColumnList from './components/ColumnList.vue'
const user = reactive({ name: 'f' })
const changeName = (val:string) => {
  user.name = val + 'y'
}
</script>
