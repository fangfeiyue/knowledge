<template>
  <div class="container">
    <global-header :user="user" />
    <uploader
      action="/upload"
      @file-uploaded="handleFileUploaded"
      :beforeUpload="beforeUpload"
      :uploaded="uploadedData"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData && dataProps.uploadedData.url" style="width:500px;"/>
      </template>
    </uploader>
    <router-view/>
    <global-footer/>
  </div>
</template>
<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalFooter from './components/GlobalFooter.vue'
import GlobalHeader from './components/GlobalHeader.vue'
import createMessage from '@/components/createMessage'
import Uploader from './components/Uploader.vue'
import { IImageProps } from '@/store/index'

const store = useStore()
const uploadedData = ref()
let imageId = ''
const user = computed(() => store.state.user)
const error = computed(() => store.state.error)
const beforeUpload = (file:File) => {
  const isValide = file.type === 'image/png'
  if (!isValide) createMessage('上传的图片只能是 JPG 格式', 'error')
  return isValide
}
const handleFileUploaded = (rawData:IImageProps) => {
  if (rawData._id) imageId = rawData._id
}

watch(() => error.value.status, () => {
  const { msg, status } = error.value
  if (msg && status) {
    createMessage(msg, 'error', 2000)
  }
})
</script>
