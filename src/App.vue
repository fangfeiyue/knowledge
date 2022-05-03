<template>
  <div class="container">
    <GlobalHeader :user="user"/>
    <ColumnList :list="list"/>
  </div>
</template>
<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { IColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { IUserProps } from './components/GlobalHeader.vue'

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
</script>
