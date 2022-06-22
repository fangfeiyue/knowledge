<template>
  <div class="create-post-page container">
    <h4>{{ false ? '编辑文章' : '新建文章' }}</h4>
    <uploader
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      :uploaded="uploadedData"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData && dataProps.uploadedData.url">
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          type="text"
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
        <!-- <span class="invalid-feedback mt-1">messss</span> -->
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{ false ? '更新文章' : '发表文章' }}
        </button>
      </template>
    </validate-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { IGlobalDataProps, IImageProps, IPostsProps } from '@/store/index'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/components/createMessage'
import { beforeUploadCheck } from '@/utils/utils'

const uploadedData = ref()
let imageId = ''
const store = useStore<IGlobalDataProps>()
const router = useRouter()
const route = useRoute()
const titleVal = ref('')
const contentVal = ref('')
const isEditMode = ref(false)

const contentRules: RulesProp = [{ type: 'required', msg: '文章详情不能为空' }]
const titleRules: RulesProp = [{ type: 'required', msg: '文章标题不能为空' }]

const uploadCheck = (file:File) => {
  const { passed, error } = beforeUploadCheck(file, { format: ['image/png', 'image/jpeg'], size: 1 })

  if (error === 'size') createMessage('上传图片不能超过 1M', 'error', 2000)
  else if (error === 'format') createMessage('上传图片只能是 JPG/PNG 格式!', 'error', 2000)

  return passed
}
const handleFileUploaded = (rawData:IImageProps) => {
  if (rawData._id) imageId = rawData._id
}
const onFormSubmit = (res: boolean) => {
  if (res) {
    const { column, _id } = store.state.user
    if (column) {
      const newPost: IPostsProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id
      }
      if (imageId) {
        newPost.image = imageId
      }
      const actionName = isEditMode.value ? 'updatePost' : 'createPost'
      const sendData = isEditMode.value
        ? {
          id: route.query.id,
          payload: newPost
        }
        : newPost

      store.dispatch('fetchCreatePost', sendData)
      router.push({ name: 'column', params: { id: column } })
    }
  }
}
</script>
<style scoped>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
