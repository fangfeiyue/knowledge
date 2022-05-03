<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">Navbar</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropDown :title="`你好 ${user.name}`">
          <DropDownItem><router-link to='/create' class="dropdown-item">创建文章</router-link></DropDownItem>
          <DropDownItem><router-link to='`/column/${user.id}`' class="dropdown-item">我的专栏</router-link></DropDownItem>
          <DropDownItem disabled><a href="#" class="dropdown-item">编辑资料</a></DropDownItem>
          <DropDownItem><a href="#" class="dropdown-item">退出登录</a></DropDownItem>
        </DropDown>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'

export interface IUserProps {
  name?: string,
  id?: number,
  isLogin: boolean
}
defineProps({
  user: {
    type: Object as PropType<IUserProps>,
    required: true
  }
})
</script>
