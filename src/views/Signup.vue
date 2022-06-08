<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册账户</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules" v-model="formData.email"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          :rules="nameRules" v-model="formData.nickName"
          placeholder="请输入昵称"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="formData.password"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input
          type="password"
          placeholder="请再次密码"
          :rules="repeatPasswordRules"
          v-model="formData.repeatPassword"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
      </template>
    </validate-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/index'
import createMessage from '../components/createMessage'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'

const router = useRouter()
const formData = reactive({
  email: '11@qq.com',
  nickName: '1',
  password: '111111',
  repeatPassword: '111111'
})

const emailRules: RulesProp = [
  { type: 'required', msg: '邮箱地址不能为空' },
  { type: 'email', msg: '请输入正确的邮箱格式' }
]
const passwordRules: RulesProp = [
  { type: 'required', msg: '密码不能为空' }
]
const nameRules: RulesProp = [
  { type: 'required', msg: '昵称不能为空' }
]
const repeatPasswordRules = [
  { type: 'required', msg: '重复密码不能为空' },
  {
    type: 'custom',
    msg: '密码相同',
    validator: () => formData.password === formData.repeatPassword
  }
]

const onFormSubmit = (res:boolean) => {
  if (res) {
    const { email, password, nickName } = formData
    const params = {
      email,
      password,
      nickName
    }
    register(params).then(res => {
      const { code } = res
      if (code !== 0) return
      setTimeout(() => {
        createMessage('注册成功 正在跳转登录页面。。。', 'success', 1000)
        router.replace('/login')
      }, 1000)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style>
.w-330 {
  max-width: 330px;
}
</style>
