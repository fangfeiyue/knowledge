<template>
  <div class="container">
    <global-header :user="user" />
    <router-view/>
    <global-footer/>
  </div>
</template>
<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalFooter from './components/GlobalFooter.vue'
import GlobalHeader, { IUserProps } from './components/GlobalHeader.vue'
const user: IUserProps = {
  name: 'fang',
  id: 1,
  isLogin: false
}
</script>
