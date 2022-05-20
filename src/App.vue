<template>
  <div class="container">
    <global-header :user="user" />
    <router-view/>
    <global-footer/>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalFooter from './components/GlobalFooter.vue'
import GlobalHeader from './components/GlobalHeader.vue'
const store = useStore()
const user = computed(() => store.state.user)
</script>
