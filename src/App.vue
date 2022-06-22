<template>
  <div class="container-fluid px-0 flex-shrink-0">
    <global-header :user="user" />
    <router-view/>
    <global-footer/>
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalFooter from './components/GlobalFooter.vue'
import GlobalHeader from './components/GlobalHeader.vue'
import createMessage from '@/components/createMessage'

const store = useStore()
const user = computed(() => store.state.user)
const error = computed(() => store.state.error)

watch(() => error.value.status, () => {
  const { msg, status } = error.value
  if (msg && status) {
    createMessage(msg, 'error', 2000)
  }
})
</script>
