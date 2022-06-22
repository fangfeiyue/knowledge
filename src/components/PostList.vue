<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post._id}/`">{{ post.title }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image && typeof post.image !== 'string'" class="col-4">
          <img :src="post.image.fitUrl" :alt="post.title" class="rounded-lg w-100"/>
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>
<script setup lang="ts">
import { generateFitUrl } from '@/utils/utils'
import { computed, PropType, defineProps } from 'vue'
import { IPostsProps, IImageProps } from '../store/index'

const props = defineProps({
  list: {
    required: true,
    type: Array as PropType<IPostsProps[]>
  }
})
const list = computed(() => {
  return props.list.map(post => {
    // Argument of type 'IImageProps | undefined' is not assignable to parameter of type 'IImageProps'.
    // generateFitUrl(post.image, 200, 110, ['m_fill'])

    generateFitUrl(post.image as IImageProps, 200, 110, ['m_fill'])
    return post
  })
})
</script>
<style scoped>
.post-list h4 a {
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
</style>
