<template>
  <div class="column-detail-page w-690">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.fitUrl" :alt="column.title" class="rounded-circle border w-100">
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
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
import { addColumnAvatar } from '@/utils/utils'
// import { IColumnProps } from '@/store'

const route = useRoute()
const curId = route.params.id
const store = useStore()

onMounted(() => {
  store.dispatch('fetchColum', curId)
  store.dispatch('fetchPosts', curId)
})

// const column = computed(() => store.getters.getColumnById(curId))
const column = computed(() => {
  const selectColumn = store.getters.getColumnById(curId)

  if (selectColumn) {
    addColumnAvatar(selectColumn, 100, 100)
  }
  return selectColumn
})
const list = computed(() => store.getters.getPostByCid(curId))

// const column = testData.find(item => item.id === curId)
// const list = testPosts.filter(post => post.columnId === curId)
</script>
<style scoped>
.w-690 {
  width: 690px;
  margin: 0 auto;
}
</style>
