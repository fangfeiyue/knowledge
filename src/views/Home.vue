<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/img/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script setup lang="ts">
import ColumnList, { IColumnProps } from '../components/ColumnList.vue'
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
