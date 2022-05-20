<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'

const route = useRoute()
const curId = +route.params.id
const store = useStore()

const column = computed(() => store.getters.getColumnById(curId))
const list = computed(() => store.getters.getPostByCid(curId))
console.log('list', list)
// const column = testData.find(item => item.id === curId)
// const list = testPosts.filter(post => post.columnId === curId)
</script>
