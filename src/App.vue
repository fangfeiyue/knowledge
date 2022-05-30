<template>
  <div class="container">
    <demo name="fang" age="18"/>
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
import Demo from '@/components/Demo'
const store = useStore()
const user = computed(() => store.state.user)
const error = computed(() => store.state.error)

watch(() => error.value.status, () => {
  const { msg, status } = error.value
  if (msg && status) {
    createMessage(msg, 'error')
  }
})
</script>
