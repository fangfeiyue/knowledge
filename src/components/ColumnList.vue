<template>
  <div class="container">
    <div class="row">
      <div v-for="item in columnList" :key="item.id" class="col-4 mb-4">
        <div class="card h-100 shadow-sm" style="width: 18rem;">
          <img :src="item.avatar" class="rounded-circle border border-light my-3" :alt="item.title">
          <div class="card-body text-center">
            <h5 class="card-title">Card title</h5>
            <p class="card-text text-left">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
            <a href="#" class="btn btn-outline-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue'
export interface IColumnProps {
  id: number,
  title: string,
  avatar?: string,
  description: string
}
const props = defineProps({
  list: {
    type: Array as PropType<IColumnProps[]>,
    required: true
  }
})
const columnList = computed(() => props.list.map(column => {
  if (!column.avatar) column.avatar = 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  return column
}))
</script>
