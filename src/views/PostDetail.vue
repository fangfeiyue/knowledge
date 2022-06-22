<template>
  <div class="post-detail-page w-690">
    <!-- <modal title="删除文章" :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal> -->
    <article class="mb-5 pb-3" v-if="currentPost">
      <!-- <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl"> -->
      <img src="http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png?x-oss-process=image/resize,w_850" alt="currentPost.title" class="rounded-lg img-fluid my-4">
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{currentPost.createdAt}}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{name: 'create', query: { id: currentPost._id}}"
        >
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { marked } from 'marked'
import { useRoute, useRouter } from 'vue-router'
import store, { IGlobalDataProps, IImageProps, IUserProps, IResponseType, IPostProps } from '@/store/index'
import UserProfile from '../components/UserProfile.vue'
import Modal from '../components/Modal.vue'
import createMessage from '@/components/createMessage'

const route = useRoute()
const postId = route.params.id
const showEditArea = ''
const modalIsVisible = false
const hideAndDelete = false
const currentPost = computed<IPostProps>(() => store.getters.getCurrentPost(postId))
const currentImageUrl = computed(() => {
  if (currentPost.value && currentPost.value.image) {
    const { image } = currentPost.value
    // Property 'url' does not exist on type 'string | IImageProps'.
    // return image.url + '?x-oss-process=image/resize,w_850'
    return (image as IImageProps).url + '?x-oss-process=image/resize,w_850'
  } else {
    return null
  }
})
const currentHTML = computed(() => {
  if (currentPost.value && currentPost.value.content) {
    const { isHTML, content } = currentPost.value
    return isHTML ? marked.parse(content) : content
  } else {
    return ''
  }
})

onMounted(() => {
  store.dispatch('fetchPostDetail', postId)
})
</script>
<style scoped>
.w-690 {
  width: 690px;
  margin: 0 auto;
}
</style>
