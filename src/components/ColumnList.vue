<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle border border-light my-3" >
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue'
import { IColumnProps } from '../store/index'
const props = defineProps({
  list: {
    type: Array as PropType<IColumnProps[]>,
    required: true
  }
})
const columnList = computed(() => props.list.map(column => {
  if (!column.avatar) {
    column.avatar = {
      url: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
    }
  } else {
    column.avatar.url = column.avatar.url + ''
  }
  // 如果是本地图片需要使用 require
  // column.avatar = require('./1.png')
  return column
}))
</script>
<style scoped>
.card-body img{
  width: 50px;
  height: 50px;
}
</style>
