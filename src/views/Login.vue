<template>
  <div class="login-page">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules" v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
    </validate-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

const router = useRouter()
const inputRef = ref()
const emailVal = ref('')
const passwordVal = ref('')
const store = useStore()

const emailRules: RulesProp = [
  { type: 'required', msg: '邮箱地址不能为空' },
  { type: 'email', msg: '请输入正确的邮箱格式' }
]
const passwordRules: RulesProp = [
  { type: 'required', msg: '密码不能为空' }
]

const onFormSubmit = (res: boolean) => {
  if (res) {
    const payload = {
      email: emailVal.value,
      password: passwordVal.value
    }
    store.dispatch('fetchLoginAndUser', payload).then(token => {
      console.log(token)
      router.push('/')
    })
  }
}
</script>
