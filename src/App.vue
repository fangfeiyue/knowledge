<template>
  <div class="container">
    <global-header :user="user" />
    <!-- <column-list :list="list"/> -->
    <validate-form @form-submit="submitForm">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text" ref="inputRef"/>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">密码</label>
         <validate-input :rules="passwordRules" v-model="passwordVal" placeholder="请输入密码" type="password" />
      </div>
      <!-- <template v-slot:submit> -->
      <!-- 简写 -->
      <template #submit>
        <button class="btn btn-danger">提交</button>
        <!-- <a href="https://www.baidu.com/">百度</a> -->
      </template>
    </validate-form>
  </div>
</template>
<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { reactive, ref } from 'vue'
import ColumnList, { IColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { IUserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
const user: IUserProps = {
  name: 'fang',
  id: 1,
  isLogin: true
}
const list: IColumnProps[] = [
  {
    id: 1,
    title: '你好',
    // avatar: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png',
    description: '你好你好'
  },
  {
    id: 1,
    title: '你好',
    avatar: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png',
    description: '你好你好'
  },
  {
    id: 1,
    title: '你好',
    avatar: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png',
    description: '你好你好'
  },
  {
    id: 1,
    title: '你好',
    avatar: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png',
    description: '你好你好'
  }
]
const email = reactive({
  val: '',
  msg: '',
  error: false
})
const emailVal = ref('1@qq.com')
const passwordVal = ref('1234')
const emailRules: RulesProp = [
  { type: 'required', msg: '邮箱地址不能为空' },
  { type: 'email', msg: '请输入正确的邮箱格式' }
  // { type: 'range', min: { msg: '邮箱长度不能小于六位', length: 6 }, max: { msg: '邮箱长度不能大于十位', length: 10 } }
]
const passwordRules: RulesProp = [
  { type: 'required', msg: '密码不能为空' }
  // { type: 'password', msg: '请输入正确的邮箱格式' },
  // { type: 'range', min: { msg: '你的密码至少包括六位，不能含有空格', length: 6 }, max: { msg: '你的密码不能超过十位，不能含有空格', length: 10 } }
]
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const validateEamil = () => {
  if (email.val.trim() === '') {
    email.error = true
    email.msg = 'not empty'
  } else if (!emailReg.test(email.val)) {
    email.error = true
    email.msg = '格式不正确'
  } else {
    email.error = false
    email.msg = ''
  }
}
const inputRef = ref()
const submitForm = (res: boolean) => {
  console.log('ininin', res)
}
</script>
