<template>
  <div class="container">
    <global-header :user="user" />
    <!-- <column-list :list="list"/> -->
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email.val" @blur="validateEamil">
        <div v-if="email.error" id="emailHelp" class="form-text">{{ email.msg }}</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text" />
      {{emailVal}}
    </form>
  </div>
</template>
<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { reactive, ref } from 'vue'
import ColumnList, { IColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { IUserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'

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
const emailRules: RulesProp = [
  { type: 'required', msg: '邮箱地址不能为空' },
  { type: 'email', msg: '请输入正确的邮箱格式' },
  { type: 'range', msg: '邮箱长度应该在5-12个字符' }
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
</script>
