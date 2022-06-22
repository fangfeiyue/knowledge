<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    >
  </div>
</template>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { upload } from '@/api/index'
import { ref, defineProps, defineEmits, PropType } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type ChckFunction = (file:File) => boolean

const props = defineProps({
  action: {
    type: String,
    default: ''
  },
  beforeUpload: {
    type: Function as PropType<ChckFunction>
  },
  uploaded: {
    type: Object
  }
})
const emit = defineEmits(['file-uploaded', 'file-uploaded-error'])

const fileStatus = ref<UploadStatus>('ready')
const fileInput = ref<HTMLInputElement | null>(null)
const uploadedData = ref(props.uploaded)

const triggerUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement

  if (target.files) {
    const files = Array.from(target.files)
    console.log('files', files)
    if (props.beforeUpload) {
      if (!props.beforeUpload(files[0])) return false
    }
    fileStatus.value = 'loading'
    const formData = new FormData()
    formData.append('file', files[0])

    upload(formData).then(res => {
      fileStatus.value = 'success'
      uploadedData.value = res
      emit('file-uploaded', res)
    }).catch(error => {
      console.error('error=>>', error)
      fileStatus.value = 'error'
      emit('file-uploaded-error', { error })
    }).finally(() => {
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    })
  }
  fileInput.value = null
}
</script>
<style scoped>
.file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
</style>
