<template>
  <div class="create-post-page">
    <h4>{{ false ? '编辑文章' : '新建文章' }}</h4>
    <!-- <h2>点击上传头图</h2> -->
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
import { useRouter } from 'vue-router'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { IGlobalDataProps, IPostsProps } from '../store/index'

const store = useStore<IGlobalDataProps>()
const router = useRouter()
const titleVal = ref('')
const contentVal = ref('')

const contentRules: RulesProp = [{ type: 'required', msg: '文章详情不能为空' }]
const titleRules: RulesProp = [{ type: 'required', msg: '文章标题不能为空' }]

const onFormSubmit = (res: boolean) => {
  if (res) {
    const { columnId } = store.state.user
    if (columnId) {
      const newPost: IPostsProps = {
        _id: Date.now() + '',
        title: titleVal.value,
        content: contentVal.value,
        createdAt: new Date().toLocaleDateString(),
        column: columnId + ''
      }
      store.commit('createPost', newPost)
      router.push({ name: 'column', params: { id: columnId } })
    }
  }
}
</script>
